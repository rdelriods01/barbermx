import React, { useEffect, useState } from "react";
import axios from "axios";
import { Drawer } from "@material-ui/core";
import { format } from "date-fns";
import "./DataHistory.scss";

import MenuPreview from "./MenuPreview";

function DataHistory(props) {
	const patientId = props.patientId;

	const [appointments, setAppointments] = useState([]);
	const [actualMenu, setActualMenu] = useState(null);

	const [openMenu, setOpenMenu] = useState(false);

	useEffect(() => {
		getAppointments();
	}, []);

	const getAppointments = async () => {
		console.log(patientId);
		await axios
			.get(`http://192.168.100.17:4000/api/events/patient/${patientId}`)
			.then((data) => {
				let events = data.data.data;
				console.log(events);
				let myEvents = [];
				for (let i = 0; i < events.length; i++) {
					if (i === 0) {
						let ev = {
							...events[i],
							difference: [0, 0, 0, 0, 0],
						};
						console.log(ev);
						myEvents.push(ev);
					} else {
						console.log(myEvents);
						let ev = {
							...events[i],
							difference: [
								Number(events[i - 1].measurements.peso) -
									Number(events[i].measurements.peso),
								Number(events[i - 1].measurements.grasa) -
									Number(events[i].measurements.grasa),
								Number(events[i - 1].measurements.musculo) -
									Number(events[i].measurements.musculo),
								Number(events[i - 1].measurements.abdomen) -
									Number(events[i].measurements.abdomen),
								Number(events[i - 1].measurements.cadera) -
									Number(events[i].measurements.cadera),
							],
						};
						myEvents.push(ev);
					}
				}
				console.log(myEvents);
				setAppointments(myEvents.reverse());
			});
	};

	const showMenu = (menu) => {
		console.log(menu);
		setActualMenu(menu);
		setOpenMenu(true);
	};

	const menuDone = () => {
		console.log("menu Done");
	};

	return (
		<div className="dataHistoryC">
			{appointments.length > 0 ? (
				<table>
					<thead>
						<tr>
							<th>Fecha</th>
							<th>Peso</th>
							<th>Grasa</th>
							<th>Músculo</th>
							<th>Abdomen</th>
							<th>Cadera</th>
							<th>Comentarios</th>
							<th>Menu</th>
						</tr>
					</thead>
					<tbody>
						{appointments.map((cita, index) => {
							if (index === appointments.length - 1) {
								return (
									<tr key={index}>
										<td>{format(new Date(cita.start), "dd-MMM-yy")}</td>
										<td>{cita.measurements.peso} Kg.</td>
										<td>{cita.measurements.grasa} %</td>
										<td>{cita.measurements.musculo} Kg.</td>
										<td>{cita.measurements.abdomen} cms.</td>
										<td>{cita.measurements.cadera} cms.</td>
										<td>{cita.comentarios}</td>
										<i
											className="material-icons btn"
											onClick={() => showMenu(cita.menu)}>
											description
										</i>
									</tr>
								);
							} else {
								return (
									<tr key={index}>
										<td>{format(new Date(cita.start), "dd-MMM-yy")}</td>
										<td
											className={
												cita.difference[0] > 0
													? "green"
													: cita.difference[0] < 0
													? "red"
													: ""
											}>
											{cita.measurements.peso} Kg{" "}
											{cita.difference[0] > 0 ? (
												<i className="material-icons">arrow_downward</i>
											) : cita.difference[0] < 0 ? (
												<i className="material-icons">arrow_upward</i>
											) : (
												<i className="material-icons">compare_arrows</i>
											)}
											{cita.difference[0]}
										</td>
										<td
											className={
												cita.difference[1] > 0
													? "green"
													: cita.difference[1] < 0
													? "red"
													: ""
											}>
											{cita.measurements.grasa} %
											{cita.difference[1] > 0 ? (
												<i className="material-icons">arrow_downward</i>
											) : cita.difference[1] < 0 ? (
												<i className="material-icons">arrow_upward</i>
											) : (
												<i className="material-icons">compare_arrows</i>
											)}
											{cita.difference[1]}
										</td>
										<td
											className={
												cita.difference[2] > 0
													? "green"
													: cita.difference[2] < 0
													? "red"
													: ""
											}>
											{cita.measurements.musculo} Kg
											{cita.difference[2] > 0 ? (
												<i className="material-icons">arrow_downward</i>
											) : cita.difference[2] < 0 ? (
												<i className="material-icons">arrow_upward</i>
											) : (
												<i className="material-icons">compare_arrows</i>
											)}
											{cita.difference[2]}
										</td>
										<td
											className={
												cita.difference[3] > 0
													? "green"
													: cita.difference[3] < 0
													? "red"
													: ""
											}>
											{cita.measurements.abdomen} cms.
											{cita.difference[3] > 0 ? (
												<i className="material-icons">arrow_downward</i>
											) : cita.difference[3] < 0 ? (
												<i className="material-icons">arrow_upward</i>
											) : (
												<i className="material-icons">compare_arrows</i>
											)}
											{cita.difference[3]}
										</td>
										<td
											className={
												cita.difference[4] > 0
													? "green"
													: cita.difference[4] < 0
													? "red"
													: ""
											}>
											{cita.measurements.cadera} cms.
											{cita.difference[4] > 0 ? (
												<i className="material-icons">arrow_downward</i>
											) : cita.difference[4] < 0 ? (
												<i className="material-icons">arrow_upward</i>
											) : (
												<i className="material-icons">compare_arrows</i>
											)}
											{cita.difference[4]}
										</td>
										<td>{cita.comentarios}</td>
										<i
											className="material-icons btn"
											onClick={() => showMenu(cita.menu)}>
											description
										</i>
									</tr>
								);
							}
						})}
					</tbody>
				</table>
			) : (
				<h3>Loading</h3>
			)}
			<Drawer
				className="TicketDrawer"
				open={openMenu}
				anchor="bottom"
				onClose={() => setOpenMenu(false)}>
				<MenuPreview
					menu={actualMenu}
					client={appointments.length > 0 ? appointments[0].client : null}
					onClose={menuDone}></MenuPreview>
			</Drawer>
		</div>
	);
}

export default DataHistory;
