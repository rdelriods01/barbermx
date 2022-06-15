import React, { useState, useContext, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";

import { ServicesContext } from "../../Store";

import {
	Button,
	TextField,
	FormControl,
	Select,
	InputLabel,
	MenuItem,
	OutlinedInput,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import {
	DatePicker,
	TimePicker,
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import { format, getTime, getMinutes, getHours, addMinutes } from "date-fns";

import "./NewPatient.scss";
import axios from "axios";

const NewPatient = (props) => {
	const { services } = useContext(ServicesContext);
	// const [regid, setRegId] = useState(Date.now().toString());
	const [regid, setRegId] = useState(1000);
	const [firstname, setFirstName] = useState("");
	const [secondname, setSecondName] = useState("");
	const [lastname, setLastName] = useState("");
	const [seclastname, setSecLastName] = useState("");
	const [dob, setDOB] = useState(null);
	const [age, setAge] = useState(null);
	const [gender, setGender] = useState("");
	const [tel, setTel] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [numExt, setNumExt] = useState("");
	const [numInt, setNumInt] = useState("");
	const [county, setCounty] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState(null);
	const [diaCita, setDiaCita] = useState(null);
	const [horaCita, setHoraCita] = useState(null);
	const [sala, setSala] = useState(1);

	const [service, setService] = useState(0);

	const estados = [
		"Aguascalientes",
		"Baja California",
		"Baja California Sur",
		"Campeche",
		"Chiapas",
		"Chihuahua",
		"Coahuila de Zaragoza",
		"Colima",
		"Ciudad de México",
		"Durango",
		"Estado de México",
		"Guanajuato",
		"Guerrero",
		"Hidalgo",
		"Jalisco",
		"Michoacan de Ocampo",
		"Morelos",
		"Nayarit",
		"Nuevo León",
		"Oaxaca",
		"Puebla",
		"Queretaro de Arteaga",
		"Quintana Roo",
		"San Luis Potosi",
		"Sinaloa",
		"Sonora",
		"Tabasco",
		"Tamaulipas",
		"Tlaxcala",
		"Veracruz",
		"Yucatan",
		"Zacatecas",
	];

	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get("http://localhost:4000/api/clients/length")
				.then((clients) => {
					if (clients) {
						console.log(clients);
						let res = 1000 + clients.data;
						setRegId(res);
					}
				});
		};
		fetchData();
	}, []);

	const calcAge = (val) => {
		if (val) {
			console.log(val);
			setDOB(val);
			let dob = new Date(val);
			let today = new Date();
			let age = today.getFullYear() - dob.getFullYear();
			if (
				today.getMonth() < dob.getMonth() ||
				(today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
			) {
				age--;
			}
			setAge(age);
		}
	};

	const handleSubmit = async (ev) => {
		ev.preventDefault();
		if (gender === "") {
			alert("ingrese el genero correctamente");
		} else {
			if (diaCita === null || horaCita === null) {
				alert("Debe programar cita correctamente ");
			} else {
				if (age) {
					let name =
						firstname +
						(secondname ? ` ${secondname} ` : " ") +
						lastname +
						(seclastname ? ` ${seclastname}` : "");

					let mins = getMinutes(horaCita);
					let hours = getHours(horaCita);
					let start = new Date(diaCita);
					start.setHours(hours);
					start.setMinutes(mins);
					let end = addMinutes(start, 30);

					let newPatient = {
						regid,
						name,
						firstname,
						secondname,
						lastname,
						seclastname,
						dob: format(dob, "dd-MMM-yyyy"),
						age,
						gender,
						tel,
						email,
						demographics: {
							address,
							numExt,
							numInt,
							county,
							postalCode,
							city,
							state,
						},
						medicalHistory: {
							reason: "",
							conditions: "",
							illness: "",
							allergies: "",
							notIncluded: "",
							waterConsuption: "",
							exercise: "",
							comments: "",
						},
					};
					console.log(newPatient);
					await axios
						.post("http://localhost:4000/api/clients", newPatient)
						.then(async (response) => {
							console.log(response);
							let newEvent = {
								title: name,
								start,
								startTS: getTime(start),
								end,
								client: { ...response.data.client, avatar: "" },
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
							console.log(newEvent);
							await axios.post("http://localhost:4000/api/events", newEvent);
						})
						.catch((error) => {
							console.log(error);
						});

					props.onClose();
				} else {
					alert("Ingresa correctamente la fecha de nacimiento");
				}
			}
		}
	};

	return (
		<div className="newPatientC">
			<form onSubmit={handleSubmit} className="newPatientForm">
				<div className="superiorData">
					<div className="id">
						<b>Número de registro</b>
						<p>{regid}</p>
					</div>
					<div className="nombre">
						<b>Nombre*</b>
						<input
							type="text"
							value={firstname}
							autoFocus
							required
							placeholder="Nombre..."
							onChange={(ev) => setFirstName(ev.target.value.toLowerCase())}
						/>
					</div>
					<div className="secondName">
						<b>Segundo Nombre</b>
						<input
							type="text"
							value={secondname}
							placeholder="Segundo nombre..."
							onChange={(ev) => setSecondName(ev.target.value.toLowerCase())}
						/>
					</div>
					<div className="apellidoP">
						<b>Apellido Paterno*</b>
						<input
							type="text"
							value={lastname}
							required
							placeholder="Apellido paterno..."
							onChange={(ev) => setLastName(ev.target.value.toLowerCase())}
						/>
					</div>
					<div className="apellidoM">
						<b>Apellido Materno</b>
						<input
							type="text"
							value={seclastname}
							placeholder="Apellido materno..."
							onChange={(ev) => setSecLastName(ev.target.value.toLowerCase())}
						/>
					</div>
					<div className="dob">
						<b>Fecha de nacimiento*</b>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								inputVariant="outlined"
								placeholder="dd/mm/yyyy"
								className="dobInput"
								format="dd/MM/yyyy"
								size="small"
								required
								value={dob}
								onChange={calcAge}
							/>
						</MuiPickersUtilsProvider>
					</div>
					<div className="age">
						{age ? (
							<>
								<b>Edad:</b> <span>{age} años</span>
							</>
						) : null}
					</div>
					<div className="selectGender">
						<b>Genero*</b>
						<FormControl className="selectForm" size="small" variant="outlined">
							<Select
								value={gender}
								onChange={(e) => setGender(e.target.value)}
								input={
									<OutlinedInput labelWidth={50} name="gender" id="gender" />
								}>
								<MenuItem value="M">Masculino</MenuItem>
								<MenuItem value="F">Femenino</MenuItem>
							</Select>
						</FormControl>
					</div>
				</div>
				<div className="inferiorData">
					<div className="infLeft">
						<div className="tel">
							<b>Teléfono*</b>
							<input
								type="tel"
								value={tel}
								required
								maxLength={10}
								placeholder="Teléfono..."
								onChange={(ev) =>
									setTel(ev.target.value.replace(/[^\d]/, "").trim())
								}
							/>
						</div>
						<div className="email">
							<b>email*</b>
							<input
								type="text"
								value={email}
								required
								placeholder="e-mail..."
								onChange={(ev) => setEmail(ev.target.value.trim())}
							/>
						</div>
					</div>
					<div className="infRight">
						<div className="direccion">
							<b>Dirección</b>
							<input
								type="text"
								value={address}
								placeholder="Dirección..."
								onChange={(ev) => setAddress(ev.target.value)}
							/>
						</div>
						<div className="numExt">
							<b>No. Ext.</b>
							<input
								type="text"
								value={numExt}
								placeholder="No. Ext..."
								onChange={(ev) =>
									setNumExt(ev.target.value.replace(/[^\d]/, "").trim())
								}
							/>
						</div>
						<div className="numInt">
							<b>No. Int.</b>
							<input
								type="text"
								value={numInt}
								placeholder="No. Int..."
								onChange={(ev) => setNumInt(ev.target.value.trim())}
							/>
						</div>
						<div className="colonia">
							<b>Colonia</b>
							<input
								type="text"
								value={county}
								placeholder="Colonia..."
								onChange={(ev) => setCounty(ev.target.value)}
							/>
						</div>
						<div className="postalCode">
							<b>C.P.</b>
							<input
								type="tel"
								value={postalCode}
								maxLength="5"
								placeholder="C.P..."
								onChange={(ev) =>
									setPostalCode(ev.target.value.replace(/[^\d]/, "").trim())
								}
							/>
						</div>
						<div className="ciudad">
							<b>Ciudad</b>
							<input
								type="text"
								value={city}
								placeholder="Ciudad..."
								onChange={(ev) => setCity(ev.target.value)}
							/>
						</div>
						<div className="estado">
							<b>Estado</b>

							<Autocomplete
								id="combo-box-states"
								className="estadoInput"
								options={estados}
								value={state}
								onChange={(ev, val) => setState(val)}
								getOptionLabel={(option) => option}
								renderInput={(params) => (
									<TextField {...params} size="small" variant="outlined" />
								)}
							/>
						</div>
					</div>
				</div>
				<div className="agendarPaciente">
					<h4 className="progCita"> Programar cita:</h4>
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
					{/* <FormControl className="selectSala" size="small" variant="outlined">
						<InputLabel htmlFor="sala">Sala</InputLabel>
						<Select
							value={sala}
							onChange={(e) => setSala(e.target.value)}
							input={<OutlinedInput labelWidth={30} id="sala" />}>
							<MenuItem value={1}>Karen Guerra</MenuItem>
							<MenuItem value={2}>Rayos X</MenuItem>
							<MenuItem value={3}>Ultrasonido</MenuItem>
							<MenuItem value={4}>Mastografía</MenuItem>
						</Select>
					</FormControl> */}
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

				<Button
					className="addBtn"
					type="submit"
					variant="contained"
					color="primary">
					Agregar
				</Button>
			</form>
		</div>
	);
};

export default NewPatient;
