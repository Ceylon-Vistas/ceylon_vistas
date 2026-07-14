import {useNavigate} from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen">

            <h1 className="text-6xl text-center font-extrabold text-gray-800 mt-10 tracking-widest drop-shadow-md">
                Noa Sands
            </h1>

            <div className="ml-8 mt-24">
                <button onClick={() => navigate("/print-bill")}
                        className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-700
                    hover:from-blue-600 hover:via-blue-700 hover:to-indigo-800
                    text-white font-bold text-xl px-12 py-4 rounded-2xl
                    shadow-2xl transition-all duration-300
                    transform hover:scale-110 hover:shadow-blue-300">
                    Print Bill
                </button>
            </div>
        </div>
    );
}