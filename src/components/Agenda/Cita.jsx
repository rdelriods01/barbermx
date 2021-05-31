import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { format, getMinutes, getHours, isAfter, isEqual } from "date-fns";
import { es } from "date-fns/locale";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { ServicesContext } from "../../Store";

import "./Cita.scss";
import defaultPP from "../../assets/pp_default.svg";

const Cita = (props) => {
	console.log(props);
	const services = useContext(ServicesContext);
	// const clients = [
	// 	{ uid: "1", name: "Ricardo Del Rio", tel: "8711126205" },
	// 	{ uid: "2", name: "Alberto Saavedra", tel: "8712222222" },
	// 	{ uid: "3", name: "Osvaldo Aleman", tel: "8713333333" },
	// 	{ uid: "4", name: "Gerardo Alba", tel: "8714444444" },
	// 	{ uid: "5", name: "Hector Ramirez", tel: "8715555555" },
	// ];
	const barbers = ["", "Barber 1", "Barber 2", "Barber 3", "Barber 4"];
	const [checkedState, setCheckedState] = useState(
		new Array(services.length).fill(false)
	);

	const [clients, setClients] = useState([]);
	const [servicesSelected, setServicesSelected] = useState(
		props.event.service ? props.event.service : []
	);
	const [barber, setBarber] = useState(
		props.event.resourceId ? props.event.resourceId : 1
	);
	const [client, setClient] = useState(
		props.event.client ? props.event.client : ""
	);
	const [start, setStart] = useState(
		props.event.start ? props.event.start : ""
	);
	const [end, setEnd] = useState(props.event.end ? props.event.end : "");
	const [errorTime, setErrorTime] = useState("");
	// flags
	const [editServicesFlag, setEditServicesFlag] = useState(false);
	const [showServicesCard, setShowServicesCard] = useState(false);
	const [serviceSelected, setServiceSelected] = useState(false);

	const [editClientsFlag, setEditClientsFlag] = useState(false);
	const [showClientsCard, setShowClientsCard] = useState(false);
	const [clientSelected, setClientSelected] = useState(false);

	const [showCardHoras, setShowCardHoras] = useState(false);
	const [horasSelected, setHorasSelected] = useState(false);

	const [showBarberSelect, setShowBarberSelect] = useState(false);
	const [saveBtnDisabled, setSaveBtnDisabled] = useState(true);

	//COMPONENT USEEFFECTS

	useEffect(() => {
		// revisar checked en edit
		if (props.editFlag) {
			findCheckedOnEdit();
		}
	}, []);

	useEffect(() => {
		setEditServicesFlag(false);
		if (servicesSelected.length > 0) {
			setServiceSelected(true);
		} else {
			setServiceSelected(false);
			setCheckedState(new Array(services.length).fill(false));
		}
	}, [servicesSelected]);

	useEffect(() => {
		setEditClientsFlag(false);
		if (client !== "") {
			setClientSelected(true);
		} else {
			setClientSelected(false);
		}
	}, [client]);

	useEffect(() => {
		if (start !== "" || end !== "") {
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

	useEffect(() => {
		if (serviceSelected && barber !== null && clientSelected && horasSelected) {
			setSaveBtnDisabled(false);
		} else {
			setSaveBtnDisabled(true);
		}
	}, [serviceSelected, barber, clientSelected, horasSelected]);

	// COMPONENT FUNCTIONS

	const searchClients = (value) => {
		console.log(value);
		if (value.length > 2) {
			axios
				.get("http://localhost:4000/api/clients/filtered", {
					params: { pre: value },
				})
				.then((data) => {
					let myClients = [];
					data.data.forEach((client) => {
						myClients.push(client);
					});
					console.log(myClients);
					setClients(myClients);
				});
		} else {
			setClients([]);
		}
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

	const findCheckedOnEdit = () => {
		let myEstado = [...checkedState];
		for (let i = 0; i < props.event.service.length; i++) {
			for (let j = 0; j < services.length; j++) {
				if (props.event.service[i].description === services[j].description) {
					myEstado[j] = true;
				}
			}
		}
		setCheckedState(myEstado);
	};

	const handleService = (serv, position) => {
		console.log(serv);

		const updatedCheckedState = checkedState.map((item, index) =>
			index === position ? !item : item
		);

		setCheckedState(updatedCheckedState);
	};
	const saveServices = () => {
		const myServices = checkedState.reduce((sum, currentState, index) => {
			console.log(sum);
			console.log(services[index]);
			if (currentState === true) {
				return (sum = [
					...sum,
					{
						description: services[index].description,
						price: services[index].price,
					},
				]);
			}
			return sum;
		}, []);
		console.log(myServices);
		setServicesSelected(myServices);

		if (servicesSelected.length > 0) {
			setServiceSelected(true);
		} else {
			setServiceSelected(false);
		}
		setShowServicesCard(false);
	};

	return (
		<div className="citaC">
			<div className="citaHeader">
				<b>{props.title}</b>
				{props.editFlag ? (
					<span
						onClick={() => {
							props.onClose({
								remove: true,
							});
						}}>
						<i className="material-icons">delete</i>
					</span>
				) : null}
			</div>
			<div className="steps">
				<div className="step ">
					<b className={serviceSelected ? "num done" : "num"}>1</b>
					<span className="line"></span>
					<div className="card">
						{serviceSelected ? (
							<div className="conDatos">
								<div className="tituloCard">
									<b>SERVICIOS AGENDADOS:</b>
									<button
										className="editBtn"
										onClick={() => {
											setShowServicesCard(true);
											setEditServicesFlag(true);
										}}>
										Editar
									</button>
								</div>
								<div className="cardContentServicios">
									<div>
										{servicesSelected.map((service) => (
											<li>{service.description}</li>
										))}
									</div>
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
								<button onClick={() => setShowServicesCard((prev) => !prev)}>
									Seleccionar service
								</button>
							</div>
						)}
						<div className={showServicesCard ? "dropdown" : "dropdown hide"}>
							{editServicesFlag ? (
								<>
									<span
										className=" dropdownBtn backBtn"
										onClick={() => {
											setShowServicesCard(false);
										}}>
										<i className="material-icons">arrow_back</i>
									</span>
									<span
										className="dropdownBtn deleteBtn"
										onClick={() => {
											setServicesSelected([]);
											setShowServicesCard(false);
										}}>
										<i className="material-icons">delete</i>
									</span>
								</>
							) : (
								<span
									className="dropdownBtn  cancelBtn"
									onClick={() => {
										setServicesSelected([]);
										setShowServicesCard(false);
										setEditServicesFlag(false);
									}}>
									<i className="material-icons">clear</i>
								</span>
							)}
							<div className="dropdownList">
								{services.map((service, index) => (
									<li
										key={index}
										value={service.desc}
										onClick={() => {
											handleService(service, index);
										}}>
										<input
											type="checkbox"
											name={service.description}
											id={index}
											checked={checkedState[index]}
										/>
										<span>{service.description}</span>
										<span className="costo">${service.price}</span>
									</li>
								))}
							</div>
							<div className="saveServiceBtn">
								<button onClick={() => saveServices()}>Guardar</button>
							</div>
						</div>
					</div>
				</div>
				<div className="step client ">
					<b className={clientSelected ? "num done" : "num"}>2</b>
					<span className="line"></span>
					<div className="card">
						{clientSelected ? (
							<div className="conDatos">
								<div className="tituloCard">
									<b>INFORMACIÓN DEL CLIENTE:</b>
									<button
										className="editBtn"
										onClick={() => {
											setShowClientsCard(true);
											setEditClientsFlag(true);
										}}>
										Editar
									</button>
								</div>
								<div className="cardContentClient">
									<img
										src={client.avatar === "" ? defaultPP : client.avatar}
										alt="avatar"
									/>
									<div className="clientRight">
										<h3>{client.name}</h3>
										<div className="clientInf">
											<b>Tel:</b>
											<span>{client.tel} </span>
											<b>Email:</b>
											<span>{client.email} </span>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div className="sinDatos">
								<div className="tituloCard">
									<b>AGREGAR CLIENTE</b>
								</div>
								<button onClick={() => setShowClientsCard((prev) => !prev)}>
									Seleccionar client
								</button>
							</div>
						)}
						<div className={showClientsCard ? "dropdown" : "dropdown hide"}>
							{editClientsFlag ? (
								<>
									<span
										className=" dropdownBtn backBtn"
										onClick={() => {
											setShowClientsCard(false);
										}}>
										<i className="material-icons">arrow_back</i>
									</span>
									<span
										className="dropdownBtn deleteBtn"
										onClick={() => {
											setClient("");
											setShowClientsCard(false);
										}}>
										<i className="material-icons">delete</i>
									</span>
								</>
							) : (
								<span
									className="dropdownBtn  cancelBtn"
									onClick={() => {
										setClient("");
										setShowClientsCard(false);
										setEditClientsFlag(false);
									}}>
									<i className="material-icons">clear</i>
								</span>
							)}
							<input
								type="search"
								name="searchClients"
								id="searchClients"
								className="searchbarInDropdown"
								placeholder="Buscar..."
								onKeyUp={(ev) => searchClients(ev.target.value)}
							/>
							<div className="dropdownList">
								{clients &&
									clients.map((client, index) => (
										<li
											key={index}
											value={client.name}
											onClick={() => {
												setShowClientsCard(false);
												setClient(client);
											}}>
											<span>{client.name}</span>
											<span className="costo">{client.tel}</span>
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
				<button
					className="cancelBtn"
					onClick={() => {
						props.onClose({
							ready: false,
						});
					}}>
					Cancelar
				</button>
				<button
					disabled={saveBtnDisabled}
					className={
						saveBtnDisabled ? "saveBtn saveBtnDisabled" : "saveBtn saveBtnHover"
					}
					onClick={() => {
						props.onClose({
							start,
							end,
							client,
							barber,
							service: servicesSelected,
							ready: true,
						});
					}}>
					Agendar
				</button>
			</div>
		</div>
	);
};

export default Cita;
