import { NavLink, Link } from "react-router-dom";
// import firebase from "firebase/app";

import "./Sidebar.scss";
import variables from "../../../variables.module.scss";
import defaultPP from "../../../assets/pp.png";

const Sidebar = (props) => {
	const admin = true;
	const logout = () => {
		// firebase.auth().signOut();
		console.log("logout");
	};

	return (
		<>
			<div className="topSidebar">
				<i className="material-icons  " onClick={props.onChange}>
					menu
				</i>
				{/* <div className="brand-logo">
					<Link to="/">
						<h3>barberMX</h3>
					</Link>
				</div> */}
			</div>
			<ul>
				<NavLink
					className="li"
					exact
					to="/"
					activeStyle={{ color: variables.primary }}>
					<i className="material-icons">dashboard</i>
					<span>Dashboard</span>
				</NavLink>
				<NavLink
					className="li"
					to="/agenda"
					activeStyle={{ color: variables.primary }}>
					<i className="material-icons">event</i>
					<span>Agenda</span>
				</NavLink>
				<NavLink
					className="li"
					to="/clients"
					activeStyle={{ color: variables.primary }}>
					<i className="material-icons">people</i>
					<span>Pacientes</span>
				</NavLink>
				<NavLink
					className="li"
					to="/3"
					activeStyle={{ color: variables.primary }}>
					<i className="material-icons">receipt</i>
					<span>Contabilidad</span>
				</NavLink>
				<NavLink
					className="li"
					to="/catalogue"
					activeStyle={{ color: variables.primary }}>
					<i className="material-icons">apps</i>
					<span>Catalogo</span>
				</NavLink>
				{admin ? (
					<NavLink
						className="li line"
						to="/admindb"
						activeStyle={{ color: variables.primary }}>
						<i className="material-icons">storage</i>
						<span>Database</span>
					</NavLink>
				) : null}
				<span className="spacer" />
				<div className="li" onClick={logout}>
					<i className="material-icons">exit_to_app</i>
					<span>Logout</span>
				</div>
				<div className="li" onClick={logout}>
					<img src={defaultPP} alt="PP" />
					<p> Usuario </p>
					{/* <p> {user} </p> */}
				</div>
			</ul>
		</>
	);
};

export default Sidebar;
