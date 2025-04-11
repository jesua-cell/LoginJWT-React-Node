import { Routes, Route } from "react-router-dom"
// Paginas
import { Inicio } from '../Pages/Inicio.jsx'
import { Login } from '../Pages/Login.jsx'
import { Error } from '../Pages/Error.jsx'
import { Sesion } from '../Sesion/Sesion.jsx';

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sesion" element={<Sesion />} />

            <Route path="/*" element={<Error />} />
        </Routes>
    )
}
