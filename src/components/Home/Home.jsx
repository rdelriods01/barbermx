import React, { useEffect, useState } from "react";

import axios from "axios";
import { endOfDay, startOfDay, parseISO, format } from "date-fns";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Card,
	CardContent,
} from "@material-ui/core";

import nothingYet from "../../assets/nothingyet.png";
import defaultPP from "../../assets/pp_default.svg";

import "./Home.scss";
import Weather from "./Weather";

function Home() {
	const barbers = ["", "Barber 1", "Barber 2", "Barber 3", "Barber 4"];
	const colores = ["", "#00bcd4", "#FFC107", "#4caf50", "#e91e63"];

	const [events, setEvents] = useState([]);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [expanded, setExpanded] = useState(false);

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
													<span>{evnt.service.description}</span>
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
											<span>Nothing here yet</span>
										</div>
										<Button
											variant="contained"
											color="primary"
											className="cobrarBtn"
											// onClick={() => openCobrarM(evnt)}
											onClick={() => console.log(evnt)}>
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
				<div className="right"></div>
			</div>
		</div>
	);
}

export default Home;
