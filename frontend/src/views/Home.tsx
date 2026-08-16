import {useNavigate} from "react-router-dom";
import {
    HiOutlineCash,
    HiOutlineClipboardList,
    HiOutlineCube,
    HiOutlineUsers,
    HiOutlinePrinter,
    HiOutlineHome,
    HiOutlineRefresh,
    HiOutlineArrowSmUp,
    HiOutlineExclamation,
    HiOutlineChartBar,
    HiOutlineDocumentText,
    HiOutlineCog,
    HiOutlineCollection,
    HiOutlineClock,
    HiOutlineCheckCircle,
} from "react-icons/hi";

export default function Home() {
    const navigate = useNavigate();

    const today = new Date();

    const formattedDate = today.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    const formattedTime = today.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6">

            {/* ================= HEADER ================= */}
            <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">POS Management System</h1>
                        <p className="text-gray-500 mt-2">
                            Manage billing, inventory and customer transactions
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-3 bg-gray-50 border rounded-lg px-4 py-3">
                            <HiOutlineClock size={22} className="text-sky-600"/>
                            <div>
                                <p className="text-xs text-gray-400">Today</p>
                                <p className="text-sm font-medium text-gray-700">
                                    {formattedDate}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-lg px-4 py-3">
                            <HiOutlineCheckCircle size={20} className="text-green-600"/>
                            <span className="text-sm font-medium text-green-700">
                                System Online
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= SUMMARY CARDS ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
                <div className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Today's Sales
                            </p>
                            <h2 className="text-2xl font-bold text-gray-800 mt-2">
                                LKR 50,000
                            </h2>
                            <div className="flex items-center gap-1 mt-3">
                                <HiOutlineArrowSmUp size={18} className="text-green-500"/>
                                <span className="text-sm font-medium text-green-600">12.5%</span>
                                <span className="text-xs text-gray-400">vs yesterday</span>
                            </div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-xl">
                            <HiOutlineCash size={30} className="text-green-600"/>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Today's Bills
                            </p>
                            <h2 className="text-2xl font-bold text-gray-800 mt-2">
                                10
                            </h2>
                            <div className="flex items-center gap-1 mt-3">
                                <HiOutlineArrowSmUp size={18} className="text-sky-500"/>
                                <span className="text-sm font-medium text-sky-600">8.3%</span>
                                <span className="text-xs text-gray-400">
                                    vs yesterday
                                </span>
                            </div>
                        </div>
                        <div className="bg-sky-50 p-3 rounded-xl">
                            <HiOutlineClipboardList size={30} className="text-sky-600"/>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Products
                            </p>
                            <h2 className="text-2xl font-bold text-gray-800 mt-2">
                                100
                            </h2>
                            <div className="flex items-center gap-1 mt-3">
                                <HiOutlineExclamation size={17} className="text-orange-500"/>
                                <span className="text-sm font-medium text-orange-600">8 Low Stock</span>
                            </div>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-xl">
                            <HiOutlineCube size={30} className="text-purple-600"/>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Customers
                            </p>
                            <h2 className="text-2xl font-bold text-gray-800 mt-2">
                                50
                            </h2>
                            <div className="flex items-center gap-1 mt-3">
                                <HiOutlineArrowSmUp size={18} className="text-green-500"/>
                                <span className="text-sm font-medium text-green-600">5 New</span>
                                <span className="text-xs text-gray-400">
                                    today
                                </span>
                            </div>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-xl">
                            <HiOutlineUsers size={30} className="text-orange-600"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= QUICK ACTIONS ================= */}
            <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">

                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            Quick Actions
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Quickly access frequently used modules
                        </p>
                    </div>
                    <HiOutlineRefresh size={22} className="text-gray-400 cursor-pointer hover:text-sky-600 transition"/>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* PRINT BILL */}
                    <button onClick={() => navigate("/print")} className="group text-left border rounded-xl p-5 hover:border-sky-300 hover:bg-sky-50 hover:shadow-sm transition">
                        <div className="flex items-center gap-4">
                            <div className="bg-sky-100 p-3 rounded-lg group-hover:bg-sky-200 transition">
                                <HiOutlinePrinter size={28} className="text-sky-600"/>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    Print Bill
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    Create & print bills
                                </p>
                            </div>
                        </div>
                    </button>

                    {/* INVENTORY */}
                    <button onClick={() => navigate("/inventory")} className="group text-left border rounded-xl p-5 hover:border-purple-300 hover:bg-purple-50 hover:shadow-sm transition">
                        <div className="flex items-center gap-4">
                            <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition">
                                <HiOutlineCube size={28} className="text-purple-600"/>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    Inventory
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    Manage stock & products
                                </p>
                            </div>
                        </div>
                    </button>

                    {/* PMS */}
                    <button onClick={() => navigate("/pms")} className="group text-left border rounded-xl p-5 hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm transition">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition">
                                <HiOutlineHome size={28} className="text-blue-600"/>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    Property
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    Reservations & rooms
                                </p>
                            </div>
                        </div>
                    </button>

                    {/* REPORTS */}
                    <button className="group text-left border rounded-xl p-5 hover:border-green-300 hover:bg-green-50 hover:shadow-sm transition">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition">
                                <HiOutlineChartBar size={28} className="text-green-600"/>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    Reports
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    Sales & business reports
                                </p>
                            </div>
                        </div>
                    </button>

                </div>
            </div>

            {/* ================= MAIN CONTENT ================= */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

                {/* ================= RECENT BILLS ================= */}
                <div className="xl:col-span-2 bg-white rounded-xl border shadow-sm">

                    <div className="flex items-center justify-between p-6 border-b">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Recent Bills
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Latest transactions
                            </p>
                        </div>
                        <button className="text-sm font-medium text-sky-600 hover:text-sky-700">
                            View All
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">
                                    Bill No
                                </th>
                                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">
                                    Customer
                                </th>
                                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">
                                    Time
                                </th>
                                <th className="text-right text-xs font-semibold text-gray-500 uppercase px-6 py-3">
                                    Amount
                                </th>
                                <th className="text-center text-xs font-semibold text-gray-500 uppercase px-6 py-3">
                                    Status
                                </th>
                            </tr>
                            </thead>

                            <tbody className="divide-y">

                            <tr className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                    B-0001
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    Walk-in Customer
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    03:15 PM
                                </td>
                                <td className="px-6 py-4 text-sm font-semibold text-gray-800 text-right">
                                    LKR 8,500
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full">
                                        <HiOutlineCheckCircle size={14}/>Paid
                                    </span>
                                </td>
                            </tr>

                            <tr className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                    B-0002
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    John Perera
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    02:48 PM
                                </td>
                                <td className="px-6 py-4 text-sm font-semibold text-gray-800 text-right">
                                    LKR 12,400
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full">
                                        <HiOutlineCheckCircle size={14}/>Paid
                                    </span>
                                </td>
                            </tr>

                            <tr className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                    B-0003
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    Walk-in Customer
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    01:32 PM
                                </td>
                                <td className="px-6 py-4 text-sm font-semibold text-gray-800 text-right">
                                    LKR 5,750
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-orange-700 bg-orange-50 rounded-full">
                                        Pending
                                    </span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ================= SALES OVERVIEW ================= */}
                <div className="bg-white rounded-xl border shadow-sm p-6">

                    <div className="flex items-center justify-between mb-6">

                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Sales Overview
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Today's performance
                            </p>
                        </div>

                        <HiOutlineChartBar
                            size={24}
                            className="text-sky-600"
                        />

                    </div>


                    <div className="space-y-5">

                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-600">
                                    Food & Beverage
                                </span>

                                <span className="text-sm font-semibold text-gray-800">
                                    LKR 32,500
                                </span>
                            </div>

                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div
                                    className="bg-sky-500 h-2 rounded-full"
                                    style={{width: "65%"}}
                                />
                            </div>
                        </div>


                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-600">
                                    Rooms
                                </span>

                                <span className="text-sm font-semibold text-gray-800">
                                    LKR 12,000
                                </span>
                            </div>

                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div
                                    className="bg-purple-500 h-2 rounded-full"
                                    style={{width: "40%"}}
                                />
                            </div>
                        </div>


                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-600">
                                    Other
                                </span>

                                <span className="text-sm font-semibold text-gray-800">
                                    LKR 5,500
                                </span>
                            </div>

                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div
                                    className="bg-green-500 h-2 rounded-full"
                                    style={{width: "25%"}}
                                />
                            </div>
                        </div>

                    </div>


                    <div className="border-t mt-6 pt-5">

                        <div className="flex justify-between items-center">

                            <span className="text-sm text-gray-500">
                                Total Sales
                            </span>

                            <span className="text-xl font-bold text-gray-800">
                                LKR 50,000
                            </span>

                        </div>

                    </div>

                </div>

            </div>

            {/* ================= BOTTOM SECTION ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LOW STOCK */}
                <div className="bg-white rounded-xl border shadow-sm p-6">

                    <div className="flex items-center justify-between mb-5">

                        <div>
                            <h2 className="font-semibold text-gray-800">
                                Low Stock Items
                            </h2>

                            <p className="text-xs text-gray-500 mt-1">
                                Items that need attention
                            </p>
                        </div>

                        <HiOutlineExclamation
                            size={22}
                            className="text-orange-500"
                        />

                    </div>


                    <div className="space-y-4">

                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-700">
                                    Coca Cola
                                </p>

                                <p className="text-xs text-gray-400">
                                    Beverage
                                </p>
                            </div>

                            <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
                                3 left
                            </span>
                        </div>


                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-700">
                                    Mineral Water
                                </p>

                                <p className="text-xs text-gray-400">
                                    Beverage
                                </p>
                            </div>

                            <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">
                                5 left
                            </span>
                        </div>


                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-700">
                                    Chicken
                                </p>

                                <p className="text-xs text-gray-400">
                                    Kitchen
                                </p>
                            </div>

                            <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">
                                7 kg
                            </span>
                        </div>

                    </div>

                </div>


                {/* SYSTEM STATUS */}
                <div className="bg-white rounded-xl border shadow-sm p-6">

                    <div className="flex items-center gap-3 mb-5">

                        <div className="bg-green-50 p-3 rounded-lg">
                            <HiOutlineCheckCircle
                                size={24}
                                className="text-green-600"
                            />
                        </div>

                        <div>
                            <h2 className="font-semibold text-gray-800">
                                System Status
                            </h2>

                            <p className="text-xs text-gray-500">
                                Current system services
                            </p>
                        </div>

                    </div>


                    <div className="space-y-4">

                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                                Database
                            </span>

                            <span className="text-sm font-medium text-green-600">
                                Connected
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                                Printer
                            </span>

                            <span className="text-sm font-medium text-green-600">
                                Ready
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                                POS Server
                            </span>

                            <span className="text-sm font-medium text-green-600">
                                Online
                            </span>
                        </div>

                    </div>

                </div>


                {/* TODAY SUMMARY */}
                <div className="bg-white rounded-xl border shadow-sm p-6">

                    <div className="flex items-center gap-3 mb-5">

                        <div className="bg-sky-50 p-3 rounded-lg">
                            <HiOutlineDocumentText
                                size={24}
                                className="text-sky-600"
                            />
                        </div>

                        <div>
                            <h2 className="font-semibold text-gray-800">
                                Today's Summary
                            </h2>

                            <p className="text-xs text-gray-500">
                                Business activity
                            </p>
                        </div>

                    </div>


                    <div className="space-y-4">

                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                                Total Transactions
                            </span>

                            <span className="font-semibold text-gray-800">
                                10
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                                Average Bill
                            </span>

                            <span className="font-semibold text-gray-800">
                                LKR 5,000
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                                Current Time
                            </span>

                            <span className="font-semibold text-gray-800">
                                {formattedTime}
                            </span>
                        </div>

                    </div>

                </div>

            </div>

            {/* ================= FOOTER ================= */}
            <div className="mt-6 bg-white border rounded-xl px-6 py-4">

                <div className="flex flex-col md:flex-row items-center justify-between gap-3">

                    <p className="text-sm text-gray-500">
                        POS Management System
                    </p>

                    <div className="flex items-center gap-5 text-sm text-gray-400">

                        <span className="flex items-center gap-1">
                            <HiOutlineCollection size={16}/>
                            Inventory
                        </span>

                        <span className="flex items-center gap-1">
                            <HiOutlinePrinter size={16}/>
                            Billing
                        </span>

                        <span className="flex items-center gap-1">
                            <HiOutlineCog size={16}/>
                            System
                        </span>

                    </div>

                </div>

            </div>
        </div>
    );
}