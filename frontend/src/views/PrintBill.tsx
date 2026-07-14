import React, {useState} from "react";
import {type Bill, type BillItem, printBill} from "../controllers/PrintBillController.ts";

const PrintBill: React.FC = () => {

    const [receiptNo, setReceiptNo] = useState("");
    const [date, setDate] = useState("");
    const [cashier, setCashier] = useState("");

    const [itemName, setItemName] = useState("");
    const [qty, setQty] = useState(1);
    const [unitPrice, setUnitPrice] = useState(0);

    const [items, setItems] = useState<BillItem[]>([]);

    const [serviceCharge, setServiceCharge] = useState(0);
    const [discount, setDiscount] = useState(0);

    const addItem = () => {

        if (!itemName || qty <= 0 || unitPrice <= 0) {
            alert("Please enter valid item details.");
            return;
        }

        const item: BillItem = {
            name: itemName,
            qty,
            unitPrice,
            total: qty * unitPrice
        };

        setItems([...items, item]);

        setItemName("");
        setQty(1);
        setUnitPrice(0);
    };

    const subTotal = items.reduce((sum, item) => sum + item.total, 0);

    const total = subTotal + serviceCharge - discount;

    const handlePrint = async () => {

        const bill: Bill = {
            receiptNo,
            date,
            cashier,
            items,
            subTotal,
            serviceCharge,
            discount,
            total
        };

        try {
            await printBill(bill);
            alert("Bill Printed Successfully");
        } catch (error) {
            console.error(error);
            alert("Printing Failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10">

            <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Print Bill
                </h1>

                <div className="grid grid-cols-3 gap-4 mb-6">

                    <input
                        type="text"
                        placeholder="Receipt No"
                        value={receiptNo}
                        onChange={(e) => setReceiptNo(e.target.value)}
                        className="border rounded p-2"
                    />

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border rounded p-2"
                    />

                    <input
                        type="text"
                        placeholder="Cashier"
                        value={cashier}
                        onChange={(e) => setCashier(e.target.value)}
                        className="border rounded p-2"
                    />

                </div>

                <div className="grid grid-cols-4 gap-4 mb-4">

                    <input
                        type="text"
                        placeholder="Item Name"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        className="border rounded p-2"
                    />

                    <input
                        type="number"
                        placeholder="Qty"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        className="border rounded p-2"
                    />

                    <input
                        type="number"
                        placeholder="Unit Price"
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(Number(e.target.value))}
                        className="border rounded p-2"
                    />

                    <button
                        onClick={addItem}
                        className="bg-green-600 text-white rounded"
                    >
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
                    </tr>

                    </thead>

                    <tbody>

                    {items.map((item, index) => (

                        <tr key={index}>

                            <td className="border p-2">{item.name}</td>

                            <td className="border p-2 text-center">{item.qty}</td>

                            <td className="border p-2 text-right">
                                {item.unitPrice.toFixed(2)}
                            </td>

                            <td className="border p-2 text-right">
                                {item.total.toFixed(2)}
                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

                <div className="grid grid-cols-2 gap-4">

                    <div></div>

                    <div>

                        <div className="flex justify-between mb-2">
                            <span>Sub Total</span>
                            <span>{subTotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between mb-2">

                            <span>Service Charge</span>

                            <input
                                type="number"
                                value={serviceCharge}
                                onChange={(e) => setServiceCharge(Number(e.target.value))}
                                className="border rounded p-1 w-32 text-right"
                            />

                        </div>

                        <div className="flex justify-between mb-2">

                            <span>Discount</span>

                            <input
                                type="number"
                                value={discount}
                                onChange={(e) => setDiscount(Number(e.target.value))}
                                className="border rounded p-1 w-32 text-right"
                            />

                        </div>

                        <div className="flex justify-between font-bold text-lg">

                            <span>Total</span>

                            <span>{total.toFixed(2)}</span>

                        </div>

                    </div>

                </div>

                <button
                    onClick={handlePrint}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded"
                >
                    Print Bill
                </button>

            </div>

        </div>
    );
};

export default PrintBill;