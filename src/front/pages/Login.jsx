import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"; 

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
         
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!resp.ok) {
                alert("Correo o contraseña incorrectos");
                return;
            }

            const data = await resp.json();
            
         
            sessionStorage.setItem("token", data.token);
            
           
            dispatch({ type: "login_user", payload: data.token });
   
            navigate("/private");
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            <h2 className="mb-4 text-center">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Correo Electrónico</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-success w-100">Ingresar</button>
            </form>
        </div>
    );
};
