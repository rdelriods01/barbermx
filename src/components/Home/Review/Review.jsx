import React, { useState, useEffect } from "react";
import axios from "axios";

import { Button } from "@material-ui/core";
import "./Review.scss";
import Spinner from "./Spinner";

function Review(props) {
	console.log(props);

	const currentMeasurements = props.transaction.measurements;

	const [lastEvent, setLastEvent] = useState(null);
	const [difference, setDifference] = useState([]);

	useEffect(() => {
		bringLastEventData();
	}, []);

	const bringLastEventData = async () => {
		let myLastEvnt = await axios.get(
			`http://localhost:4000/api/events/${props.transaction.client.lastAppointment}`
		);
		console.log(myLastEvnt);
		setLastEvent(myLastEvnt.data.measurements);
		calcDifferences(myLastEvnt.data.measurements);
	};
	const calcDifferences = (lastData) => {
		let myDiff = [];
		myDiff[0] = Number(currentMeasurements.peso) - Number(lastData.peso);
		myDiff[1] = Number(currentMeasurements.grasa) - Number(lastData.grasa);
		myDiff[2] = Number(currentMeasurements.musculo) - Number(lastData.musculo);
		myDiff[3] = Number(currentMeasurements.abdomen) - Number(lastData.abdomen);
		myDiff[4] = Number(currentMeasurements.cadera) - Number(lastData.cadera);
		setDifference(myDiff);
	};

	return (
		<div className="reviewC">
			<div className="gridContainer">
				<div className="left">
					<div className="leftTitle">
						<button
							className="backToTodayData"
							variant="contained"
							onClick={() => props.onClose(false, true, false)}>
							<i className="material-icons">arrow_back</i>
						</button>
						<h3>Comparación de la última cita:</h3>
					</div>
					<div className="leftGrid">
						<div className="titles">
							<b className="nothing">.</b>
							<b>Peso:</b>
							<b>Grasa:</b>
							<b>Músculo:</b>
							<b>Abdomen:</b>
							<b>Cadera:</b>
						</div>
						<div className="last">
							<b>Cita previa:</b>
							<span>{lastEvent && lastEvent.peso} kg</span>
							<span>{lastEvent && lastEvent.grasa} kg</span>
							<span>{lastEvent && lastEvent.musculo} %</span>
							<span>{lastEvent && lastEvent.abdomen} cms</span>
							<span>{lastEvent && lastEvent.cadera} cms</span>
						</div>
						<div className="current">
							<b>Cita Actual:</b>
							<span>{currentMeasurements && currentMeasurements.peso} kg</span>
							<span>{currentMeasurements && currentMeasurements.grasa} kg</span>
							<span>
								{currentMeasurements && currentMeasurements.musculo} %
							</span>
							<span>
								{currentMeasurements && currentMeasurements.abdomen} cms
							</span>
							<span>
								{currentMeasurements && currentMeasurements.cadera} cms
							</span>
						</div>
						<div className="difference">
							<b>Diferencia:</b>
							{difference.map((diff, index) => (
								<span key={index} className={diff < 0 ? "green" : "red"}>
									{diff}
								</span>
							))}
						</div>
					</div>
				</div>

				<div className="right">
					<Spinner
						initialWeight={props.transaction.client.initialWeight}
						goal={props.transaction.client.goal}
						current={props.transaction.measurements.peso}
					/>
				</div>
			</div>
			<div className="actionsBtns">
				<Button
					variant="contained"
					color="primary"
					onClick={() =>
						props.onClose(false, false, true, { ...props.transaction })
					}>
					to Menu
				</Button>
			</div>
		</div>
	);
}

export default Review;
