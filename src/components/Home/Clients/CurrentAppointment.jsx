import React from "react";

import "./CurrentAppointment.scss";

import defaultPP from "../../../assets/pp_default.svg";

function CurrentAppointment(props) {
	console.log(props);

	return (
		<div className="currentAppointmentC">
			<div className="superior">
				<img
					className="supLeft"
					src={
						props.transaction?.client?.avatar
							? props.transaction.client.avatar
							: defaultPP
					}
					alt="ClientPicture"
				/>

				<div className="supRight">
					<div className="mainClientData">
						<b className="clientName">Marina Sandoval</b>
						<p>Mujer de 24 años</p>
						<div className="mainClientDataGrid">
							<b>Tel:</b>
							<span>8113335555</span>
							<b>e-mail:</b>
							<span>marina.sandoval@gmail.com</span>
							<b>Dirección:</b>
							<span>Auspurias 1224 Col del Maestro</span>
							<b></b>
							<span>San Nicolas de los Garza, Nuevo León</span>
						</div>
					</div>
					<div className="clinicHistory">
						<fieldset>
							<legend>Historia Clinica</legend>
							<div className="motivo"></div>
							<div className="clinicHistoryGrid">
								<div className="clinicHistoryGridLeft">
									<b>Motivo de la consulta:</b>
									<p>Bajar de peso por indicación medica</p>
									<b>Enfermedades</b>
									<p>Obesidad, Diabetes</p>
									<b>Malestares</b>
									<p>Estreñimiento, Inflamación</p>
									<b>Alergias</b>
									<p>Sin Alergias</p>
								</div>
								<div className="clinicHistoryGridRight">
									<b>No incluir en la dieta</b>
									<p>Aguacate, Cebolla, espinacas</p>
									<b>Ingesta de agua</b>
									<p>1 lt al día</p>
									<b>Ejercicio</b>
									<p>Sedentario</p>
									<b>Observaciones:</b>
									<p>Sin observaciones</p>
								</div>
							</div>
							<div className="observaciones"></div>
						</fieldset>
					</div>
				</div>
			</div>
			<div className="inferior">
					<div className="todayDataGrid">
						<div className="todayDataSup">
							<div><b>Peso:</b><input type="text" className="inputMeasurements" /><span>Kg.</span></div>
							<div><b>Grasa:</b><input type="text" className="inputMeasurements" /><span>Kg.</span></div>
							<div><b>Musculo:</b><input type="text" className="inputMeasurements" /><span>%</span></div>
						</div>
						<div className="todayDataInf"></div>
					</div>

			</div>
		</div>
	);
}

export default CurrentAppointment;
