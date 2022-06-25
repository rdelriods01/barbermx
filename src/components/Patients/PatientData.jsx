import React from "react";

import "./PatientData.scss";

function PatientData(props) {
	console.log(props);
	let patient = props.patient;

	return (
		<div className="patientDataC">
			<div className="shapeData">
				<div className="patientAge">
					<b>Edad:</b>
					<span>{patient.age} años</span>
				</div>
				<div
					className={
						patient.height ? "patientHeight" : "patientHeight required"
					}>
					<b>Estatura:</b>
					<span>{patient.height}mts</span>
				</div>
				<div className={patient.goal ? "patientGoal" : "patientGoal required"}>
					<b>Peso deseado:</b>
					<span>{patient.goal}Kgs</span>
				</div>
			</div>
			<div className="personalData">
				<b>Tel:</b>
				<span>{patient.tel}</span>
				<b>e-mail:</b>
				<span>{patient.email}</span>
				{patient.demographics ? (
					<>
						<b>Dirección:</b>
						<span>{`${
							patient.demographics.address ? patient.demographics.address : ""
						} ${
							patient.demographics.numExt ? patient.demographics.numExt : ""
						}${
							patient.demographics.numInt ? patient.demographics.numInt : ""
						} ${
							patient.demographics.county ? patient.demographics.county : ""
						} ${
							patient.demographics.postalCode
								? patient.demographics.postalCode
								: ""
						}`}</span>
						<b></b>
						<span>
							{patient.demographics.city ? patient.demographics.city : ""},{" "}
							{patient.demographics.state ? patient.demographics.state : ""}
						</span>
					</>
				) : null}
			</div>
		</div>
	);
}

export default PatientData;
