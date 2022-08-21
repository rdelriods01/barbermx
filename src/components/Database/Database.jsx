import React, { useState, useEffect } from "react";
import "./Database.scss";
import axios from "axios";
import { format } from "date-fns";
import { es } from "date-fns/locale";

function Database() {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		getEvents();
	}, []);

	const getEvents = () => {
		axios.get("http://192.168.100.17:4000/api/events").then((data) => {
			console.log(data.data);
			setEvents(data.data);
		});
	};
	const deleteEvent = async (event) => {
		console.log(event);
		await axios
			.delete(`http://192.168.100.17:4000/api/events/${event._id}`)
			.then(async () => {
				await axios
					.put(
						`http://192.168.100.17:4000/api/clients/pullAppointments/${event.client._id}`,

						{ data: event._id }
					)
					.then((data) => {
						console.log(data.data.myUpdatedClient);
					});
			});
		getEvents();
	};

	return (
		<div className="DatabaseC">
			<h3>Database Component</h3>
			<div className="tableContainer">
				<div className="table">
					<div className="headers">
						<div className="th">No</div>
						<div className="th">Actions</div>
						<div className="th">Cliente</div>
						<div className="th">Id</div>
						<div className="th">Title</div>
						<div className="th">Start</div>
						<div className="th">End</div>
						<div className="th">resourceId</div>
						<div className="th">Cart</div>
						<div className="th">Created at</div>
						<div className="th">Updated at</div>
						<div className="th">Articulos</div>
						<div className="th">Autorización</div>
						<div className="th">Cambio</div>
						<div className="th">Digitos</div>
						<div className="th">Forma de Pago</div>
						<div className="th">Iva</div>
						<div className="th">Paga con</div>
						<div className="th">Pagado</div>
						<div className="th">SubTotal</div>
						<div className="th">Ticket</div>
						<div className="th">Tipo De Tarjeta</div>
					</div>
					<div className="dataTable">
						{events.map((event, index) => (
							<div key={index} className="row">
								<div className="cell">{index + 1}</div>
								<div className="cell">
									<div className="btns">
										<button onClick={() => deleteEvent(event)}>
											<i className="material-icons">delete</i>
										</button>
									</div>
								</div>
								<div className="cell cliente">
									<div className="clientCell">{event.client?.name}</div>
									<div className="clientCell">{event.client?._id}</div>
									<div className="clientCell">{event.client?.tel}</div>
									<div className="clientCell">{event.client?.email}</div>
								</div>
								<div className="cell">{event._id}</div>
								<div className="cell">{event.title}</div>
								<div className="cell">
									{format(new Date(event.start), "dd-MMM-yy HH:mm", {
										locale: es,
									})}
								</div>
								<div className="cell">
									{format(new Date(event.end), "dd-MMM-yy HH:mm", {
										locale: es,
									})}
								</div>
								<div className="cell">{event.resourceId}</div>
								<div className="cell cart">
									{event.cart?.productsInCart.length > 0 ? (
										<div className="cartItems">
											<p>Products:</p>
											{event.cart.productsInCart.map((prod, index) => (
												<div key={index} className="prodRow">
													<span className="cartCell">{prod.cant}</span>
													<span className="cartCell">{prod.name}</span>
													<span className="cartCell">{prod.price} </span>
													<span className="cartCell">{prod.total} </span>
												</div>
											))}
										</div>
									) : null}
									<div className="cartItems">
										<p>Services:</p>
										{event.cart?.servicesInCart.map((serv, index) => (
											<div key={index} className="servRow">
												<span className="cartCell">{serv.description}</span>
												<span className="cartCell">{serv.price} </span>
											</div>
										))}
									</div>
									<div className="cartRow total">
										<b>Total:</b>
										<span>{event.cart?.total}</span>
									</div>
								</div>
								<div className="cell">
									{format(new Date(event.createdAt), "dd-MMM-yy HH:mm", {
										locale: es,
									})}
								</div>
								<div className="cell">
									{format(new Date(event.updatedAt), "dd-MMM-yy HH:mm", {
										locale: es,
									})}
								</div>
								<div className="cell">{event.articulos}</div>
								<div className="cell">{event.autorizacion}</div>
								<div className="cell">{event.cambio}</div>
								<div className="cell">{event.digitos}</div>
								<div className="cell">{event.formaDePago}</div>
								<div className="cell">{event.iva}</div>
								<div className="cell">{event.pagacon}</div>
								<div className="cell">{event.pagado}</div>
								<div className="cell">{event.subTotal}</div>
								<div className="cell">{event.ticket}</div>
								<div className="cell">{event.tipoDeTarjeta}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Database;
