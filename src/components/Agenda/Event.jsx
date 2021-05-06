import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import {
	Button,
	FormControl,
	Input,
	InputLabel,
	IconButton,
	Select,
	Dialog,
	MenuItem,
	OutlinedInput,
	Zoom,
} from "@material-ui/core";

import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";

import Draggable from "react-draggable";
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

	const [cliente, setCliente] = useState({});
	// const [clientes, setClientes] = useState([]);
	const [delbtn, setDelBtn] = useState(props.delbtn);
	const [ready, setReady] = useState(props.ready);
	const [open, setOpen] = useState(props.open);
	const [remove, setRemove] = useState(props.remove);
	const [start, setStart] = useState(props.event.start);
	const [end, setEnd] = useState(props.event.end);
	const [resourceId, setResourceId] = useState(1);
	// const [clientes] = useContext([]);
	const [results, setResults] = useState([]);
	const [activeStep, setActiveStep] = useState(0);

	useEffect(() => {
		if (ready === true) {
			props.onClose({ start, end, ready, remove, cliente, resourceId });
		}
	}, [ready]);

	useEffect(() => {
		if (remove === true) {
			props.onClose({ start, end, ready, remove, cliente, resourceId });
		}
	}, [remove]);

	useEffect(() => {
		if (open === false) {
			props.onClose({ start, end, ready, remove, cliente, resourceId });
		}
	}, [open]);

	const mapPropsToState = () => {
		if (props.delbtn) {
			clientes.forEach((el) => {
				let res = el.uid.localeCompare(props.event.clienteid);
				if (res === 0) {
					setCliente(el);
					console.log(el);
				}
			});
		}
		setDelBtn(props.delbtn);
		setReady(props.ready);
		setOpen(props.open);
		setRemove(props.remove);
		setStart(props.event.start);
		setEnd(props.event.end);
		props.event.resourceId
			? setResourceId(props.event.resourceId)
			: setResourceId(1);
	};

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
			setResults(filterAllProperties([...clientes], val));
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
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	// Stepper
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
						{delbtn ? (
							<Link to={{ pathname: `/cliente/${cliente.uid}` }}>
								<h3>{props.event.title}</h3>
							</Link>
						) : (
							<div className="newSelected">
								<IconButton
									// variant="contained"
									onClick={handleBack}>
									<i className="material-icons">arrow_back</i>
								</IconButton>
								<h3>{cliente.name}</h3>
							</div>
						)}
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
						<FormControl
							className="selectSala"
							size="small"
							variant="outlined"
							fullWidth>
							<InputLabel htmlFor="sala">Sala</InputLabel>
							<Select
								defaultValue={
									props.event.resourceId ? props.event.resourceId : resourceId
								}
								value={resourceId}
								onChange={(e) => setResourceId(e.target.value)}
								input={<OutlinedInput labelWidth={30} id="sala" />}>
								<MenuItem value={1}>Tomografía</MenuItem>
								<MenuItem value={2}>Rayos X</MenuItem>
								<MenuItem value={3}>Ultrasonido</MenuItem>
								<MenuItem value={4}>Mastografía</MenuItem>
							</Select>
						</FormControl>
					</div>
				);
			default:
				return "Uknown stepIndex";
		}
	}

	function handleBack() {
		setResults([]);
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	}

	return (
		<Dialog
			open={props.open}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
			disableAutoFocus={delbtn}
			onRendered={mapPropsToState}
			TransitionComponent={Zoom}>
			<Draggable handle=".header">
				<div className="eventModal">
					<div className="header">
						<h2 id="form-dialog-title"> {props.title} </h2>
						{delbtn ? (
							<IconButton onClick={handleRemove}>
								<i className="material-icons">delete</i>
							</IconButton>
						) : (
							<div />
						)}
					</div>
					{delbtn ? (
						<div className="editContent">
							{getStepContent(1)}
							<Button
								variant="contained"
								color="primary"
								fullWidth
								onClick={handleSubmit}>
								Guardar
							</Button>
						</div>
					) : (
						<div className="newContent">
							{getStepContent(activeStep)}
							{activeStep === 0 ? (
								<div />
							) : (
								<div className="btns">
									<Button
										variant="contained"
										color="primary"
										onClick={handleSubmit}
										fullWidth>
										Guardar
									</Button>
								</div>
							)}
						</div>
					)}
				</div>
			</Draggable>
		</Dialog>
	);
};

export default Event;
