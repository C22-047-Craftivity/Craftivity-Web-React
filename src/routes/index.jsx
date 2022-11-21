import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from '../pages/Landing';
import LoginPage from '../pages/Login';

function Index() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Index;