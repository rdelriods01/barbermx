import React, { useEffect, useState } from "react";

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

import "./Home.scss";
import Weather from "./Weather";
import MiniCalendar from "./MiniCalendar";
import Clock from "./Clock";
import POS from "./POS/POS";
import Cart from "./Cart/Cart";

function Home() {
	const barbers = ["", "Barber 1", "Barber 2", "Barber 3", "Barber 4"];
	const colores = ["", "#00bcd4", "#FFC107", "#4caf50", "#e91e63"];

	const [events, setEvents] = useState([]);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [expanded, setExpanded] = useState(false);

	const [openPOS, setOpenPOS] = useState(false);
	const [openCart, setOpenCart] = useState(false);
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
				// console.log(myEvents);
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
			setOpenPOS(false);
		}
		// getEvents(currentDate)
	};

	return (
		<div className="HomeC">
			<div className="superior">
				<h2>
					<i className="material-icons">home</i> Home
				</h2>
				<div className="weather">
					<Weather />
				</div>
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
											borderLeftColor: colores[evnt.resourceId],
										}}
										className={
											expanded === i
												? "acordionHeader"
												: "acordionHeader borderRadiusHeader"
										}>
										<div className="acordionHeaderContent">
											<div className="tiempoCita">
												<b>{format(evnt.start, "HH:mm")}</b>
												<span>{barbers[evnt.resourceId]}</span>
											</div>
											<div className="nombreCita">
												<img src={defaultPP} alt="PP" />
												<div>
													<b>{evnt.title}</b>
													{expanded === i ? null : (
														<span>
															{evnt.service.length > 1
																? `${evnt.service[0].description} + ${
																		evnt.service.length - 1
																  }`
																: evnt.service[0].description}{" "}
														</span>
													)}
												</div>
											</div>

											<i className="material-icons pending">pending_actions</i>
										</div>
									</AccordionSummary>
									<AccordionDetails
										style={{
											borderLeftColor: colores[evnt.resourceId],
										}}
										className="acordionDetails">
										<div className="acordionDetailsGrid">
											{evnt.service.map((serv) => (
												<div className="serviceItem">
													<p>{serv.description}</p>
													<b>{serv.price}</b>
												</div>
											))}
										</div>
										<Button
											variant="contained"
											color="primary"
											className="actionBtn addToCartBtn"
											onClick={() => {
												setActualTransaction(evnt);
												setOpenCart(true);
											}}>
											<i className="material-icons">shopping_cart</i>
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
									</AccordionDetails>
								</Accordion>
							))}
						</div>
					) : (
						<div className="withoutEvents">
							<img src={nothingYet} alt="nothingYetImg" />
							<h1>No hay citas el día de hoy</h1>
						</div>
					)}
				</div>
				<div className="right">
					<MiniCalendar onChange={(d) => getEvents(d)} />
					<Clock />
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
		</div>
	);
}

export default Home;
