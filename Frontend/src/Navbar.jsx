import { Link } from "react-router-dom"
import { useAuth } from "./Context/AuthProvider"
import { useNavigate } from "react-router-dom"

export const Navbar = () => {

    const { isAuthenticated, logout } = useAuth()

    const navigate = useNavigate();

    const handleLogout = () => { 
        logout();
        navigate('/login')
    }

    return (
        <>
            <nav className="NavBar">
                <Link to="/">Inicio</Link>
                <Link to="/login">Login</Link>
                {
                    isAuthenticated && (
                        <button className="btnLogout" onClick={handleLogout}>Salir</button>
                    )
                }
            </nav>
        </>
    )
}
