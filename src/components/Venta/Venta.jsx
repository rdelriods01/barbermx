import { Button, Drawer } from "@material-ui/core";
import { useState } from "react";

function Venta() {
	const [openCreate, setOpenCreate] = useState(false);

	return (
		<div>
			<h1>This is barberMX</h1>

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
