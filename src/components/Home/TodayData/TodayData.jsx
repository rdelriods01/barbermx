import React from "react";

import { Button } from "@material-ui/core";

import "./TodayData.scss";

function TodayData(props) {
	console.log(props);

	return (
		<div className="todayDataC">
			<div className="title">
				<h2>{props.transaction.title}</h2>
			</div>
			<div className="todayDataContainer">
				<div className="todayDataGrid superior">
					<fieldset>
						<legend>Peso:</legend>
						<input type="text" maxLength={5} className="inputMeasurements" />
						<span>Kg.</span>
					</fieldset>
					<fieldset>
						<legend>Grasa:</legend>
						<input type="text" maxLength={5} className="inputMeasurements" />
						<span>Kg.</span>
					</fieldset>
					<fieldset>
						<legend>Musculo:</legend>
						<input type="text" maxLength={5} className="inputMeasurements" />
						<span>%</span>
					</fieldset>
				</div>
				<div className="todayDataGrid inferior">
					<fieldset>
						<legend>Abdomen:</legend>
						<input type="text" maxLength={5} className="inputMeasurements" />
						<span>cms.</span>
					</fieldset>
					<fieldset>
						<legend>Cadera:</legend>
						<input type="text" maxLength={5} className="inputMeasurements" />
						<span>cms.</span>
					</fieldset>
					{/* <fieldset>
						<legend>Glucosa:</legend>
						<input type="text" className="inputMeasurements" />
						<span>mg/dl</span>
					</fieldset> */}
				</div>
			</div>
			<div className="actionBtn">
				<Button
					className="step1Btn"
					variant="contained"
					color="primary"
					onClick={() => props.onClose()}>
					Ver resumen
				</Button>
			</div>
		</div>
	);
}

export default TodayData;
