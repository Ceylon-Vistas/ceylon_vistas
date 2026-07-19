import {useRef, useState} from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {HiOutlineTrash} from "react-icons/hi";
import {successNotification, errorNotification} from "../util/alert";
import {printBill} from "../controllers/PrintBillController";
import type {Bill} from "../models/Bill";
import type {BillItem} from "../models/BillItem";

export default function PrintBill() {
    const [receiptNo, setReceiptNo] = useState("");
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
            name: name,
            qty,
            unitPrice,
            total: qty * unitPrice
        };

        setItems([...items, item]);

        setName("");
        setQty(1);
        setUnitPrice(0);
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
        receiptNo,
        date: currentDate,
        time: currentTime,
        cashier,
        items,
        subTotal,
        serviceCharge,
        discount,
        total
    };

    const confirmPrint = async () => {
        try {
            await printBill(bill);
            successNotification("Bill Printed Successfully");
            setShowPreview(false);
        } catch (error) {
            errorNotification("Printing Failed");
        }
    };

    const deleteItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
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

        pdf.save(`${receiptNo}.pdf`);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10">

            <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Print Bill
                </h1>

                {/* BILL DETAILS */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <input
                        placeholder="Receipt No"
                        value={receiptNo}
                        onChange={(e) => setReceiptNo(e.target.value)}
                        className="border rounded p-2"
                    />
                    <input
                        placeholder="Cashier"
                        value={cashier}
                        onChange={(e) => setCashier(e.target.value)}
                        className="border rounded p-2"
                    />
                </div>

                {/* ITEM ADD */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                    <input
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded p-2"
                    />
                    <input
                        type="number"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        className="border rounded p-2"
                    />
                    <input
                        type="number"
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(Number(e.target.value))}
                        className="border rounded p-2"
                    />
                    <button onClick={addItem} className="bg-green-600 text-white rounded">
                        Add Item
                    </button>

                </div>
                <table className="w-full border mb-6">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="border p-2">Item</th>
                        <th className="border p-2">Qty</th>
                        <th className="border p-2">Unit Price</th>
                        <th className="border p-2">Total</th>
                        <th className="border p-2">Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        items.map((item, index) => (
                            <tr key={index}>
                                <td className="border p-2">{item.name}</td>
                                <td className="border p-2 text-center">{item.qty}</td>
                                <td className="border p-2 text-right">{item.unitPrice.toFixed(2)}</td>
                                <td className="border p-2 text-right">{item.total.toFixed(2)}</td>
                                <td className="border p-2 text-center">
                                    <button title="Delete" onClick={() => deleteItem(index)}
                                            className="text-red-500 hover:text-red-700 transition-colors duration-200">
                                        <HiOutlineTrash size={20}/>
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>

                <div className="flex justify-center mb-4">
                    <table className="w-full border">
                        <tbody>
                        <tr>
                            <td className="border p-2">Sub Total</td>
                            <td className="border p-2 text-right">
                                {subTotal.toFixed(2)}
                            </td>
                        </tr>

                        <tr>
                            <td className="border p-2">Service Charge</td>
                            <td className="border p-2 text-right">
                                <input
                                    type="number"
                                    value={serviceCharge}
                                    onChange={(e) => setServiceCharge(Number(e.target.value))}
                                    className="w-full text-right"
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className="border p-2">Discount</td>
                            <td className="border p-2 text-right">
                                <input
                                    type="number"
                                    value={discount}
                                    onChange={(e) => setDiscount(Number(e.target.value))}
                                    className="w-full text-right"
                                />
                            </td>
                        </tr>

                        <tr className="font-bold text">
                            <td className="border p-2">Total</td>
                            <td className="border p-2 text-right">
                                {total.toFixed(2)}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center mt-6">
                    <button onClick={() => setShowPreview(true)}
                            className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 transition-colors">
                        Preview
                    </button>
                </div>
            </div>

            {/* PREVIEW MODAL */}
            {
                showPreview && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white w-[380px] p-6 shadow-lg font-mono">

                            <div ref={previewRef} className="font-mono">
                                <h2 className="text-center text-xl font-bold mb-2">AERIS ISLAND</h2>
                                <h6 className="text-center">Palatugaha Road, Talpe, Galle</h6>
                                <h6 className="text-center">ceylonvistas@gmail.com</h6>
                                <h6 className="text-center">077 002 9960</h6>

                                <div className="mt-4">
                                    <div className="flex justify-between">
                                        <span>Receipt: {receiptNo}</span>
                                        <span>Date: {currentDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Cashier: {cashier}</span>
                                        <span>Time: {currentTime}</span>
                                    </div>
                                </div>

                                <hr className="my-3"/>

                                <div className="flex">
                                    <span className="w-40">Item</span>
                                    <span className="w-10 text-center">Qty</span>
                                    <span className="flex-1 text-right">Amount</span>
                                </div>

                                <hr className="my-3"/>

                                {items.map((item, index) => (
                                    <div key={index} className="flex">
                                        <span className="w-40">{item.name}</span>
                                        <span className="w-10 text-center">{item.qty}</span>
                                        <span className="flex-1 text-right">{item.total.toFixed(2)}</span>
                                    </div>
                                ))}

                                <hr className="my-3"/>

                                <div className="flex justify-between">
                                    <span>Bill Amount</span>
                                    <span>{subTotal.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Service Charge</span>
                                    <span>{serviceCharge.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Discount</span>
                                    <span>{discount.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>{total.toFixed(2)}</span>
                                </div>

                                <hr className="my-3"/>

                                <p className="text-center pb-1">
                                    Thank You. Come Again!
                                </p>
                            </div>

                            <div className="flex gap-3 mt-5">
                                <button
                                    onClick={() => setShowPreview(false)}
                                    className="w-1/3 bg-gray-400 text-white py-2 rounded">
                                    Cancel
                                </button>
                                <button
                                    onClick={downloadBill}
                                    className="w-1/3 bg-blue-600 text-white py-2 rounded">
                                    Download
                                </button>
                                <button
                                    onClick={confirmPrint}
                                    className="w-1/3 bg-green-600 text-white py-2 rounded">
                                    Print
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};