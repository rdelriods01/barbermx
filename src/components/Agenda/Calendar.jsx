import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// import { db } from "../../index";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { es } from "date-fns/locale";

import "react-big-calendar/lib/css/react-big-calendar.css";
import {
	add,
	endOfDay,
	endOfWeek,
	startOfDay,
	startOfWeek,
	sub,
	endOfMonth,
	startOfMonth,
	format,
	parse,
	getDay,
	getTime,
	parseISO,
} from "date-fns";
import { Drawer } from "@material-ui/core";
import Cita from "./Cita";
const locales = {
	es: es,
};
//
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});
const DragAndDropCalendar = withDragAndDrop(Calendar);

const Calendario = () => {
	const [events, setEvents] = useState([]);
	const [openCreate, setOpenCreate] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [actualEvent, setActualEvent] = useState(null);
	const [view, setView] = useState("day");
	const [currentDate, setCurrentDate] = useState(new Date());

	useEffect(() => {
		getRangeOfTimeAndEvents(currentDate);
	}, [view]);

	const openCreateModal = (ev) => {
		setActualEvent({
			start: ev.start,
			end: ev.end,
			title: "",
			resourceId: ev.resourceId,
		});
		setOpenCreate(true);
	};
	const createEvent = async (event) => {
		console.log(event);
		setOpenCreate(false);
		if (event.ready) {
			let newEvent = {
				title: event.client.name,
				start: event.start,
				startTS: getTime(event.start),
				end: event.end,
				client: event.client,
				resourceId: event.worker,
				cart: event.cart,
			};
			console.log(newEvent);
			await axios.post("http://localhost:4000/api/events", newEvent);
			setEvents([...events, newEvent]);
			getRangeOfTimeAndEvents(currentDate);
		}
	};

	const openEditModal = (ev) => {
		console.log(ev);
		if (ev.pagado) {
			alert("No se puede editar un evento terminado");
		} else {
			setActualEvent(ev);
			setOpenEdit(true);
		}
	};

	const closeEditModal = ({
		start,
		end,
		client,
		worker,
		cart,
		ready,
		remove,
	}) => {
		console.log({ start, end, client, worker, cart, ready });
		setOpenEdit(false);
		if (ready || remove) {
			if (remove) {
				deleteEvent(actualEvent);
			} else {
				editEvent({
					event: actualEvent,
					client,
					start,
					end,
					resourceId: worker,
					cart,
				});
			}
		}
	};

	const editEvent = async ({ event, client, start, end, resourceId, cart }) => {
		console.log({ event, client, start, end, resourceId, cart });
		if (event.pagado) {
			alert("No se puede editar un evento terminado");
		} else {
			let newEvent = null;
			if (resourceId === undefined || resourceId === null) {
				console.log("undefined");
				newEvent = {
					...event,
					start,
					end,
					startTS: getTime(start),
				};
			} else {
				if (event.resourceId === resourceId) {
					newEvent = {
						...event,
						start,
						end,
						startTS: getTime(start),
					};
				} else {
					newEvent = {
						...event,
						start,
						end,
						startTS: getTime(start),
						resourceId: resourceId,
					};
				}
			}
			if (client !== undefined) {
				if (event.client._id !== client._id) {
					newEvent = { ...newEvent, client, title: client.name };
				}
			}
			if (cart !== undefined) {
				newEvent = { ...newEvent, cart };
			}
			await axios.put(`http://localhost:4000/api/events/${event._id}`, {
				...newEvent,
			});
			getRangeOfTimeAndEvents(currentDate);
		}
	};

	const deleteEvent = async (event) => {
		console.log("delete event" + JSON.stringify(event));
		await axios.delete(`http://localhost:4000/api/events/${event._id}`);
		getRangeOfTimeAndEvents(currentDate);
	};

	const showView = (actualView) => {
		setView(actualView);
	};

	const getRangeOfTimeAndEvents = (date) => {
		setCurrentDate(date);
		let start, end;
		if (view === "day") {
			start = startOfDay(date);
			end = endOfDay(date);
		} else if (view === "week") {
			start = startOfWeek(date);
			end = endOfWeek(date);
		} else if (view === "month") {
			start = sub(startOfMonth(date), { days: 6 });
			end = add(endOfMonth(date), { days: 6 });
		} else if (view === "agenda") {
			start = startOfDay(date);
			end = add(endOfDay(date), { days: 3 });
		}
		let inicio = getTime(start);
		let final = getTime(end);
		console.log("look for events from " + inicio + " to " + final);
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

	// Calendar Component is ready for import ResourceMap from other component

	const resourceMap = [
		{ resourceId: 1, worker: "Karen Guerra", color: "#00bcd4" },
		// { resourceId: 2, worker: "Worker 2", color: "#FFC107" },
		// { resourceId: 3, worker: "Worker 3", color: "#4caf50" },
		// { resourceId: 4, worker: "Worker 4", color: "#e91e63" },
	];

	return (
		<>
			<div>
				<DragAndDropCalendar
					selectable
					culture={"es"}
					localizer={localizer}
					events={events}
					length={3}
					onEventDrop={editEvent}
					onSelectSlot={openCreateModal}
					onSelectEvent={openEditModal}
					onView={showView}
					onNavigate={getRangeOfTimeAndEvents}
					defaultView={view}
					resources={view === "week" ? null : resourceMap}
					resourceIdAccessor="resourceId"
					resourceTitleAccessor="worker"
					step={30}
					messages={{
						previous: "<",
						today: "Hoy",
						month: "Mes",
						week: "Semana",
						day: "Día",
						next: ">",
						noEventsInRange: "Sin clientes agendados para este rango de fechas",
					}}
					timeslots={4}
					min={new Date("2019, 1, 1, 08:00")}
					max={new Date("2019, 1, 1, 22:00")}
					style={{ height: "85vh" }}
					tooltipAccessor={(ev) =>
						`${ev.title} - ${ev.cart.servicesInCart[0].description} con ${
							ev.resourceId > resourceMap.length
								? null
								: resourceMap[ev.resourceId - 1].worker
						}`
					}
					components={{
						agenda: {
							event: (ev) => (
								<>
									{ev.event.resourceId ? (
										<Link
											to={{ pathname: `/client/${ev.event.clientid}` }}
											style={{
												color: resourceMap[ev.event.resourceId - 1].color,
												backgroundColor: "none",
												textDecoration: "none",
											}}>
											{`${ev.title} - ${
												resourceMap[ev.event.resourceId - 1].worker
											}`}
										</Link>
									) : (
										<span>{ev.title}</span>
									)}
								</>
							),
						},
						event: (ev) => (
							<div className="event">
								<p>
									{ev.title}
									{ev.event.pagado ? (
										<i className="material-icons done">done</i>
									) : null}
								</p>
								<span>{ev.event.cart.servicesInCart[0].description}</span>
							</div>
						),
					}}
					eventPropGetter={(event) => {
						for (let i = 1; i <= resourceMap.length; i++) {
							if (event.resourceId === i && view !== "agenda") {
								console.log(
									"resource ID current: " +
										resourceMap[event.resourceId - 1].color
								);
								return {
									style: {
										borderTopColor: resourceMap[event.resourceId - 1].color,
									},
								};
							}
						}
					}}
				/>
				{view !== "day" && view !== "agenda" ? (
					<div className="leyenda">
						{resourceMap.map((worker) => {
							return (
								<b key={worker.resourceId} style={{ color: worker.color }}>
									{worker.worker}
								</b>
							);
						})}
					</div>
				) : null}
				<Drawer
					open={openCreate}
					anchor="right"
					onClose={() => setOpenCreate(false)}>
					<Cita
						title="Agregar nueva cita"
						event={actualEvent}
						onClose={createEvent}></Cita>
				</Drawer>
				<Drawer
					open={openEdit}
					anchor="right"
					onClose={() => setOpenEdit(false)}>
					<Cita
						title="Editar cita"
						event={actualEvent}
						editFlag={true}
						onClose={closeEditModal}></Cita>
				</Drawer>
			</div>
		</>
	);
};

export default Calendario;
