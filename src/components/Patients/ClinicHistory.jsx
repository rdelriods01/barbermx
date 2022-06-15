import React from "react";

import "./ClinicHistory.scss";

function ClinicHistory(props) {
	console.log(props);
	let data = props.data;

	return (
		<div className="clinicHistoryC">
			<fieldset>
				<legend>Historia Clinica</legend>
				<div className="clinicHistoryGrid">
					<div className="clinicHistoryGridLeft">
						<b>Motivo de la consulta:</b>
						<p>{data.reason === "" ? "-" : data.reason}</p>
						<b>Enfermedades</b>
						<p>{data.conditions === "" ? "-" : data.conditions}</p>
						<b>Malestares</b>
						<p>{data.illness === "" ? "-" : data.illness}</p>
						<b>Alergias</b>
						<p>{data.allergies === "" ? "-" : data.allergies}</p>
					</div>
					<div className="clinicHistoryGridRight">
						<b>No incluir en la dieta</b>
						<p>{data.notIncluded === "" ? "-" : data.notIncluded}</p>
						<b>Ingesta de agua</b>
						<p>{data.waterConsumption === "" ? "-" : data.waterConsumption}</p>
						<b>Ejercicio</b>
						<p>{data.exercise === "" ? "-" : data.exercise}</p>
						<b>Observaciones:</b>
						<p>{data.comments === "" ? "-" : data.comments}</p>
					</div>
				</div>
			</fieldset>
		</div>
	);
}

export default ClinicHistory;
