import React, { useState, useContext, useEffect } from "react";

import axios from "axios";
import DateFnsUtils from "@date-io/date-fns";
import {
	Button,
	FormControl,
	Select,
	MenuItem,
	OutlinedInput,
} from "@material-ui/core";

import {
	DatePicker,
	TimePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { getTime, getMinutes, getHours, addMinutes } from "date-fns";

import { ServicesContext } from "../../Store";

import "./BookPatient.scss";

function BookPatient(props) {
	const { services } = useContext(ServicesContext);

	const [clients, setClients] = useState([]);
	const [client, setClient] = useState("");
	const [diaCita, setDiaCita] = useState(null);
	const [horaCita, setHoraCita] = useState(null);
	const [service, setService] = useState(0);
	const [sala, setSala] = useState(1);
	const [prevEventId, setPrevEventId] = useState("");

	const [disabledBtn, setDisabledBtn] = useState(true);

	useEffect(() => {
		if (client === "" || diaCita === null || horaCita === null) {
			setDisabledBtn(true);
		} else {
			setDisabledBtn(false);
		}
	}, [client, diaCita, horaCita]);

	const checkForUncompletedEvents = async (myClient) => {
		console.log(myClient);
		for (let i = 0; i < myClient.appointments.length; i++) {
			console.log(myClient.appointments[i]);
			let status = await axios.get(
				`http://localhost:4000/api/events/status/${myClient.appointments[i]}`
			);
			console.log(status);
			if (status.data === "") {
				setPrevEventId(myClient.appointments[i]);
			}
		}
	};

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
					setClients(myClients);
				});
		} else {
			setClients([]);
		}
	};

	const bookMyPatient = async () => {
		// Configuración y ajuste de tiempos
		let mins = getMinutes(horaCita);
		let hours = getHours(horaCita);
		let start = new Date(diaCita);
		start.setHours(hours);
		start.setMinutes(mins);
		let end = addMinutes(start, 30);
		// Si no hay uno incompleto entonces:
		if (prevEventId === "") {
			// Crear objeto Event
			let newEvent = {
				title: client.name,
				start,
				startTS: getTime(start),
				end,
				client,
				resourceId: sala,
				cart: {
					servicesInCart: [
						{
							description: services[service].description,
							price: services[service].price,
						},
					],
					productsInCart: [],
					total: services[service].price,
				},
			};
			await axios
				.post("http://localhost:4000/api/events", newEvent)
				.then(async (response) => {
					await axios.put(
						`http://localhost:4000/api/clients/pushAppointments/${client._id}`, //se manda a llamar al push en el back para que en el array de Appointments del Paciente se agregue el nuevo evento
						{
							appointments: [response.data.event._id],
						}
					);
				});
		} else {
			// Si si hay uno incompleto entonces solo actualiza el incompleto con la nueva fecha
			await axios.put(`http://localhost:4000/api/events/${prevEventId}`, {
				start,
				end,
				startTS: getTime(start),
			});
		}

		props.onClose();
	};

	return (
		<div className="bookPatientC">
			{/* <h3 className="title">Agendar paciente</h3> */}
			{client === "" ? (
				<div className="searchContainer">
					<input
						type="search"
						name="searchClients"
						autoFocus
						id="searchClients"
						className="searchbarInDropdown"
						autoComplete="off"
						placeholder="Buscar paciente..."
						onChange={(ev) => searchClients(ev.target.value)}
					/>
					<div className={clients.length > 0 ? "dropdownList" : "hide"}>
						{clients &&
							clients.map((client, index) => (
								<li
									key={index}
									value={client.name}
									onClick={() => {
										setClient({
											name: client.name,
											avatar: client.avatar,
											tel: client.tel,
											email: client.email,
											_id: client._id,
											gender: client.gender,
											goal: client.goal,
											initialWeight: client.initialWeight,
											height: client.height,
											consecutive: client.appointments.length + 1,
											lastAppointment:
												client.appointments[client.appointments.length - 1],
										});
										checkForUncompletedEvents(client);
									}}>
									<span>{client.name}</span>
									<span className="costo">{client.tel}</span>
								</li>
							))}
					</div>
				</div>
			) : (
				<div className="patientSelected">
					<h2>{client.name}</h2>
					<button
						onClick={() => {
							setClient("");
							setClients([]);
							setDiaCita(null);
							setHoraCita(null);
						}}>
						<i className="material-icons">clear</i>
					</button>
				</div>
			)}

			<div className="agendarPaciente">
				<div className="picker">
					<b>Dia *</b>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<DatePicker
							autoOk
							className="pickerInput"
							inputVariant="outlined"
							required
							size="small"
							value={diaCita}
							onChange={setDiaCita}
						/>
					</MuiPickersUtilsProvider>
				</div>
				<div className="picker">
					<b>Hora *</b>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<TimePicker
							inputVariant="outlined"
							className="pickerInput"
							value={horaCita}
							size="small"
							required
							onChange={setHoraCita}
							minutesStep="5"
						/>
					</MuiPickersUtilsProvider>
				</div>
				<div className="selectService">
					<b>Servicio*</b>
					<FormControl className="selectForm" size="small" variant="outlined">
						<Select
							value={service}
							onChange={(e) => setService(e.target.value)}
							input={
								<OutlinedInput labelWidth={30} name="service" id="service" />
							}>
							{services.map((service, index) => (
								<MenuItem key={index} value={index}>
									{service.description}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
			</div>
			<div className="saveBtn">
				<Button
					disabled={disabledBtn}
					variant="contained"
					onClick={() => bookMyPatient()}
					color={disabledBtn ? "default" : "primary"}>
					Agendar
				</Button>
			</div>
		</div>
	);
}

export default BookPatient;
