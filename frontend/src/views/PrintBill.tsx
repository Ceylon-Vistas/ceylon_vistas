import {HiOutlineTrash} from "react-icons/hi";
import usePrintBillController from "../controllers/PrintBillController";

export default function PrintBill() {
    const {
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
        setServiceCharge,
        setDiscount,
        setShowPreview,

        addItem,
        deleteItem,
        confirmPrint,
        downloadBill,

        subTotal,
        total,
        currentDate,
        currentTime
    } = usePrintBillController();

    return (
        <div className="min-h-screen bg-gray-100 p-14">

            <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">

                {/* TITLE */}
                <div className="border-gray-200 pb-6 mb-2 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                        Billing Management
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Create, preview and print customer invoices
                    </p>
                </div>

                {/* BILL INFORMATION */}
                <div className="border rounded-lg p-5 mb-6">

                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Bill Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bill No</label>
                            <input value={billNo} onChange={(e) => setBillNo(e.target.value)}
                                   className="w-full border rounded p-2 outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400"/>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cashier</label>
                            <input value={cashier} onChange={(e) => setCashier(e.target.value)}
                                   className="w-full border rounded p-2 outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400"/>
                        </div>
                    </div>
                </div>

                {/* ITEM DETAILS */}
                <div className="border rounded-lg p-5 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Item Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                        {/* Item */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Item</label>
                            <input value={name} onChange={(e) => setName(e.target.value)}
                                   className="w-full border rounded p-2 outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400"/>
                        </div>

                        {/* Qty */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Qty</label>
                            <input type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))}
                                   className="w-full border rounded p-2 outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400"/>
                        </div>

                        {/* Unit Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price</label>
                            <input type="number" value={unitPrice}
                                   onChange={(e) => setUnitPrice(Number(e.target.value))}
                                   className="w-full border rounded p-2 outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400"/>
                        </div>

                        {/* Add Button */}
                        <div>
                            <button onClick={addItem}
                                    className="w-full bg-sky-600 hover:bg-sky-700 text-white rounded-md py-2 font-medium transition outline-none">
                                Add Item
                            </button>
                        </div>
                    </div>
                </div>

                {/* TABLE */}
                <div className="rounded-lg overflow-hidden border">
                    <table className="w-full">
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
                                    <td className="border p-2 text-center">{item.unitPrice.toFixed(2)}</td>
                                    <td className="border p-2 text-center">{item.total.toFixed(2)}</td>
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
                </div>

                {/* SUMMERY */}
                <div className="p-5 mt-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Bill Summary
                    </h2>

                    <div className="rounded-lg overflow-hidden border">
                        <table className="w-full border">
                            <tbody>
                            <tr>
                                <td className="border p-2">Sub Total</td>
                                <td className="border p-2 text-right">{subTotal.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Service Charge</td>
                                <td className="border p-2 text-right">
                                    <input
                                        type="number"
                                        value={serviceCharge}
                                        onChange={(e) => setServiceCharge(Number(e.target.value))}
                                        className="w-full text-right rounded outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400"
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
                                        className="w-full text-right rounded outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400"
                                    />
                                </td>
                            </tr>
                            <tr className="font-bold text">
                                <td className="border p-2">Total</td>
                                <td className="border p-2 text-right">{total.toFixed(2)}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* PREVIEW BUTTON */}
                <div className="flex justify-center mt-2">
                    <button onClick={() => setShowPreview(true)}
                            className="px-10 py-3 rounded-md bg-sky-600 hover:bg-sky-700 text-white font-medium shadow transition outline-none">
                        Preview Invoice
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
                                        <span>Bill No: {billNo}</span>
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
                                    <span>Sub Total</span>
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
                                <button onClick={() => setShowPreview(false)}
                                        className="w-1/3 bg-gray-400 text-white py-2 rounded">Cancel
                                </button>
                                <button onClick={downloadBill}
                                        className="w-1/3 bg-green-600 text-white py-2 rounded">Download
                                </button>
                                <button onClick={confirmPrint}
                                        className="w-1/3 bg-blue-600 text-white py-2 rounded">Print
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};