import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from '../pages/Landing';
import LoginPage from '../pages/Login';
import DetailPage from '../pages/Detail';
import KeranjangPage from '../pages/Keranjang';

function Index() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/detail/:id" element={<DetailPage />} />
                <Route path="/keranjang" element={<KeranjangPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Index;