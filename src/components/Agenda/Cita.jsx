import { useState, useEffect, useContext } from "react";

import {
	Button,
	FormControl,
	Input,
	InputLabel,
	IconButton,
	Select,
	MenuItem,
	OutlinedInput,
} from "@material-ui/core";

const Cita = (props) => {
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
	const [servicio, setServicio] = useState(
		props.event.servicio ? props.event.servicio : ""
	);
	// flags
	const [showCardServicios, setShowCardServicios] = useState(false);
	const [servicioSelected, setServicioSelected] = useState(false);

	useEffect(() => {
		if (servicio !== "") {
			setServicioSelected(true);
		} else {
			setServicioSelected(false);
		}
	}, [servicio]);

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
										onClick={() => setShowCardServicios(true)}>
										Editar
									</button>
								</div>
								<div className="cardContent">
									<b>{servicio.desc}</b>
									<span> Barber 1</span>
								</div>
							</div>
						) : (
							<div className="sinDatos">
								<div className="tituloCard">
									<b>AGREGAR SERVICIO</b>
								</div>
								<button onClick={() => setShowCardServicios((prev) => !prev)}>
									Seleccionar servicios
								</button>
							</div>
						)}
						<div className={showCardServicios ? "dropdown" : "dropdown hide"}>
							{servicio === "" ? (
								<span
									className="dropdownBtn  cancelBtn"
									onClick={() => {
										setServicio("");
										setShowCardServicios(false);
									}}>
									<i className="material-icons">clear</i>
								</span>
							) : (
								<>
									<span
										className=" dropdownBtn backBtn"
										onClick={() => {
											setShowCardServicios(false);
										}}>
										<i className="material-icons">arrow_back</i>
									</span>
									<span
										className="dropdownBtn deleteBtn"
										onClick={() => {
											setServicio("");
											setShowCardServicios(false);
										}}>
										<i className="material-icons">delete</i>
									</span>
								</>
							)}
							<input
								type="search"
								name="searchServicio"
								id="searchServicio"
								placeholder="Buscar..."
							/>
							<div className="serviciosList">
								{servicios.map((servicio, index) => (
									<li
										key={index}
										value={servicio.desc}
										onClick={() => {
											setShowCardServicios(false);
											setServicio(servicio);
										}}>
										<span>{servicio.desc}</span>
										<span className="costo">{servicio.costo}</span>
									</li>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className="step cliente ">
					<b className="num">2</b>
					<span className="line"></span>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates
						eius facilis optio ipsam reiciendis illo blanditiis ullam eveniet
						unde consequatur veniam, aut facere ducimus ut provident autem amet
						nisi sed! Et harum quaerat sequi fugiat minima culpa, fuga alias?
						Quae iste pariatur minima consequuntur doloribus suscipit sunt
						maiores natus vitae!
					</p>
				</div>
				<div className="step horas ">
					<b className="num done">3</b>
					<span></span>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ad illum
						laborum molestias provident saepe iure quas quo quam labore!
					</p>
				</div>
			</div>
			<div className="actions">
				<button>Click me!</button>
			</div>
		</div>
	);
};

export default Cita;
