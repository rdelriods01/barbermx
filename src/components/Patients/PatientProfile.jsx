/* eslint-disable no-unused-expressions */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import ClinicHistory from "./ClinicHistory";
import defaultPP from "../../assets/pp_default.svg";

import "./PatientProfile.scss";
import EditPatientData from "./EditPatientData";
import EditMedicalData from "./EditMedicalData";
import { Drawer } from "@material-ui/core";
import PatientData from "./PatientData";

function PatientProfile(props) {
	console.log(props);

	const history = useHistory();

	const patientID = props.match.params.uid;
	const [patient, setPatient] = useState(null);
	const [openEditPatientData, setOpenEditPatientData] = useState(false);
	const [openEditMedicalData, setOpenEditMedicalData] = useState(false);
	const [showActionsMenu, setShowActionsMenu] = useState(false);

	useEffect(() => {
		getPatient();
	}, []);

	const getPatient = async () => {
		await axios
			.get(`http://localhost:4000/api/clients/${patientID}`)
			.then((data) => {
				console.log(data.data);
				if (data.data.hasOwnProperty("medicalHistory")) {
					setPatient(data.data);
				} else {
					setPatient({
						...data.data,
						medicalHistory: {
							reason: "",
							conditions: "",
							illness: "",
							allergies: "",
							notIncluded: "",
							waterConsumption: "",
							exercise: "",
							comments: "",
						},
					});
				}
			});
	};

	const editMedicalHistory = (newData) => {
		console.log(newData);
		console.log(patientID);
		getPatient();
	};

	const editPatientDataDone = () => {
		console.log("editPatientDataDone");
		setOpenEditPatientData(false);
		getPatient();
	};
	const editMedicalDataDone = () => {
		console.log("editMedicalDataDone");
		setOpenEditMedicalData(false);
		getPatient();
	};
	const deletePatient = async () => {
		window.confirm(`Estas seguro que deseas eliminar a ${patient.name}`)
			? (console.log(patient),
			  await axios
					.delete(`http://localhost:4000/api/clients/${patientID}`, {
						data: patient,
					})
					.then(async (response) => {
						console.log(response);
					})
					.catch((error) => {
						console.log(error);
					}),
			  alert(`Se eliminó a ${patient.name}`),
			  history.push("/clients"))
			: console.log("culo");
	};

	return (
		<div className="patientProfileC">
			{patient ? (
				<>
					<div className="superior">
						<img
							className={patient.gender === "M" ? "male" : "female"}
							src={
								props.transaction?.client?.avatar
									? props.transaction.client.avatar
									: defaultPP
							}
							alt="ClientPicture"
						/>

						<div className="supRight">
							<div className="patientData">
								<div className="nameAndActions">
									<b className="clientName">{patient.name}</b>
									<button
										className="actionsBtn"
										onClick={() => setShowActionsMenu((prev) => !prev)}>
										<i className="material-icons">more_vert</i>
									</button>
									<div
										className={showActionsMenu ? "dropDownBackground" : "hide"}
										onClick={() => {
											setShowActionsMenu(false);
										}}>
										<div className="dropdown">
											<label
												className="option"
												onClick={() => {
													setOpenEditPatientData(true);
													setShowActionsMenu(false);
												}}>
												Editar Paciente
											</label>
											<label
												className="option"
												onClick={() => {
													setOpenEditMedicalData(true);
													setShowActionsMenu(false);
												}}>
												Editar Historia Clínica
											</label>
											<label
												className="option"
												onClick={() => {
													setShowActionsMenu(false);
													deletePatient();
												}}>
												Eliminar
											</label>
										</div>
									</div>
								</div>
								<PatientData patient={patient} />
							</div>
							<ClinicHistory data={patient.medicalHistory} />
						</div>
					</div>
					<div className="inferior">
						<h1>Total de visitas: {patient.appointments.length}</h1>
					</div>
					<Drawer
						className="EditPatientDataDrawer"
						open={openEditPatientData}
						anchor="bottom"
						onClose={() => setOpenEditPatientData(false)}>
						<EditPatientData
							patient={patient}
							onClose={editPatientDataDone}></EditPatientData>
					</Drawer>
					<Drawer
						className="EditMedicalDataDrawer"
						open={openEditMedicalData}
						anchor="bottom"
						onClose={() => setOpenEditMedicalData(false)}>
						<EditMedicalData
							data={patient.medicalHistory}
							patientId={patientID}
							onClose={editMedicalDataDone}></EditMedicalData>
					</Drawer>
				</>
			) : (
				<h1>Loading</h1>
			)}
		</div>
	);
}

export default PatientProfile;
