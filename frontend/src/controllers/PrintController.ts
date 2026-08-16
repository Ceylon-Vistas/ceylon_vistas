import axios from "axios";
import {useState, useEffect, useRef} from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {BASE_URL} from "../config/api";
import {successNotification, errorNotification} from "../util/alert";
import type {Bill} from "../models/Bill";
import type {BillItem} from "../models/BillItem";

export default function PrintController() {
    const [billNo, setBillNo] = useState("");
    const [cashier, setCashier] = useState("");
    const [name, setName] = useState("");
    const [qty, setQty] = useState(1);
    const [unitPrice, setUnitPrice] = useState(0);
    const [items, setItems] = useState<BillItem[]>([]);
    const [serviceCharge, setServiceCharge] = useState(0);
    const [discount, setDiscount] = useState(0);

    const [showPreview, setShowPreview] = useState(false);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const editingRowRef = useRef<HTMLTableRowElement>(null);
    const itemNameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                editingIndex !== null &&
                editingRowRef.current &&
                !editingRowRef.current.contains(e.target as Node)
            ) {
                setEditingIndex(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [editingIndex]);

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

        setTimeout(() => {
            itemNameInputRef.current?.focus();
        }, 0);
    };

    const deleteItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const editItem = (index: number) => {
        setEditingIndex(index);
    };

    const updateItem = (index: number, field: "name" | "qty" | "unitPrice", value: string | number) => {
        const updatedItems = [...items];

        updatedItems[index] = {
            ...updatedItems[index],
            [field]: value,
            total:
                field === "qty"
                    ? Number(value) * updatedItems[index].unitPrice
                    : field === "unitPrice"
                        ? updatedItems[index].qty * Number(value)
                        : updatedItems[index].total
        };

        setItems(updatedItems);
    };

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
        e.preventDefault();
    };

    const handleDrop = (dropIndex: number) => {
        if (draggedIndex === null || draggedIndex === dropIndex) return;

        const newItems = [...items];
        const draggedItem = newItems[draggedIndex];

        newItems.splice(draggedIndex, 1);
        newItems.splice(dropIndex, 0, draggedItem);

        setItems(newItems);
        setDraggedIndex(null);
    };

    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    }).replace(/\s+(AM|PM)$/, "$1");

    const subTotal = items.reduce(
        (sum, item) => sum + item.total,
        0
    );

    const total = subTotal + serviceCharge - discount;

    const bill: Bill = {
        billNo,
        cashier,
        date,
        time,
        items,
        subTotal,
        serviceCharge,
        discount,
        total
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

    const printBill = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/print`, bill);
            successNotification(response.data);
            setShowPreview(false);
        } catch (error: any) {
            errorNotification(error.message);
        }
    };

    return {
        billNo,
        cashier,
        date,
        time,
        name,
        qty,
        unitPrice,
        items,
        subTotal,
        serviceCharge,
        discount,
        total,
        showPreview,
        editingIndex,
        previewRef,
        editingRowRef,
        itemNameInputRef,

        setBillNo,
        setCashier,
        setName,
        setQty,
        setUnitPrice,
        setServiceCharge,
        setDiscount,
        setShowPreview,

        addItem,
        deleteItem,
        editItem,
        updateItem,

        handleDragStart,
        handleDragOver,
        handleDrop,

        downloadBill,
        printBill,
    };
}