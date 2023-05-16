import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/app/Footer";
import Navbar from "../components/app/Navbar";
import { isAuthenticated } from "../services/authServices";

const Leiaute = () => {
    return (
        <>
            {isAuthenticated() ? (
                <>
                    <Navbar />
                    <div className="container mb-5 pb-5">
                        <Outlet />
                    </div>
                    <Footer />
                </>
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
};

export default Leiaute;