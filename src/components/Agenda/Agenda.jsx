import Calendario from "./Calendar";

import "./Agenda.scss";

const Agenda = () => {
	return (
		<div className="agenda">
			<h3>Agenda</h3>
			<div className="calendar">
				<Calendario />
			</div>
		</div>
	);
};

export default Agenda;
