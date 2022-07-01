import React from "react";

import { Button } from "@material-ui/core";

import "./AddMenu.scss";
function AddMenu(props) {
	console.log(props);

	const handleSave = () => {
		props.onClose({
			...props.transaction,
			menu: { desayunos: [], comidas: [], cenas: [], snacks: [] },
		});
	};

	return (
		<div className="addMenuC">
			<h1>Menú para {props.transaction.title}</h1>
			<Button variant="contained" color="primary" onClick={() => handleSave()}>
				Guardar
			</Button>
		</div>
	);
}

export default AddMenu;
