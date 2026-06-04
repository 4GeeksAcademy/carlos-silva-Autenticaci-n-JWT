// import { Link } from "react-router-dom";

// export const Navbar = () => {

// 	return (
// 		<nav className="navbar navbar-light bg-light">
// 			<div className="container">
// 				<Link to="/">
// 					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
// 				</Link>
// 				<div className="ml-auto">
// 					<Link to="/demo">
// 						<button className="btn btn-primary">Check the Context in action</button>
// 					</Link>
// 				</div>
// 			</div>
// 		</nav>
// 	);
// };
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"; // Hook para usar el Reducer

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();

	// El Navbar lee el token para saber si el usuario está autenticado
	const token = store.token || sessionStorage.getItem("token");

	const handleLogout = () => {
		// 1. Elimina el token de la sesión del navegador
		sessionStorage.removeItem("token");
		
		// 2. Limpia el token del estado global de React
		dispatch({ type: "logout_user" });
		
		// 3. Redirige a la página de inicio pública de inmediato
		navigate("/");
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto d-flex align-items-center">
					{/* Botón existente en la plantilla */}
					<Link to="/demo" className="me-3">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>

					{/* Control de autenticación visual dinámico */}
					{!token ? (
						<>
							<Link to="/signup" className="btn btn-outline-secondary me-2">
								Registro
							</Link>
							<Link to="/login" className="btn btn-success">
								Iniciar Sesión
							</Link>
						</>
					) : (
						// Cualquier momento que el usuario presione el "cierre de sesión" se ejecuta la acción
						<button onClick={handleLogout} className="btn btn-danger">
							Cerrar Sesión
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};
