import { useEffect, useState } from "react";

import "./Clock.scss";

function Clock() {
	const [hoy, setHoy] = useState(new Date());

	useEffect(() => {
		let timerID = setInterval(() => setHoy(new Date()), 1000);
		return function cleanup() {
			clearInterval(timerID);
		};
	});

	return (
		<div className="clockC">
			{hoy.toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
			})}
		</div>
	);
}

export default Clock;
