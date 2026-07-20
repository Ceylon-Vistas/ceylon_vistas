import axios from "axios";
import {useState, useRef} from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {BASE_URL} from "../config/api";
import {successNotification, errorNotification} from "../util/alert";
import type {Bill} from "../models/Bill";
import type {BillItem} from "../models/BillItem";

export default function usePrintBillController() {
    const [billNo, setBillNo] = useState("");
    const [cashier, setCashier] = useState("");

    const [name, setName] = useState("");
    const [qty, setQty] = useState(1);
    const [unitPrice, setUnitPrice] = useState(0);
    const [items, setItems] = useState<BillItem[]>([]);

    const [serviceCharge, setServiceCharge] = useState(0);
    const [discount, setDiscount] = useState(0);

    const [showPreview, setShowPreview] = useState(false);
    const previewRef = useRef<HTMLDivElement>(null);

    const addItem = () => {
        if (!name || qty <= 0 || unitPrice <= 0) {
            errorNotification("Please enter valid item details");
            return;
        }

        const item: BillItem = {
            name,
            qty,
            unitPrice,
            total: qty * unitPrice
        };

        setItems([...items, item]);

        setName("");
        setQty(1);
        setUnitPrice(0);
    };

    const deleteItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const subTotal = items.reduce(
        (sum, item) => sum + item.total,
        0
    );

    const total = subTotal + serviceCharge - discount;

    const now = new Date();
    const currentDate = now.toISOString().split("T")[0];
    const currentTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    }).replace(/\s+(AM|PM)$/, "$1");

    const bill: Bill = {
        billNo,
        cashier,
        date: currentDate,
        time: currentTime,
        items,
        subTotal,
        serviceCharge,
        discount,
        total
    };

    const confirmPrint = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/printer/print`, bill);
            successNotification(response.data);
            setShowPreview(false);
        } catch (error: any) {
            errorNotification(error.message);
        }
    };

    const downloadBill = async () => {
        if (!previewRef.current) return;

        const canvas = await html2canvas(previewRef.current, {
            scale: 2,
            scrollY: -window.scrollY,
            useCORS: true
        });

        const imgData = canvas.toDataURL("image/png");

        const pdfWidth = 105;
        const imgWidth = 90;

        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: [pdfWidth, imgHeight + 20]
        });

        const x = (pdfWidth - imgWidth) / 2;

        pdf.addImage(
            imgData,
            "PNG",
            x,
            10,
            imgWidth,
            imgHeight
        );

        pdf.save(`${billNo}.pdf`);
    };

    return {
        billNo,
        cashier,
        name,
        qty,
        unitPrice,
        items,
        serviceCharge,
        discount,
        showPreview,
        previewRef,

        setBillNo,
        setCashier,
        setName,
        setQty,
        setUnitPrice,
        setItems,
        setServiceCharge,
        setDiscount,
        setShowPreview,

        addItem,
        deleteItem,
        confirmPrint,
        downloadBill,

        subTotal,
        total,
        bill,
        currentDate,
        currentTime
    };
}