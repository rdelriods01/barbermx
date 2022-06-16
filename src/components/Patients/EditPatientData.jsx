import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";

import {
	Button,
	TextField,
	FormControl,
	Select,
	MenuItem,
	OutlinedInput,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import { format } from "date-fns";

import "./EditPatientData.scss";
import axios from "axios";
function EditPatientData(props) {
	const patient = props.patient;

	const [firstname, setFirstName] = useState(patient.firstname);
	const [secondname, setSecondName] = useState(patient.secondname);
	const [lastname, setLastName] = useState(patient.lastname);
	const [seclastname, setSecLastName] = useState(patient.seclastname);
	const [dob, setDOB] = useState(patient.dob ? new Date(patient.dob) : null);
	const [age, setAge] = useState(patient.age);
	const [gender, setGender] = useState(patient.gender);
	const [height, setHeight] = useState(patient.height);
	const [goal, setGoal] = useState(patient.goal);
	const [tel, setTel] = useState(patient.tel);
	const [email, setEmail] = useState(patient.email);
	const [address, setAddress] = useState(patient.demographics?.address);
	const [numExt, setNumExt] = useState(patient.demographics?.numExt);
	const [numInt, setNumInt] = useState(patient.demographics?.numInt);
	const [county, setCounty] = useState(patient.demographics?.county);
	const [postalCode, setPostalCode] = useState(
		patient.demographics?.postalCode
	);
	const [city, setCity] = useState(patient.demographics?.city);
	const [state, setState] = useState(patient.demographics?.state);

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

	console.log(props);

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
		console.log(dob);
		console.log(format(dob, "dd-MMM-yyyy"));

		ev.preventDefault();
		if (gender === "") {
			alert("ingrese el genero correctamente");
		} else {
			if (age) {
				let name =
					firstname +
					(secondname ? ` ${secondname} ` : " ") +
					lastname +
					(seclastname ? ` ${seclastname}` : "");

				let newPatientData = {
					name,
					firstname,
					secondname,
					lastname,
					seclastname,
					dob: format(dob, "dd-MMM-yyyy"),
					age,
					gender,
					height,
					goal,
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
					appointments: patient.appointments,
				};
				console.log(newPatientData);
				await axios
					.put(`http://localhost:4000/api/clients/${props.patient._id}`, {
						old: patient,
						new: newPatientData,
					})
					.then(async (response) => {
						console.log(response);
					})
					.catch((error) => {
						console.log(error);
					});

				props.onClose();
			} else {
				alert("Ingresa correctamente la fecha de nacimiento");
			}
		}
	};

	return (
		<div className="editPatientDataC">
			<h3>Editar datos del paciente</h3>
			<form onSubmit={handleSubmit} className="newPatientForm">
				<div className="superiorData">
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
				<div className="middleData">
					<div className="middleLeft">
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
					<div className="middleRight">
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
								maxLength="10"
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
								onChange={(ev) => setNumInt(ev.target.value)}
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
				<div className="inferiorData">
					<div></div>
					<div className="height">
						<b>Estatura</b>
						<input
							type="text"
							value={height}
							onChange={(ev) => setHeight(ev.target.value)}
						/>
						mts.
					</div>
					<div className="goal">
						<b>Peso deseado</b>
						<input
							type="text"
							value={goal}
							onChange={(ev) => setGoal(ev.target.value)}
						/>
						Kgs.
					</div>
					<div></div>
				</div>
				<Button
					className="submitBtn"
					type="submit"
					variant="contained"
					color="primary">
					Editar
				</Button>
			</form>
		</div>
	);
}

export default EditPatientData;
