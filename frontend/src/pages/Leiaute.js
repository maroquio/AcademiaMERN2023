import { Outlet } from "react-router-dom";
import Footer from "../components/app/Footer";
import Navbar from "../components/app/Navbar";

const Leiaute = () => {
    return (
        <>
            <Navbar />
            <div className="container mb-5 pb-5">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default Leiaute;