import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
    const { isLoggedIn, loading } = useAuth();
    const location = useLocation();
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Đang tải...</span>
                </div>
            </div>
        );
    }

    if (!isLoggedIn) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }
    return children;
}