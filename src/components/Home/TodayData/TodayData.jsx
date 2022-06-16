import React from "react";

import { Button } from "@material-ui/core";

import "./TodayData.scss";

function TodayData(props) {
	console.log(props);

	return (
		<div className="todayDataC">
			<div className="todayDataGrid">
				<div className="todayDataSup">
					<fieldset>
						<legend>Peso:</legend>
						<input type="text" className="inputMeasurements" />
						<span>Kg.</span>
					</fieldset>
					<fieldset>
						<legend>Grasa:</legend>
						<input type="text" className="inputMeasurements" />
						<span>Kg.</span>
					</fieldset>
					<fieldset>
						<legend>Musculo:</legend>
						<input type="text" className="inputMeasurements" />
						<span>%</span>
					</fieldset>
				</div>
				<div className="todayDataSup">
					<fieldset>
						<legend>Peso:</legend>
						<input type="text" className="inputMeasurements" />
						<span>Kg.</span>
					</fieldset>
					<fieldset>
						<legend>Grasa:</legend>
						<input type="text" className="inputMeasurements" />
						<span>Kg.</span>
					</fieldset>
					<fieldset>
						<legend>Musculo:</legend>
						<input type="text" className="inputMeasurements" />
						<span>%</span>
					</fieldset>
				</div>
			</div>
			<div className="actionsBtn">
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
