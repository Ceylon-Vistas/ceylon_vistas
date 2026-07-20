import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "../src/views/Home.tsx";
import PrintBill from "../src/views/PrintBill.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/print-bill" element={<PrintBill/>}/>
            </Routes>
        </BrowserRouter>
    );
}