import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"; // Usamos el reducer de tu plantilla

export const Private = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    
  
    const token = sessionStorage.getItem("token");

    useEffect(() => {
     
        if (!token) {
            console.log("Acceso denegado: Token ausente. Redirigiendo a /login...");
            navigate("/login");
            return;
        }

       
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/private`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}` // Enviamos el token en las cabeceras
            }
        })
        .then(resp => {
            // Si el backend responde que el token expiró o es falso, lo expulsamos
            if (!resp.ok) {
                console.log("Token inválido o expirado. Limpiando sesión...");
                sessionStorage.removeItem("token");
                navigate("/login");
            }
            return resp.json();
        })
        .then(data => {
            if (data && data.msg) {
                setContent(data.msg); // Guardamos el mensaje de bienvenida seguro
            }
        })
        .catch(err => {
            console.error("Error en la validación de seguridad:", err);
            navigate("/login");
        });

    }, [token, navigate]);

   
    if (!token) return null;

    
    return (
        <div className="container mt-5 text-center">
            <div className="card p-5 shadow border-0 bg-white" style={{ borderRadius: "15px" }}>
                <div className="mb-4">
                    <span style={{ fontSize: "4rem" }}>🔒</span>
                </div>
                <h1 className="display-5 fw-bold text-success mb-3">Zona Privada Verificada</h1>
                <hr className="my-4 mx-5" />
                
               
                <p className="lead text-secondary fw-semibold">
                    {content || "Validando credenciales criptográficas con el servidor..."}
                </p>
                
               
            </div>
        </div>
    );
};
