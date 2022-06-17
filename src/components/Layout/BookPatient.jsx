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

import { ServicesContext } from "../../Store";

import "./BookPatient.scss";

function BookPatient() {
	const { services } = useContext(ServicesContext);

	const [clients, setClients] = useState([]);
	const [client, setClient] = useState("");
	const [diaCita, setDiaCita] = useState(null);
	const [horaCita, setHoraCita] = useState(null);
	const [service, setService] = useState(0);

	const [disabledBtn, setDisabledBtn] = useState(true);

	useEffect(() => {
		if (client === "" || diaCita === null || horaCita === null) {
			setDisabledBtn(true);
		} else {
			setDisabledBtn(false);
		}
	}, [client, diaCita, horaCita]);

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

	return (
		<div className="bookPatientC">
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
										});
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
			<div></div>
			<div className="saveBtn">
				<Button
					disabled={disabledBtn}
					variant="contained"
					color={disabledBtn ? "default" : "primary"}>
					Agendar
				</Button>
			</div>
		</div>
	);
}

export default BookPatient;
