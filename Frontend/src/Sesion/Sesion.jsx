import { useNavigate } from "react-router-dom"

export const Sesion = () => {

    // const navigate = useNavigate();

    // const handleLogaut = () => {
    //     localStorage.removeItem('token');
    //     navigate('/login');
    // }

    return (
        <>
                {/* <button
                    className="btnLogout"
                    onClick={handleLogaut}>Salir</button> */}
                <div className="sesionLogin">
                    <h1>Sesion Iniciada</h1>
                </div>
        </>
    )
}
