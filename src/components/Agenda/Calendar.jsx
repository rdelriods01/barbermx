import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
	const barbers = ["Barber 1", "Barber 2", "Barber 3", "Barber 4"];
	const [events, setEvents] = useState([]);
	const [openCreate, setOpenCreate] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [showMore, setShowMore] = useState(false);
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
	const createEvent = (event) => {
		console.log(event);
		setOpenCreate(false);
		if (event.ready) {
			let newEvent = {
				title: event.cliente.name,
				start: event.start,
				startTS: getTime(event.start),
				end: event.end,
				cliente: event.cliente,
				dia: format(event.start, "yyyy-MM-dd"),
				resourceId: event.barber,
				barber: barbers[event.barber - 1],
				servicio: event.servicio,
			};
			console.log(newEvent);
			setEvents([...events, newEvent]);
			//   db.collection("events")
			//     .add(newEvent)
			//     .catch((err) => console.log("Error addign event: ", err));
		}
	};

	const openEditModal = (ev) => {
		setActualEvent(ev);
		setOpenEdit(true);
	};

	const closeEditModal = (event) => {
		setOpenEdit(false);
		if (event.ready || event.remove) {
			if (event.remove) {
				deleteEvent(actualEvent);
			} else {
				editEvent({
					event: actualEvent,
					start: event.start,
					end: event.end,
					resourceId: event.resourceId,
				});
			}
		}
	};

	const editEvent = ({ event, start, end, resourceId }) => {
		let newEvent = null;
		if (resourceId === undefined || resourceId === null) {
			console.log("undefined");
			newEvent = {
				...event,
				start,
				end,
				// dia: moment(start).format("yyyy-MM-dd"),
				dia: format(start, "yyyy-MM-dd"),
				// startTS: moment(start).local().valueOf(),
				startTS: getTime(start),
			};
		} else {
			if (event.resourceId === resourceId) {
				newEvent = {
					...event,
					start,
					end,
					dia: format(start, "yyyy-MM-dd"),
					startTS: getTime(start),
				};
			} else {
				newEvent = {
					...event,
					start,
					end,
					dia: format(start, "yyyy-MM-dd"),
					startTS: getTime(start),
					resourceId: resourceId,
					barber: barbers[resourceId - 1],
				};
			}
		}
		console.log({ ...newEvent });
		// setEvents([...events, newEvent]);
		// db.collection("events")
		//   .doc(event.uid)
		//   .update(newEvent)
		//   .then(() => {
		//     getRangeOfTimeAndEvents(currentDate);
		//   })
		//   .catch((err) => console.error("Error updating event: ", err));
	};

	const deleteEvent = (event) => {
		console.log("delete event" + event);
		// db.collection("events")
		//   .doc(event.uid)
		//   .delete()
		//   .catch((err) => console.error("Error removing event: ", err));
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
		// db.collection("events")
		//   .where("startTS", ">=", inicio)
		//   .where("startTS", "<=", final)
		//   // .onSnapshot((data) => {
		//   .get()
		//   .then((data) => {
		//     let myEvents = [];
		//     let counter = 0;
		//     let datalength = data.size;
		//     data.forEach((ev) => {
		//       let calStart = new Date(ev.data().start.toMillis());
		//       let calEnd = new Date(ev.data().end.toMillis());
		//       let patid = ev.data().clienteid;
		//       db.collection("clientes")
		//         .doc(patid)
		//         .get()
		//         .then((pat) => {
		//           let evn = {
		//             ...ev.data(),
		//             start: calStart,
		//             end: calEnd,
		//             uid: ev.id,
		//             title: pat.data().name,
		//           };
		//           myEvents.push(evn);
		//           counter++;
		//           if (counter === datalength) {
		//             setEvents(myEvents);
		//           }
		//         });
		//     });
		//   });
	};

	const resourceMap = [
		{ resourceId: 1, barber: "Barber 1", color: "#00bcd4" },
		{ resourceId: 2, barber: "Barber 2", color: "#FFC107" },
		{ resourceId: 3, barber: "Barber 3", color: "#4caf50" },
		{ resourceId: 4, barber: "Barber 4", color: "#e91e63" },
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
					resourceTitleAccessor="barber"
					step={30}
					messages={{
						previous: "<",
						today: "Hoy",
						month: "Mes",
						week: "Semana",
						day: "Día",
						next: ">",
						noEventsInRange:
							"Sin pacientes agendados para este rango de fechas",
					}}
					timeslots={4}
					min={new Date("2019, 1, 1, 08:00")}
					max={new Date("2019, 1, 1, 22:00")}
					style={{ height: "85vh" }}
					components={{
						agenda: {
							event: (ev) => (
								<>
									{ev.event.resourceId ? (
										<Link
											to={{ pathname: `/cliente/${ev.event.clienteid}` }}
											style={{
												color: resourceMap[ev.event.resourceId - 1].color,
												backgroundColor: "none",
												textDecoration: "none",
											}}>
											{`${ev.title} - ${
												resourceMap[ev.event.resourceId - 1].barber
											}`}
										</Link>
									) : (
										<span>{ev.title}</span>
									)}
								</>
							),
						},
						// toolbar: {
						// 	header: <h2>Hello</h2>,
						// },
						event: (ev) => (
							<div className="event">
								<p>{ev.title}</p>
								<span>{ev.event.servicio.description}</span>
							</div>
						),
					}}
					eventPropGetter={(event) => {
						if (event.resourceId === 1 && view !== "agenda") {
							return {
								style: {
									borderTopColor: resourceMap[event.resourceId - 1].color,
								},
							};
						}
						if (event.resourceId === 2 && view !== "agenda") {
							return {
								style: {
									borderTopColor: resourceMap[event.resourceId - 1].color,
								},
							};
						}
						if (event.resourceId === 3 && view !== "agenda") {
							return {
								style: {
									borderTopColor: resourceMap[event.resourceId - 1].color,
								},
							};
						}
						if (event.resourceId === 4 && view !== "agenda") {
							return {
								style: {
									borderTopColor: resourceMap[event.resourceId - 1].color,
								},
							};
						}
					}}
				/>
				{view !== "day" && view !== "agenda" ? (
					<div className="leyenda">
						{resourceMap.map((barber) => {
							return (
								<b key={barber.resourceId} style={{ color: barber.color }}>
									{barber.barber}
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
					onClose={() => setOpenCreate(false)}>
					<Cita
						title="Editar cita"
						event={actualEvent}
						editFlag={true}
						onClose={closeEditModal}></Cita>
				</Drawer>

				{/* {openCreate ? null : openEdit ? (
					<Event
						title="Editar cita"
						ready={false}
						remove={false}
						delbtn={true}
						open={openEdit}
						event={actualEvent}
						onClose={closeEditModal}></Event>
				) : null} */}
			</div>
		</>
	);
};

export default Calendario;
