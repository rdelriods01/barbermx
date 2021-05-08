import Calendario from "./Calendar";

import "./Agenda.scss";

const Agenda = () => {
	return (
		<div className="agenda">
			<h2>
				<i className="material-icons">today</i> Agenda
			</h2>
			<div className="calendar">
				<Calendario />
			</div>
		</div>
	);
};

export default Agenda;
