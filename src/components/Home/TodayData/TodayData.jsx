import { useState, useEffect } from "react";

import { Button } from "@material-ui/core";

import "./TodayData.scss";

function TodayData(props) {
	console.log(props);
	let measurements = props.transaction.measurements;

	const [height, setHeight] = useState(
		props.transaction.client.height ? props.transaction.client.height : ""
	);
	const [goal, setGoal] = useState(
		props.transaction.client.goal ? props.transaction.client.goal : ""
	);
	const [initialWeight, setInitialWeight] = useState(
		props.transaction.client.initialWeight
			? props.transaction.client.initialWeight
			: ""
	);
	const [peso, setPeso] = useState(measurements.peso ? measurements.peso : "");
	const [grasa, setGrasa] = useState(
		measurements.grasa ? measurements.grasa : ""
	);
	const [musculo, setMusculo] = useState(
		measurements.musculo ? measurements.musculo : ""
	);
	const [abdomen, setAbdomen] = useState(
		measurements.abdomen ? measurements.abdomen : ""
	);
	const [cadera, setCadera] = useState(
		measurements.cadera ? measurements.cadera : ""
	);
	const [disabledBtn, setDisabledBtn] = useState(true);

	useEffect(() => {
		if ([height, goal, peso, grasa, musculo, abdomen, cadera].includes("")) {
			setDisabledBtn(true);
		} else {
			setDisabledBtn(false);
		}
	}, [height, goal, peso, grasa, musculo, abdomen, cadera]);

	const handleClose = () => {
		if (props.transaction.client.initialWeight === "") {
			props.onClose(
				{ peso, grasa, musculo, abdomen, cadera },
				height,
				peso,
				goal
			);
		} else {
			props.onClose(
				{ peso, grasa, musculo, abdomen, cadera },
				height,
				initialWeight,
				goal
			);
		}
	};

	return (
		<div className="todayDataC">
			<div className="title">
				<h2>{props.transaction.title}</h2>
			</div>
			<div className="todayDataContainer">
				<div className="todayDataGrid initialData">
					<div></div>
					<fieldset>
						<legend>Estatura:</legend>
						<input
							type="text"
							value={height}
							onChange={(ev) =>
								setHeight(ev.target.value.replace(/[^0-9.]+/g, "").trim())
							}
							maxLength={5}
							className="inputMeasurements"
						/>
						<span>cms.</span>
					</fieldset>
					{props.transaction.client.initialWeight === "" ? null : (
						<fieldset>
							<legend>Peso Inicial:</legend>
							<input
								type="text"
								value={initialWeight}
								onChange={(ev) =>
									setInitialWeight(
										ev.target.value.replace(/[^0-9.]+/g, "").trim()
									)
								}
								maxLength={5}
								className="inputMeasurements"
							/>
							<span>Kg.</span>
						</fieldset>
					)}
					<fieldset>
						<legend>Peso deseado:</legend>
						<input
							type="text"
							value={goal}
							onChange={(ev) =>
								setGoal(ev.target.value.replace(/[^0-9.]+/g, "").trim())
							}
							maxLength={5}
							className="inputMeasurements"
						/>
						<span>Kg.</span>
					</fieldset>
				</div>
				<div className="todayDataGrid superior">
					<fieldset>
						<legend>Peso:</legend>
						<input
							type="text"
							value={peso}
							autoFocus
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
					onClick={() => handleClose()}>
					Ver resumen
				</Button>
			</div>
		</div>
	);
}

export default TodayData;
