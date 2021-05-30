import React, { useEffect, useState } from "react";

import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { subDays, addDays, format } from "date-fns";
import { es } from "date-fns/locale";

import "./MiniCalendar.scss";

function MiniCalendar(props) {
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		props.onChange(date);
	}, [date]);

	const handleDate = (txt) => {
		if (txt === "back") {
			setDate(subDays(date, 1));
		}
		if (txt === "next") {
			setDate(addDays(date, 1));
		}
	};

	return (
		<div className="miniCalendarC">
			<div className="card">
				<div className="superior">
					<div className="left">
						<div className="nameDay">
							{format(date, "eeee", { locale: es })}
						</div>
						<div className="day"> {format(date, "dd")} </div>
						<div className="month">
							{" "}
							{format(date, "MMMM", { locale: es })}{" "}
						</div>
						<div className="year"> {format(date, "yyyy")} </div>
					</div>
					<div className="right">
						<MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
							<DatePicker
								autoOk
								variant="static"
								openTo="date"
								disableToolbar
								value={date}
								onChange={(d) => setDate(d)}
							/>
						</MuiPickersUtilsProvider>
					</div>
				</div>
				<div className="inferior">
					<button
						onClick={() => {
							handleDate("back");
						}}>
						{"<"}
					</button>
					<button
						onClick={() => {
							setDate(new Date());
						}}>
						hoy
					</button>
					<button
						onClick={() => {
							handleDate("next");
						}}>
						{">"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default MiniCalendar;
