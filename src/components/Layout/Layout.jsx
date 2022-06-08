import { useState } from "react";
import Fab from "@material-ui/core/Fab";
import { Drawer } from "@material-ui/core";

import Sidebar from "./Sidebar/Sidebar";
import LayoutRouter from "./LayoutRouter";
import NewPatient from "./NewPatient";

/* Styles */
import "./Layout.scss";

function Layout() {
	const [sidebarPos, setSidebarPos] = useState(1);
	const [newPatientModal, setNewPatientModal] = useState(false);

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
				className="newPatientBtn"
				color="primary"
				onClick={() => setNewPatientModal(true)}>
				<i className="material-icons">add</i>
			</Fab>
			<Drawer
				open={newPatientModal}
				className="NewPatientDrawer"
				anchor="bottom"
				onClose={() => setNewPatientModal(false)}>
				<NewPatient onClose={() => setNewPatientModal(false)} />
			</Drawer>
		</div>
	);
}

export default Layout;
