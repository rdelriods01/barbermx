import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import {
	Button,
	FormControl,
	Input,
	InputLabel,
	IconButton,
	Select,
	MenuItem,
	OutlinedInput,
	Stepper,
	Step,
	StepContent,
	StepLabel,
	StepButton,
} from "@material-ui/core";

import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";

import { getHours, getMinutes } from "date-fns";
// import { ClientesContext } from "../../Store";

const Event = (props) => {
	const clientes = [
		{ uid: "1", name: "Ricardo Del Rio", tel: "8711126205" },
		{ uid: "2", name: "Alberto Saavedra", tel: "8712222222" },
		{ uid: "3", name: "Osvaldo Aleman", tel: "8713333333" },
		{ uid: "4", name: "Gerardo Alba", tel: "8714444444" },
		{ uid: "5", name: "Hector Ramirez", tel: "8715555555" },
	];
	const servicios = [
		{ uid: "0", desc: "" },
		{ uid: "1", desc: "Corte de cabello", costo: 100 },
		{ uid: "2", desc: "Corte de barba", costo: 80 },
		{ uid: "3", desc: "Rasurada completa", costo: 80 },
	];
	// console.log(clientes);
	console.log(props);
	const [cliente, setCliente] = useState({});
	// const [clientes, setClientes] = useState([]);
	const [editFlag, setEditFlag] = useState(props.editFlag);
	const [completo, setCompleto] = useState(props.ready);
	const [ready, setReady] = useState(props.ready);
	const [open, setOpen] = useState(props.open);
	const [remove, setRemove] = useState(props.remove);
	const [start, setStart] = useState(props.event.start);
	const [end, setEnd] = useState(props.event.end);
	const [barber, setBarber] = useState(
		props.event.resourceId ? props.event.resourceId : ""
	);
	const [servicio, setServicio] = useState(
		props.event.servicio ? props.event.servicio : ""
	);
	// const [clientes] = useContext([]);
	const [results, setResults] = useState([]);
	const steps = getSteps();
	const [activeStep, setActiveStep] = useState(0);
	const [completed, setCompleted] = useState({});

	useEffect(() => {
		if (ready === true) {
			props.onClose({ start, end, ready, remove, cliente, barber });
		}
	}, [ready]);

	useEffect(() => {
		if (remove === true) {
			props.onClose({ start, end, ready, remove, cliente, barber });
		}
	}, [remove]);

	useEffect(() => {
		if (barber !== "" || open === true) {
			handleComplete(3);
		} else {
			setCompleted({ ...completed, 3: false });
			console.log(completed);
		}
	}, [barber, open]);

	useEffect(() => {
		if (servicio !== "") {
			handleComplete(1);
		} else {
			setCompleted({ ...completed, 1: false });
		}
	}, [open, servicio]);

	useEffect(() => {
		if (start !== "" && end !== "") {
			handleComplete(2);
		} else {
			setCompleted({ ...completed, 2: false });
		}
	}, [start, end, open]);

	useEffect(() => {
		if (open === false) {
			props.onClose({ start, end, ready, remove, cliente, barber });
		} else {
			console.log("openx");
			console.log(completedSteps());
		}
	}, [open]);

	useEffect(() => {
		if (completed[1] === false) {
			setActiveStep(0);
		}
	}, [completed]);

	useEffect(() => {
		console.log(activeStep);
	}, [activeStep]);

	const handleTimeChange = (date, time) => {
		let mins = getMinutes(date);
		let hours = getHours(date);
		if (time === "start") {
			let newDate = new Date(start);
			newDate.setHours(hours);
			newDate.setMinutes(mins);
			setStart(newDate);
		}
		if (time === "end") {
			let newDate = new Date(end);
			newDate.setHours(hours);
			newDate.setMinutes(mins);
			setEnd(newDate);
		}
	};

	const handleSubmit = (ev) => {
		ev.preventDefault();
		setReady(true);
	};
	const handleRemove = () => {
		const r = window.confirm(
			"¿Estás seguro que deseas eliminar esta cita de la agenda?"
		);
		if (r === true) {
			setRemove(true);
		}
	};
	const handleClose = () => {
		setOpen(false);
	};

	// FIlter
	const filterClientes = (val) => {
		val = val.trim().toLowerCase();
		if (val === "") {
			setResults([]);
		} else {
			if (val.length > 3) {
				// Traer de la BD los que empiecen con 4 caracteres de val
				// y luego filtrarlos en el Front
				setResults(filterAllProperties([...clientes], val));
			}
		}
	};

	const filterAllProperties = (array, value) => {
		let filtrado = [];
		for (let i = 0; i < array.length; i++) {
			let obj = JSON.stringify(array[i]);
			if (obj.toLowerCase().indexOf(value) >= 0) {
				filtrado.push(JSON.parse(obj));
			}
		}
		return filtrado;
	};

	const selectCliente = (pat) => {
		setCliente(pat);
		handleComplete(0);
		handleNext();
	};

	// Stepper
	function getSteps() {
		return [
			"Selecciona el cliente",
			"Selecciona el servicio",
			"Fecha y Hora de la cita",
			"Selecciona el barber",
		];
	}

	const totalSteps = () => {
		return steps.length;
	};

	const completedSteps = () => {
		return Object.keys(completed).length;
	};

	const isLastStep = () => {
		return activeStep === totalSteps() - 1;
	};

	const allStepsCompleted = () => {
		return completedSteps() === totalSteps();
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStep = (step) => () => {
		setActiveStep(step);
	};

	const handleComplete = (step) => {
		console.log(activeStep);
		const newCompleted = completed;
		newCompleted[step] = true;
		setCompleted(newCompleted);
		// handleNext();
	};

	function getStepContent(stepIndex) {
		switch (stepIndex) {
			case 0:
				return (
					<div className="case0">
						<FormControl
							className="titleinput"
							margin="normal"
							required
							fullWidth>
							<InputLabel htmlFor="title">Buscar cliente</InputLabel>
							<Input
								id="title"
								name="title"
								autoComplete="title"
								autoFocus
								onChange={(e) => filterClientes(e.target.value)}
							/>
						</FormControl>
						<ul className="clienteList">
							{results.length > 0 ? (
								<div>
									{results.map((cliente, index) => {
										return (
											<li
												key={index}
												className={index % 2 ? "even" : "odd"}
												onClick={() => selectCliente(cliente)}>
												<span> {cliente.name} </span>
												<span> {cliente.tel} </span>
											</li>
										);
									})}
								</div>
							) : null}
						</ul>
					</div>
				);
			case 1:
				return (
					<div className="case1">
						<FormControl
							className="selectSala"
							size="small"
							variant="outlined"
							fullWidth>
							<InputLabel htmlFor="sala">Sala</InputLabel>
							<Select
								value={servicio}
								onChange={(e) => setServicio(e.target.value)}
								input={<OutlinedInput labelWidth={30} id="sala" />}>
								{servicios.map((servicio, index) => (
									<MenuItem key={index} value={servicio.desc}>
										{servicio.desc === ""
											? "Agrega el servicio requerido"
											: servicio.desc}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
				);
			case 2:
				return (
					<div className="pickers">
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<TimePicker
								className="timepicker"
								inputVariant="outlined"
								size="small"
								label="Inicio"
								minutesStep="5"
								value={start}
								onChange={(date) => handleTimeChange(date, "start")}
							/>
							<TimePicker
								className="timepicker"
								inputVariant="outlined"
								size="small"
								minutesStep="5"
								label="Fin"
								value={end}
								onChange={(date) => handleTimeChange(date, "end")}
							/>
						</MuiPickersUtilsProvider>
					</div>
				);
			case 3:
				return (
					<FormControl
						className="selectBarber"
						size="small"
						variant="outlined"
						fullWidth>
						<InputLabel htmlFor="barber">Barber</InputLabel>
						<Select
							defaultValue={props.event.barber ? props.event.barber : barber}
							value={barber}
							onChange={(e) => setBarber(e.target.value)}
							input={<OutlinedInput labelWidth={30} id="barber" />}>
							<MenuItem value={""}>Selecciona el barber</MenuItem>
							<MenuItem value={1}>Barber1</MenuItem>
							<MenuItem value={2}>Barber2</MenuItem>
						</Select>
					</FormControl>
				);
			default:
				return "Uknown stepIndex";
		}
	}

	return (
		<div>
			<div className="eventModal" role="presentation">
				<div className="header">
					<b id="form-dialog-title"> {props.title} </b>
					{editFlag ? (
						<IconButton onClick={handleRemove}>
							<i className="material-icons">delete</i>
						</IconButton>
					) : (
						<div />
					)}
				</div>
				<div className="stepper">
					<Stepper nonLinear activeStep={activeStep} orientation="vertical">
						{steps.map((label, index) => (
							<Step key={index}>
								<StepButton
									onClick={handleStep(index)}
									completed={completed[index]}>
									{label}
								</StepButton>
								<StepContent>{getStepContent(index)}</StepContent>
							</Step>
						))}
					</Stepper>
					<div className="btns">
						<Button
							variant="contained"
							color="primary"
							disabled={!completo}
							onClick={handleSubmit}
							fullWidth>
							Guardar
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Event;
