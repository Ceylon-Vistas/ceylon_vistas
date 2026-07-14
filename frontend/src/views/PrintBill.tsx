import React from "react";
import {type Bill, printBill} from "../controllers/PrintBillController.ts";

const PrintBill: React.FC = () => {

    const handlePrint = async () => {

        const bill: Bill = {
            receiptNo: "REC-0001",
            date: "2026-12-12",
            cashier: "KAVITHMA",
            items: [
                {
                    name: "MANGO JUICE",
                    qty: 2,
                    unitPrice: 1200,
                    total: 2400
                },
                {
                    name: "SEAFOOD PLATTER",
                    qty: 1,
                    unitPrice: 8000,
                    total: 8000
                },
                {
                    name: "SEAFOOD FRIED RICE (Normal)",
                    qty: 1,
                    unitPrice: 2600,
                    total: 2600
                },
                {
                    name: "PINEAPPLE JUICE",
                    qty: 4,
                    unitPrice: 1200,
                    total: 4800
                }
            ],
            subTotal: 17800,
            serviceCharge: 1780,
            discount: 0,
            total: 19580
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
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">

                <h1 className="text-2xl font-bold text-center mb-6">
                    Thermal Printer
                </h1>

                <button
                    onClick={handlePrint}
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
                >
                    Print Bill
                </button>

            </div>
        </div>
    );
};

export default PrintBill;