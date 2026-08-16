import React, { useContext } from "react"
import { AuthContext } from "./AuthProvider"
import { Link, useNavigate } from "react-router-dom"
import { VscAccount } from "react-icons/vsc";

const Logout = () => {
	const auth = useContext(AuthContext)
	const navigate = useNavigate()

	const handleLogout = () => {
		auth.handleLogout()
		navigate("/", { state: { message: " You have been logged out!" } })
	}
	const currentUser = localStorage.getItem("userId")

	return (
		<>
			<li>
				<div className="d-flex justify-content-start">
					<div className="mw-100" >
						<VscAccount />
					</div>
					<span className="text-primary">{currentUser}</span></div>
			</li>
			<li>
				<hr className="dropdown-divider" />
			</li>
			<li>
				<Link className="dropdown-item" to={"/profile"}>
					Profile
				</Link>
			</li>
			<li>
				<hr className="dropdown-divider" />
			</li>
			<button className="dropdown-item" onClick={handleLogout}>
				Logout
			</button>
		</>
	)
}

export default Logout;