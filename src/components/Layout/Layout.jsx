import { useState } from "react";
import Fab from "@material-ui/core/Fab";
import { Drawer } from "@material-ui/core";

import Sidebar from "./Sidebar/Sidebar";
import LayoutRouter from "./LayoutRouter";
import NewPatient from "./NewPatient";
import BookPatient from "./BookPatient";

/* Styles */
import "./Layout.scss";

function Layout() {
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

	const handleAddButton = () => {
		setShowButtons(true);
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
				color={showButtons ? "other" : "primary"}
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
				<NewPatient onClose={() => setNewPatientModal(false)} />
			</Drawer>
			<Drawer
				open={bookPatientModal}
				className="BookPatientDrawer"
				anchor="bottom"
				onClose={() => setBookPatientModal(false)}>
				<BookPatient onClose={() => setBookPatientModal(false)} />
			</Drawer>
		</div>
	);
}

export default Layout;
