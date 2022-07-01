import React, { useState, useEffect } from "react";

import { Button } from "@material-ui/core";
import "./Review.scss";

function Review(props) {
	console.log(props);

	const [showSpinner, setShowSpinner] = useState(false);
	const [spinnerValue, setSpinnerValue] = useState(0);
	const [lostWeight, setLostWeight] = useState(0);
	const [toLose, setToLose] = useState(0);

	useEffect(() => {
		calcSpinnerValue();
	}, []);

	const calcSpinnerValue = () => {
		// The Spinner is made with pure CSS
		// To move the value of the spinner is done with the css property stroke-dashoffset
		// In order to move from max fill or 100% (0) to min fill or 0% (-208) you need to calculate the position (or percentage)
		// from where is the current value depending on how much weight the patient has lost
		// So, first we need to get the initial weight (read the appointments array length of the client, if its 0, then this is the first appointment,
		// and props.transaction.measurements.peso is the pesoInicial)
		if (props.transaction.client.initialWeight === "") {
			// If its the firs appointmente, its not necessary to calculate anything because there is not going to be Spinner
			console.log("First appointment");
			setShowSpinner(false);
		} else {
			setShowSpinner(true);
			let pesoInicial = props.transaction.client.initialWeight;
			// let pesoInicial = 120;
			console.log(`El peso inicial es: ${pesoInicial}`);
			let pesoFinal = props.transaction.client.goal;
			let current = Number(props.transaction.measurements.peso);
			// Para calcular el porcentaje del peso actual es necesario primero sacar el valor delta de peso inicial y goal
			// peso inicial sera 100% y el goal sera 0% del spinner
			let delta = pesoInicial - pesoFinal;
			console.log(`La delta es: ${delta}`);
			// Una vez obtenido el delta, hay que saber cuanto ha bajado
			let pesoBajado = pesoInicial - current;
			setLostWeight(pesoBajado);
			console.log(`El peso bajado es: ${pesoBajado}`);
			console.log(`El peso por perder es: ${current - pesoFinal}`);
			setToLose(current - pesoFinal);

			console.log(`El peso actual es: ${current}`);
			console.log(`El peso ideal es: ${pesoFinal}`);
			// Calcular con regla de 3, delta --- 100% / pesoBajado --- X ?
			// pesoBajado*100/delta
			let porcentajeSpinner = (pesoBajado * 100) / delta;
			console.log(`El porcentaje del spinner es: ${porcentajeSpinner}`);

			// Teniendo el porcentaje, hay que pasarlo al valor que el strokeDashoffset entienda, es decir un valor entre -208 y 0
			let mySpinnerValue = (porcentajeSpinner * 208) / 100;
			console.log(`Mi valor del spinner para css es: ${mySpinnerValue}`);
			setSpinnerValue(mySpinnerValue);
		}
	};

	return (
		<div className="reviewC">
			<div className="title">Review of {props.transaction.title}</div>
			<div className="gridContainer">
				<div className="left"></div>
				<div className="right">
					<div className="progress">
						<div className="spinner">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								// xmlns:xlink="http://www.w3.org/1999/xlink"
								width="100"
								height="75"
								viewbox="5 5 100 80"
								preserveAspectRatio="xMidYMid meet">
								<path className="backS" d="M80,70 A40,40 0 1,0 20,70" />
								<path
									className="frontS"
									d="M80,70 A40,40 0 1,0 20,70"
									style={{ strokeDashoffset: `-${spinnerValue}%` }}
								/>
							</svg>

							<div className="lostWeight">
								<p>
									{lostWeight < 0
										? `+${lostWeight}kg`
										: lostWeight > 0
										? `-${lostWeight}kg`
										: null}
								</p>
								<h5>
									{lostWeight < 0
										? "Total subido"
										: lostWeight > 0
										? "Total bajado"
										: null}
								</h5>
							</div>
						</div>
						<div class="pesos">
							<div class="pesosSup">
								<p>
									{props.transaction.client.goal} kg <span>Peso ajustado</span>{" "}
								</p>
								<p>
									{props.transaction.client.initialWeight} kg{" "}
									<span>Peso inicial</span>{" "}
								</p>
							</div>
							<div class="pesosInf">
								<p>
									{props.transaction.measurements.peso} kg{" "}
									<span>Peso actual</span>{" "}
								</p>
								<p>
									{toLose} kg
									<span>Por bajar</span>
								</p>
								{/* <p *ngIf="!subio" style="color:#4CAF50" >{{totalbajado}} kg <span>Total bajado</span> </p>
								<p *ngIf="subio" style="color:#d11e11" >{{totalbajado}} kg <span>Total subido</span> </p> */}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="actionsBtn">
				<Button
					className="backToTodayData"
					variant="contained"
					color="primary"
					onClick={() => props.onClose(false, true, false)}>
					<i className="material-icons">arrow_back</i>
				</Button>
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
