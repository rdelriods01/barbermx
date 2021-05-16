import { Button, Drawer } from "@material-ui/core";
import { useEffect, useState } from "react";

function Venta() {
	const [hoy, setHoy] = useState(new Date());
	const [openCreate, setOpenCreate] = useState(false);

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
			<Button onClick={() => setOpenCreate(true)}>Drawer</Button>
			<Drawer
				open={openCreate}
				anchor="right"
				onClose={() => setOpenCreate(false)}>
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni,
					laboriosam?
				</p>
			</Drawer>
		</div>
	);
}

export default Venta;
