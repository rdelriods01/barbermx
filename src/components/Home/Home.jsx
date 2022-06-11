import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { endOfDay, startOfDay, parseISO, format } from "date-fns";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Drawer,
} from "@material-ui/core";

import nothingYet from "../../assets/nothingyet.png";
import defaultPP from "../../assets/pp_default.svg";
import LZlogo from "../../assets/LZlogo.png";

import "./Home.scss";
import Weather from "./Weather";
import MiniCalendar from "./MiniCalendar";
import Clock from "./Clock";
import POS from "./POS/POS";
import Cart from "./Cart/Cart";
import Ticket from "./Ticket/Ticket";
import CurrentAppointment from "./CurrentAppointment/CurrentAppointment";

function Home() {
	const workers = ["Karen Guerra"];
	const colores = ["#00bcd4"];

	const [events, setEvents] = useState([]);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [expanded, setExpanded] = useState(false);

	const [openPOS, setOpenPOS] = useState(false);
	const [openCart, setOpenCart] = useState(false);
	const [openTicket, setOpenTicket] = useState(false);
	const [openCurrentAppointment, setOpenCurrentAppointment] = useState(false);
	const [actualTransaction, setActualTransaction] = useState(null);

	useEffect(() => {
		getEvents(currentDate);
	}, []);

	const getEvents = (date) => {
		setCurrentDate(date);
		let start, end;
		start = startOfDay(date);
		end = endOfDay(date);
		console.log("look for events from " + date);
		// Search for events
		axios
			.get("http://localhost:4000/api/events/range", {
				params: { startDate: start, endDate: end },
			})
			.then((data) => {
				let myEvents = [];
				data.data.data.forEach((event) => {
					let ev = {
						...event,
						start: parseISO(event.start),
						end: parseISO(event.end),
					};
					myEvents.push(ev);
				});
				console.log(myEvents);
				setEvents(myEvents);
			});
	};

	const handleExpandedPanel = (panel) => (evnt, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const cartDone = async (cart) => {
		if (cart) {
			console.log(cart);
			setOpenCart(false);
			setActualTransaction({ ...actualTransaction, cart });
			setOpenPOS(true);
		} else {
			console.log(cart);
			setOpenCart(false);
		}
	};
	const transactionDone = async (cancel, back, transaction) => {
		console.log(cancel, back, transaction);
		if (cancel) {
			setOpenPOS(false);
		} else if (back) {
			setOpenPOS(false);
			setOpenCart(true);
		} else {
			// code to transaction
			console.log(transaction);
			await axios.put(`http://localhost:4000/api/events/${transaction._id}`, {
				...transaction,
			});
			getEvents(currentDate);
			setOpenPOS(false);
		}
		// getEvents(currentDate)
	};

	const ticketDone = () => {
		console.log("Ticket Done");
	};

	const currentAppointmentDone = () => {
		console.log("Current Appointment Done");
	};

	return (
		<div className="HomeC">
			<div className="superior">
				<div className="brand">
					<img src={LZlogo} alt="LZlogo" />
					<span>LightZone</span>
				</div>
				<Weather />
				<Clock />
			</div>
			<div className="grid">
				<div className="left">
					{events.length > 0 ? (
						<div className="withEvents">
							{events.map((evnt, i) => (
								<Accordion
									expanded={expanded === i}
									onChange={handleExpandedPanel(i)}
									key={i}
									className="acordion">
									<AccordionSummary
										aria-controls="panel1bh-content"
										id="panel1bh-header"
										style={{
											borderLeftColor: colores[evnt.resourceId - 1],
										}}
										className={
											expanded === i
												? "acordionHeader"
												: "acordionHeader borderRadiusHeader"
										}>
										<div className="acordionHeaderContent">
											<div className="tiempoCita">
												<b>{format(evnt.start, "HH:mm")}</b>
												<span>{workers[evnt.resourceId - 1]}</span>
											</div>
											<div className="nombreCita">
												<img src={defaultPP} alt="PP" />
												<div>
													<b>{evnt.title}</b>
													{expanded === i ? null : (
														<span>
															{evnt.cart.servicesInCart.length > 1
																? `${
																		evnt.cart.servicesInCart[0].description
																  } + ${evnt.cart.servicesInCart.length - 1}`
																: evnt.cart.servicesInCart[0].description}
														</span>
													)}
												</div>
											</div>
											{evnt.pagado ? (
												<i className="material-icons done">done</i>
											) : (
												<i className="material-icons pending">
													pending_actions
												</i>
											)}
										</div>
									</AccordionSummary>
									<AccordionDetails
										style={{
											borderLeftColor: colores[evnt.resourceId - 1],
										}}
										className="acordionDetails">
										<div className="acordionDetailsGrid">
											{evnt.cart.servicesInCart.map((serv) => (
												<div className="serviceItem">
													<p>{serv.description}</p>
													{/* <b>{serv.price}</b> */}
													<b></b>
												</div>
											))}
										</div>
										<Button
											variant="contained"
											color="primary"
											className="actionBtn goToProfileBtn">
											<Link to={{ pathname: `/clients/${evnt.client._id}` }}>
												<i className="material-icons">contact_page</i>
											</Link>
										</Button>
										{evnt.pagado ? (
											<>
												<div></div>
												<Button
													variant="contained"
													color="primary"
													className="actionBtn addToCartBtn"
													onClick={() => {
														setActualTransaction(evnt);
														setOpenTicket(true);
													}}>
													<i className="material-icons">receipt</i>
												</Button>
											</>
										) : (
											<>
												{/* <Button
													variant="contained"
													color="primary"
													className="actionBtn addToCartBtn"
													onClick={() => {
														setActualTransaction(evnt);
														setOpenCart(true);
													}}>
													<i className="material-icons">shopping_cart</i>
												</Button> */}
												<Button
													variant="contained"
													color="primary"
													className="actionBtn currentAppointmentBtn"
													onClick={() => {
														setActualTransaction(evnt);
														setOpenCurrentAppointment(true);
													}}>
													<i className="material-icons">dashboard</i>
												</Button>
												<Button
													variant="contained"
													color="primary"
													className="actionBtn cobrarBtn"
													onClick={() => {
														setActualTransaction(evnt);
														setOpenPOS(true);
													}}>
													Cobrar
												</Button>
											</>
										)}
									</AccordionDetails>
								</Accordion>
							))}
						</div>
					) : (
						<div className="withoutEvents">
							<img src={nothingYet} alt="nothingYetImg" />
							<h1>No hay citas</h1>
						</div>
					)}
				</div>
				<div className="right">
					<MiniCalendar onChange={(d) => getEvents(d)} />
				</div>
			</div>
			<Drawer
				className="POSDrawer"
				open={openPOS}
				anchor="right"
				onClose={() => setOpenPOS(false)}>
				<POS transaction={actualTransaction} onClose={transactionDone}></POS>
			</Drawer>
			<Drawer
				className="CartDrawer"
				open={openCart}
				anchor="right"
				onClose={() => setOpenCart(false)}>
				<Cart transaction={actualTransaction} onClose={cartDone}></Cart>
			</Drawer>
			<Drawer
				className="TicketDrawer"
				open={openTicket}
				anchor="bottom"
				onClose={() => setOpenTicket(false)}>
				<Ticket transaction={actualTransaction} onClose={ticketDone}></Ticket>
			</Drawer>
			<Drawer
				className="CurrentAppointmentDrawer"
				open={openCurrentAppointment}
				anchor="right"
				onClose={() => setOpenCurrentAppointment(false)}>
				<CurrentAppointment
					transaction={actualTransaction}
					onClose={currentAppointmentDone}></CurrentAppointment>
			</Drawer>
		</div>
	);
}

export default Home;
