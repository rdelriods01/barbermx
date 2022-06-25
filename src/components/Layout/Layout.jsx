import { useState } from "react";
import { useHistory } from "react-router-dom";

import Fab from "@material-ui/core/Fab";
import { Drawer } from "@material-ui/core";

import Sidebar from "./Sidebar/Sidebar";
import LayoutRouter from "./LayoutRouter";
import NewPatient from "./NewPatient";
import BookPatient from "./BookPatient";

/* Styles */
import "./Layout.scss";

function Layout() {
	const history = useHistory();
	const [sidebarPos, setSidebarPos] = useState(1);
	const [showButtons, setShowButtons] = useState(false);
	const [newPatientModal, setNewPatientModal] = useState(false);
	const [bookPatientModal, setBookPatientModal] = useState(false);

	const handleSidebar = () => {
		if (sidebarPos < 2) {
			setSidebarPos(sidebarPos + 1);
		} else {
			setSidebarPos(1);
		}
	};

	let sidebarClass = ["sidebar"];
	let mainClass = ["main"];
	if (sidebarPos === 1) {
		sidebarClass.push("sidebarMin");
		mainClass.push("mainMin");
	}
	if (sidebarPos === 2) {
		sidebarClass.push("sidebarOpen");
		mainClass.push("mainOpen");
	}

	const newPatientDone = () => {
		setNewPatientModal(false);
		if (history.location.pathname === "/") {
			// I push some undefined route to history in order to force a refresh to update Patient List in Home
			history.push("/someUndefinedRouteJustToReloadHome");
		}
	};
	const bookPatientDone = () => {
		setBookPatientModal(false);
		if (history.location.pathname === "/") {
			// I push some undefined route to history in order to force a refresh to update Patient List in Home
			history.push("/someUndefinedRouteJustToReloadHome");
		}
	};
	return (
		<div className="layout">
			{/* <Navbar  /> */}
			<div className={sidebarClass.join(" ")}>
				<Sidebar onChange={handleSidebar} />
			</div>
			<div className={mainClass.join(" ")}>
				<LayoutRouter />
			</div>
			<Fab
				className="fabBtn"
				color={showButtons ? "inherit" : "primary"}
				onClick={() => setShowButtons((prev) => !prev)}>
				<i
					className={
						showButtons ? "material-icons rotate" : "material-icons norotate"
					}>
					add
				</i>
			</Fab>
			<div
				className={showButtons ? "dropDownBackground" : "hide"}
				onClick={() => {
					setShowButtons(false);
				}}>
				<div className="addButtons">
					<Fab
						className={showButtons ? "newPatientBtn" : "hideBtn"}
						color="primary"
						onClick={() => setNewPatientModal(true)}>
						<i className="material-icons">add</i>
					</Fab>
					<b className={showButtons ? "newPatientLabel" : "hideBtn"}>
						Agregar nuevo paciente
					</b>
					<Fab
						className={showButtons ? "searchBtn" : "hideBtn"}
						color="primary"
						onClick={() => setBookPatientModal(true)}>
						<i className="material-icons">search</i>
					</Fab>
					<b className={showButtons ? "searchLabel" : "hideBtn"}>
						Buscar y agendar paciente
					</b>
				</div>
			</div>
			<Drawer
				open={newPatientModal}
				className="NewPatientDrawer"
				anchor="bottom"
				onClose={() => setNewPatientModal(false)}>
				<NewPatient onClose={newPatientDone} />
			</Drawer>
			<Drawer
				open={bookPatientModal}
				className="BookPatientDrawer"
				anchor="bottom"
				onClose={() => setBookPatientModal(false)}>
				<BookPatient onClose={bookPatientDone} />
			</Drawer>
		</div>
	);
}

export default Layout;
