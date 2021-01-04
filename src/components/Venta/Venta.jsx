import { useEffect, useState } from "react";

function Venta() {
	const [hoy, setHoy] = useState(new Date());

	useEffect(() => {
		let timerID = setInterval(() => setHoy(new Date()), 1000);
		return function cleanup() {
			clearInterval(timerID);
		};
	});

	return (
		<div>
			<h1>This is barberMX</h1>
			{hoy.toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
			})}
		</div>
	);
}

export default Venta;
