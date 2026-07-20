import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./views/Home.tsx";
import PrintBill from "./views/PrintBill.tsx";
import PMS from "./views/PMS.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/print-bill" element={<PrintBill/>}/>
                <Route path="/pms" element={<PMS/>}/>
            </Routes>
        </BrowserRouter>
    );
}