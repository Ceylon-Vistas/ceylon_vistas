import {useNavigate} from "react-router-dom";
import {
    HiOutlineCash,
    HiOutlineClipboardList,
    HiOutlineCube,
    HiOutlineUsers,
    HiOutlinePrinter,
    HiOutlineHome
} from "react-icons/hi";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* TITLE */}
            <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">
                <div className="flex justify-center items-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-800">
                            POS Management System
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Manage billing, inventory and customer transactions
                        </p>
                    </div>
                </div>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">

                <div className="bg-white rounded-xl border shadow-sm p-5">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Today Sales</p>
                            <h2 className="text-2xl font-bold text-gray-800 mt-2">LKR 50,000</h2>
                        </div>
                        <HiOutlineCash size={35} className="text-sky-600"/>
                    </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm p-5">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Today Bills</p>
                            <h2 className="text-2xl font-bold text-gray-800 mt-2">10</h2>
                        </div>
                        <HiOutlineClipboardList size={35} className="text-sky-600"/>
                    </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm p-5">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Products</p>
                            <h2 className="text-2xl font-bold text-gray-800 mt-2">100</h2>
                        </div>
                        <HiOutlineCube size={35} className="text-sky-600"/>
                    </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm p-5">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Customers</p>
                            <h2 className="text-2xl font-bold text-gray-800 mt-2">50</h2>
                        </div>
                        <HiOutlineUsers size={35} className="text-sky-600"/>
                    </div>
                </div>
            </div>

            {/* POS MENU */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

                {/* PRINT BILL */}
                <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-lg transition">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-sky-100 p-3 rounded-lg">
                            <HiOutlinePrinter size={30} className="text-sky-600"/>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Print Bill</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">
                        Create customer invoices, preview and print bills.
                    </p>
                    <button onClick={() => navigate("/print")}
                            className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-medium transition">
                        Bill
                    </button>
                </div>

                {/* INVENTORY */}
                <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-lg transition">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <HiOutlineCube size={30} className="text-sky-600"/>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Inventory</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">
                        Manage products, stock and item quantities.
                    </p>
                    <button
                        className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-medium transition">
                        Inventory
                    </button>
                </div>

                {/* PMS */}
                <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-lg transition">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <HiOutlineHome size={30} className="text-sky-600"/>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Property</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">
                        Manage reservations, rooms, guests, check-ins and hotel operations.
                    </p>
                    <button onClick={() => navigate("/pms")}
                            className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-medium transition">
                        PMS
                    </button>
                </div>
            </div>
        </div>
    );
}