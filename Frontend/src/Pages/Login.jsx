import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../Context/AuthProvider";

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export const Login = () => {

    const { login } = useAuth();

    /*
    **Iniciar y obtener el valor del los elementos del HTML
    */
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const timeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [])

    /**
     * Funcion: Procesa el envio de los datos del formulario
     * data: almacena el valor de los datos
     */
    const handleLogin = (e) => {
        e.preventDefault();
        const data = {
            password: password,
            username: username
        };

        /**
         * Enalce: que recibira los datos enviados desde el Frontd al Back
         * Method: El metofo POST, de enviar datos
         * headers: La cabezera
         * body: el cuerpo de la solicitud; la variable con los datos indicados
         */

        /**
             * Then: Si la completa la solicitud sucedera lo siguiente:
             * Se enviara la respuesta en formato JSON();
             * En el server se creara el Token;
             * Luego se recibira el Token;
             * Se desencripta el token y se setea globalmente en el navegador(localStorage);
             * Luego se redirecciona a la pagina exclusiva del usuario ('/sesion')
             */
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

            .then((response) => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.message || err.error);
                    });
                };
                return response.json()
            })

            .then((result) => {
                console.log(parseJwt(result.token));

                if (result.token) {
                    localStorage.setItem('token', result.token);
                    login(result.token);
                    navigate('/sesion');
                }
            })
            .catch((error) => {
                setError(error.message);

                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                };

                timeoutRef.current = setTimeout(() => {
                    setError('');
                }, 2000)

            });

    }



    return (
        <>
            <div className='contenedor-form'>

                <div className='formulario'>
                    <h1>Login</h1>
                    <label>Usuario:</label>
                    <input
                        /**
                         Obtener y enviar los datos del html
                         */
                        onChange={(e) => { setUsername(e.target.value) }}
                        type="email"
                        name="correo"
                        id="correo"
                        placeholder="Usuario" />
                    <label htmlFor="">Contraseña</label>
                    <input
                        onChange={(e) => { setPassword(e.target.value) }}
                        type="password"
                        name="contraseña"
                        id="contraseña"
                        placeholder="Contraseña" />

                    <button
                        type="submit"
                        className="btn"
                        onClick={handleLogin}>Enviar</button>
                </div>
                {
                    error && <div className="errorFrom">{error}</div>
                }
            </div>

        </>
    )
}

