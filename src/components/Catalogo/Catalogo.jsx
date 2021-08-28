import React, { useContext, useState } from "react";
import { ServicesContext } from "../../Store";
import axios from "axios";

import "./Catalogo.scss";

function Catalogo() {
	const { services, setServices } = useContext(ServicesContext);
	const [newServiceDescription, setNewServiceDescription] = useState("");
	const [newServicePrice, setNewServicePrice] = useState("");

	const addService = async () => {
		console.log(
			`se agregó ${newServiceDescription} con el precio ${newServicePrice} a la BD`
		);
		await axios.post("http://localhost:4000/api/services", {
			description: newServiceDescription,
			price: newServicePrice,
		});
		getServices();
	};

	const deleteService = async (serv) => {
		await axios.delete(`http://localhost:4000/api/services/${serv._id}`);
		getServices();
	};

	const getServices = () => {
		axios.get("http://localhost:4000/api/services").then((data) => {
			let myServices = [];
			data.data.forEach((service) => {
				myServices.push(service);
			});
			setServices(myServices);
		});
	};
	return (
		<div className="CatalogoC">
			<div className="superior">
				<h2>
					<i className="material-icons">apps</i> Catálogo
				</h2>
			</div>
			<div className="grid">
				<h3>Servicios</h3>
				<h3>Productos</h3>
				<div className="services">
					<div className="servSuperior">
						<b>Descripción</b>
						<input
							type="text"
							placeholder="Agregar descripción del servicio..."
							onChange={(ev) =>
								setNewServiceDescription(ev.target.value.toLowerCase())
							}
						/>
						<b>Precio</b>

						<input
							type="text"
							placeholder="Fijar precio..."
							onChange={(event) => {
								setNewServicePrice(event.target.value);
							}}
						/>

						<div className="btns">
							<i onClick={() => addService()} className="material-icons">
								add
							</i>
						</div>
					</div>
					<div className="servInferior">
						{services &&
							services.length > 0 &&
							services.map((service, index) => (
								<div className="row" key={index}>
									<span className="descripcion">{service.description}</span>{" "}
									<span>${service.price}</span>
									<div>
										<i
											className="material-icons"
											onClick={() => deleteService(service)}>
											delete
										</i>
									</div>
								</div>
							))}
					</div>
				</div>
				<div className="products"></div>
			</div>
		</div>
	);
}

export default Catalogo;
