import { useState, useEffect } from "react";

import { Button } from "@material-ui/core";

import "./TodayData.scss";

function TodayData(props) {
	console.log(props);

	const [peso, setPeso] = useState(
		props.transaction.measurements?.peso
			? props.transaction.measurements.peso
			: ""
	);
	const [grasa, setGrasa] = useState(
		props.transaction.measurements?.grasa
			? props.transaction.measurements.grasa
			: ""
	);
	const [musculo, setMusculo] = useState(
		props.transaction.measurements?.musculo
			? props.transaction.measurements.musculo
			: ""
	);
	const [abdomen, setAbdomen] = useState(
		props.transaction.measurements?.abdomen
			? props.transaction.measurements.abdomen
			: ""
	);
	const [cadera, setCadera] = useState(
		props.transaction.measurements?.cadera
			? props.transaction.measurements.cadera
			: ""
	);
	const [disabledBtn, setDisabledBtn] = useState(true);

	useEffect(() => {
		if ([peso, grasa, musculo, abdomen, cadera].includes("")) {
			setDisabledBtn(true);
		} else {
			setDisabledBtn(false);
		}
	}, [peso, grasa, musculo, abdomen, cadera]);

	return (
		<div className="todayDataC">
			<div className="title">
				<h2>{props.transaction.title}</h2>
			</div>
			<div className="todayDataContainer">
				<div className="todayDataGrid superior">
					<fieldset>
						<legend>Peso:</legend>
						<input
							type="text"
							value={peso}
							onChange={
								(ev) => setPeso(ev.target.value.replace(/[^0-9.]+/g, "").trim()) //replace works with numbers and point
							}
							maxLength={5}
							className="inputMeasurements"
						/>
						<span>Kg.</span>
					</fieldset>
					<fieldset>
						<legend>Grasa:</legend>
						<input
							type="text"
							value={grasa}
							onChange={(ev) =>
								setGrasa(ev.target.value.replace(/[^0-9.]+/g, "").trim())
							}
							maxLength={5}
							className="inputMeasurements"
						/>
						<span>Kg.</span>
					</fieldset>
					<fieldset>
						<legend>Musculo:</legend>
						<input
							type="text"
							value={musculo}
							onChange={(ev) =>
								setMusculo(ev.target.value.replace(/[^0-9.]+/g, "").trim())
							}
							maxLength={5}
							className="inputMeasurements"
						/>
						<span>%</span>
					</fieldset>
				</div>
				<div className="todayDataGrid inferior">
					<fieldset>
						<legend>Abdomen:</legend>
						<input
							type="text"
							value={abdomen}
							onChange={(ev) =>
								setAbdomen(ev.target.value.replace(/[^0-9.]+/g, "").trim())
							}
							maxLength={5}
							className="inputMeasurements"
						/>
						<span>cms.</span>
					</fieldset>
					<fieldset>
						<legend>Cadera:</legend>
						<input
							type="text"
							value={cadera}
							onChange={(ev) =>
								setCadera(ev.target.value.replace(/[^0-9.]+/g, "").trim())
							}
							maxLength={5}
							className="inputMeasurements"
						/>
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
					className={disabledBtn ? "disabledBtn" : "enableBtn"}
					variant="contained"
					disabled={disabledBtn}
					color="primary"
					onClick={() =>
						props.onClose({ peso, grasa, musculo, abdomen, cadera })
					}>
					Ver resumen
				</Button>
			</div>
		</div>
	);
}

export default TodayData;
