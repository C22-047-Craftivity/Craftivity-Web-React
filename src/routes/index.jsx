import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from '../pages/Landing';

function Index() {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Landing />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Index;