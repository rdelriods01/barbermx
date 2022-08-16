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
import TodayData from "./TodayData/TodayData";
import Review from "./Review/Review";
import AddMenu from "./AddMenu/AddMenu";

function Home() {
	const workers = ["Karen Guerra"];
	const colores = ["#00bcd4"];

	const [events, setEvents] = useState([]);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [expanded, setExpanded] = useState(false);

	const [openPOS, setOpenPOS] = useState(false);
	const [openCart, setOpenCart] = useState(false);
	const [openTicket, setOpenTicket] = useState(false);
	const [openTodayData, setOpenTodayData] = useState(false);
	const [openReview, setOpenReview] = useState(false);
	const [openAddMenu, setOpenAddMenu] = useState(false);

	const [actualTransaction, setActualTransaction] = useState(null);

	useEffect(() => {
		getEvents(currentDate);
	}, []);

	const getEvents = async (date) => {
		setCurrentDate(date);
		let start, end;
		start = startOfDay(date);
		end = endOfDay(date);
		console.log("look for events from " + date);
		// Search for events
		await axios
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

	const todayDataDone = (measurements, height, initialWeight, goal) => {
		console.log("TodayData Done");
		if (measurements) {
			console.log(measurements);
			console.log(initialWeight);
			setOpenTodayData(false);
			setActualTransaction({
				...actualTransaction,
				measurements,
				client: { ...actualTransaction.client, height, initialWeight, goal },
			});
			if (actualTransaction.client.consecutive > 1) {
				setOpenReview(true);
			} else {
				setOpenAddMenu(true);
			}
		} else {
			console.log(measurements);
			setOpenTodayData(false);
		}
	};

	const reviewDone = (cancel, back, next, transaction) => {
		console.log("Review Done");
		if (cancel) {
			setOpenReview(false);
		} else if (back) {
			setOpenReview(false);
			setOpenTodayData(true);
		} else if (next) {
			console.log(transaction);
			setOpenReview(false);
			// Save data to DB
			setOpenAddMenu(true);
		}
	};
	const addMenuDone = async (transaction) => {
		console.log("AddMenu Done");
		console.log(transaction);
		if (transaction) {
			// Actualizar los datos del paciente (Estatura, peso ideal, peso inicial)
			await axios.put(
				`http://localhost:4000/api/clients/${transaction.client._id}`,
				{
					height: transaction.client.height,
					goal: transaction.client.goal,
					initialWeight: transaction.client.initialWeight,
				}
			);
			await axios.put(`http://localhost:4000/api/events/${transaction._id}`, {
				...transaction,
			});
			getEvents(currentDate);
			setOpenAddMenu(false);
		} else {
			setOpenAddMenu(false);
		}
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
												<img
													src={defaultPP}
													alt="PP"
													className={
														evnt.client.gender === "M" ? "male" : "female"
													}
												/>
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
											) : evnt.menu ? (
												<i className="material-icons pending">rule</i>
											) : (
												<i className="material-icons waiting">
													history_toggle_off
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
											{evnt.cart.servicesInCart.map((serv, i) => (
												<div className="serviceItem" key={i}>
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
														setOpenTodayData(true);
													}}>
													<i className="material-icons">start</i>
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
				className="TodayDataDrawer"
				open={openTodayData}
				anchor="right"
				onClose={() => setOpenTodayData(false)}>
				<TodayData
					transaction={actualTransaction}
					onClose={todayDataDone}></TodayData>
			</Drawer>
			<Drawer
				className="ReviewDrawer"
				open={openReview}
				anchor="right"
				onClose={() => setOpenReview(false)}>
				<Review transaction={actualTransaction} onClose={reviewDone}></Review>
			</Drawer>
			<Drawer
				className="AddMenuDrawer"
				open={openAddMenu}
				anchor="right"
				onClose={() => setOpenAddMenu(false)}>
				<AddMenu
					transaction={actualTransaction}
					onClose={addMenuDone}></AddMenu>
			</Drawer>
		</div>
	);
}

export default Home;
