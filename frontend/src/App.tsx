import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./views/Home.tsx";
import Print from "./views/Print.tsx";
import PMS from "./views/PMS.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/print" element={<Print/>}/>
                <Route path="/pms" element={<PMS/>}/>
            </Routes>
        </BrowserRouter>
    );
}