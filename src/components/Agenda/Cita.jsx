import { useState, useEffect } from "react";
import { format, getMinutes, getHours, isAfter, isEqual } from "date-fns";
import { es } from "date-fns/locale";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import "./Cita.scss";

const Cita = (props) => {
	console.log(props);
	const servicios = [
		{ uid: "1", desc: "Corte de cabello", costo: 100 },
		{ uid: "2", desc: "Corte de barba", costo: 80 },
		{ uid: "3", desc: "Rasurada completa", costo: 80 },
		{ uid: "3", desc: "Rasurada completa", costo: 80 },
		{ uid: "3", desc: "Rasurada completa", costo: 80 },
		{ uid: "3", desc: "Rasurada completa", costo: 80 },
		{ uid: "3", desc: "Rasurada completa", costo: 80 },
		{ uid: "3", desc: "Rasurada completa", costo: 80 },
		{ uid: "3", desc: "Rasurada completa", costo: 80 },
		{ uid: "3", desc: "Rasurada completa", costo: 80 },
		{ uid: "3", desc: "Rasurada completa", costo: 80 },
		{ uid: "3", desc: "Rasurada completa", costo: 80 },
	];
	const clientes = [
		{ uid: "1", name: "Ricardo Del Rio", tel: "8711126205" },
		{ uid: "2", name: "Alberto Saavedra", tel: "8712222222" },
		{ uid: "3", name: "Osvaldo Aleman", tel: "8713333333" },
		{ uid: "4", name: "Gerardo Alba", tel: "8714444444" },
		{ uid: "5", name: "Hector Ramirez", tel: "8715555555" },
	];
	const barbers = ["", "Barber 1", "Barber 2", "Barber 3", "Barber 4"];

	const [servicio, setServicio] = useState(
		props.event.servicio ? props.event.servicio : ""
	);
	const [barber, setBarber] = useState(
		props.event.resourceId ? props.event.resourceId : 1
	);
	const [cliente, setCliente] = useState(
		props.event.cliente ? props.event.cliente : ""
	);
	const [start, setStart] = useState(
		props.event.start ? props.event.start : ""
	);
	const [end, setEnd] = useState(props.event.end ? props.event.end : "");
	const [errorTime, setErrorTime] = useState("");
	// flags
	const [editServiciosFlag, setEditServiciosFlag] = useState(false);
	const [showServiciosCard, setShowServiciosCard] = useState(false);
	const [servicioSelected, setServicioSelected] = useState(false);

	const [editClientesFlag, setEditClientesFlag] = useState(false);
	const [showClientesCard, setShowClientesCard] = useState(false);
	const [clienteSelected, setClienteSelected] = useState(false);

	const [showCardHoras, setShowCardHoras] = useState(false);
	const [horasSelected, setHorasSelected] = useState(false);

	const [showBarberSelect, setShowBarberSelect] = useState(false);

	//COMPONENT USEEFFECTS

	useEffect(() => {
		setEditServiciosFlag(false);
		if (servicio !== "") {
			setServicioSelected(true);
		} else {
			setServicioSelected(false);
		}
	}, [servicio]);

	useEffect(() => {
		console.log(barber);
	}, [barber]);

	useEffect(() => {
		setEditClientesFlag(false);
		if (cliente !== "") {
			setClienteSelected(true);
		} else {
			setClienteSelected(false);
		}
	}, [cliente]);

	useEffect(() => {
		if (start !== "" || end !== "") {
			console.log(start);
			console.log(end);
			if (isAfter(start, end) || isEqual(start, end)) {
				setErrorTime("Revisa que las horas sean correctas");
				setHorasSelected(false);
			} else {
				setErrorTime("");
				setHorasSelected(true);
			}
		} else {
			setHorasSelected(false);
		}
	}, [start, end]);

	// COMPONENT FUNCTIONS

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

	return (
		<div className="citaC">
			<div className="citaHeader">
				<b>{props.title}</b>
			</div>
			<div className="steps">
				<div className="step ">
					<b className={servicioSelected ? "num done" : "num"}>1</b>
					<span className="line"></span>
					<div className="card">
						{servicioSelected ? (
							<div className="conDatos">
								<div className="tituloCard">
									<b>SERVICIO AGENDADO:</b>
									<button
										className="editBtn"
										onClick={() => {
											setShowServiciosCard(true);
											setEditServiciosFlag(true);
										}}>
										Editar
									</button>
								</div>
								<div className="cardContent">
									<b>{servicio.desc}</b>
									<span
										className="barberSelect"
										onClick={() => setShowBarberSelect((prev) => !prev)}>
										{barbers[barber]}
										<i className="material-icons">arrow_drop_down</i>
									</span>
									<div
										className={
											showBarberSelect
												? "dropdown selectDropDown"
												: "dropdown selectDropDown hide"
										}>
										<label
											className="option"
											onClick={() => {
												setBarber(1);
												setShowBarberSelect(false);
											}}>
											Barber 1
										</label>
										<label
											className="option"
											onClick={() => {
												setBarber(2);
												setShowBarberSelect(false);
											}}>
											Barber 2
										</label>
										<label
											className="option"
											onClick={() => {
												setBarber(3);
												setShowBarberSelect(false);
											}}>
											Barber 3
										</label>
										<label
											className="option"
											onClick={() => {
												setBarber(4);
												setShowBarberSelect(false);
											}}>
											Barber 4
										</label>
									</div>
								</div>
							</div>
						) : (
							<div className="sinDatos">
								<div className="tituloCard">
									<b>AGREGAR SERVICIO</b>
								</div>
								<button onClick={() => setShowServiciosCard((prev) => !prev)}>
									Seleccionar servicio
								</button>
							</div>
						)}
						<div className={showServiciosCard ? "dropdown" : "dropdown hide"}>
							{editServiciosFlag ? (
								<>
									<span
										className=" dropdownBtn backBtn"
										onClick={() => {
											setShowServiciosCard(false);
										}}>
										<i className="material-icons">arrow_back</i>
									</span>
									<span
										className="dropdownBtn deleteBtn"
										onClick={() => {
											setServicio("");
											setShowServiciosCard(false);
										}}>
										<i className="material-icons">delete</i>
									</span>
								</>
							) : (
								<span
									className="dropdownBtn  cancelBtn"
									onClick={() => {
										setServicio("");
										setShowServiciosCard(false);
										setEditServiciosFlag(false);
									}}>
									<i className="material-icons">clear</i>
								</span>
							)}
							<input
								type="search"
								name="searchServicio"
								id="searchServicio"
								className="searchbarInDropdown"
								placeholder="Buscar..."
							/>
							<div className="dropdownList">
								{servicios.map((servicio, index) => (
									<li
										key={index}
										value={servicio.desc}
										onClick={() => {
											setShowServiciosCard(false);
											setServicio(servicio);
										}}>
										<span>{servicio.desc}</span>
										<span className="costo">${servicio.costo}</span>
									</li>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className="step cliente ">
					<b className={clienteSelected ? "num done" : "num"}>2</b>
					<span className="line"></span>
					<div className="card">
						{clienteSelected ? (
							<div className="conDatos">
								<div className="tituloCard">
									<b>INFORMACIÓN DEL CLIENTE:</b>
									<button
										className="editBtn"
										onClick={() => {
											setShowClientesCard(true);
											setEditClientesFlag(true);
										}}>
										Editar
									</button>
								</div>
								<div className="cardContent">
									<b>{cliente.name}</b>
									<span>{cliente.tel} </span>
								</div>
							</div>
						) : (
							<div className="sinDatos">
								<div className="tituloCard">
									<b>AGREGAR CLIENTE</b>
								</div>
								<button onClick={() => setShowClientesCard((prev) => !prev)}>
									Seleccionar cliente
								</button>
							</div>
						)}
						<div className={showClientesCard ? "dropdown" : "dropdown hide"}>
							{editClientesFlag ? (
								<>
									<span
										className=" dropdownBtn backBtn"
										onClick={() => {
											setShowClientesCard(false);
										}}>
										<i className="material-icons">arrow_back</i>
									</span>
									<span
										className="dropdownBtn deleteBtn"
										onClick={() => {
											setCliente("");
											setShowClientesCard(false);
										}}>
										<i className="material-icons">delete</i>
									</span>
								</>
							) : (
								<span
									className="dropdownBtn  cancelBtn"
									onClick={() => {
										setCliente("");
										setShowClientesCard(false);
										setEditClientesFlag(false);
									}}>
									<i className="material-icons">clear</i>
								</span>
							)}
							<input
								type="search"
								name="searchClientes"
								id="searchClientes"
								className="searchbarInDropdown"
								placeholder="Buscar..."
							/>
							<div className="dropdownList">
								{clientes.map((cliente, index) => (
									<li
										key={index}
										value={cliente.name}
										onClick={() => {
											setShowClientesCard(false);
											setCliente(cliente);
										}}>
										<span>{cliente.name}</span>
										<span className="costo">{cliente.tel}</span>
									</li>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className="step horas ">
					<b className={horasSelected ? "num done" : "num"}>3</b>
					<span></span>
					<div className="card">
						<div className="conDatos">
							<div className="tituloCard">
								<b>FECHA Y HORA DE LA CITA:</b>
								<button
									className="editBtn"
									onClick={() => {
										setShowCardHoras(true);
									}}>
									Editar
								</button>
							</div>
							<div className="cardContentHoras">
								<b>{`${format(
									start,
									"EEEE',' dd 'de' MMMM 'de' hh:mm aaaa 'a'",
									{
										locale: es,
									}
								)} ${format(end, "hh:mm aaaa")}`}</b>
								{errorTime !== "" ? (
									<span>
										{" "}
										<i className="material-icons">error</i>
										{errorTime}
									</span>
								) : null}
							</div>
						</div>
						<div className={showCardHoras ? "dropdown" : "dropdown hide"}>
							<span
								className="dropdownBtn  cancelBtn"
								onClick={() => {
									setShowCardHoras(false);
								}}>
								<i className="material-icons">clear</i>
							</span>

							<div className="timepickers">
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
						</div>
					</div>
				</div>
			</div>
			<div className="actions">
				<button onClick={() => setHorasSelected((prev) => !prev)}>
					Click me!
				</button>
			</div>
		</div>
	);
};

export default Cita;
