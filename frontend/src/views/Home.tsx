import {useNavigate} from "react-router-dom";
import {
    HiOutlineCash,
    HiOutlineCube,
    HiOutlineChartBar,
    HiOutlineShoppingCart,
    HiOutlineUsers,
    HiOutlineClipboardList
} from "react-icons/hi";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* HEADER */}
            <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800">POS Management System</h1>
                        <p className="text-gray-500 mt-2">
                            Manage billing, inventory and customer transactions
                        </p>
                    </div>
                    <div className="hidden md:block bg-sky-100 text-sky-700 px-5 py-3 rounded-lg font-medium">
                        System Online
                    </div>
                </div>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">

                <div className="bg-white rounded-xl border shadow-sm p-5">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Today's Sales</p>
                            <h2 className="text-2xl font-bold text-gray-800 mt-2">LKR 45,500</h2>
                        </div>
                        <HiOutlineCash size={35} className="text-green-600"/>
                    </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm p-5">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Total Bills</p>
                            <h2 className="text-2xl font-bold text-gray-800 mt-2">124</h2>
                        </div>
                        <HiOutlineClipboardList size={35} className="text-sky-600"/>
                    </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm p-5">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Products</p>
                            <h2 className="text-2xl font-bold text-gray-800 mt-2">560</h2>
                        </div>
                        <HiOutlineCube size={35} className="text-purple-600"/>
                    </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm p-5">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Customers</p>
                            <h2 className="text-2xl font-bold text-gray-800 mt-2">89</h2>
                        </div>
                        <HiOutlineUsers size={35} className="text-orange-600"/>
                    </div>
                </div>
            </div>

            {/* POS MENU */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

                {/* PRINT BILL */}
                <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-lg transition">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-sky-100 p-3 rounded-lg">
                            <HiOutlineShoppingCart size={30} className="text-sky-600"/>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Billing</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">
                        Create customer invoices, preview and print bills.
                    </p>
                    <button onClick={() => navigate("/print-bill")}
                            className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-medium transition">
                        Create Bill
                    </button>
                </div>

                {/* INVENTORY */}
                <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-lg transition">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <HiOutlineCube size={30} className="text-purple-600"/>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Inventory</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">
                        Manage products, stock and item quantities.
                    </p>
                    <button
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition">
                        Manage Inventory
                    </button>
                </div>

                {/* REPORTS */}
                <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-lg transition">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-green-100 p-3 rounded-lg">
                            <HiOutlineChartBar size={30} className="text-green-600"/>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Reports</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">
                        Analyze sales and transaction reports.
                    </p>
                    <button
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition">
                        View Reports
                    </button>
                </div>
            </div>


            {/* RECENT TRANSACTIONS */}
            <div className="bg-white rounded-xl border shadow-sm p-6">

                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Recent Transactions
                </h2>

                <div className="space-y-3">
                    <div className="flex justify-between border-b pb-3">
                        <span>B-0001 - Customer Payment</span>
                        <span className="font-semibold">LKR 5,500</span>
                    </div>
                    <div className="flex justify-between border-b pb-3">
                        <span>B-0002 - Restaurant Order</span>
                        <span className="font-semibold">LKR 8,200</span>
                    </div>
                </div>
            </div>
        </div>
    );
}