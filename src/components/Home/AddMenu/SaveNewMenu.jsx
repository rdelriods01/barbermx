import React, { useState, useEffect } from "react";

import { Button } from "@material-ui/core";

import "./SaveNewMenu.scss";

function SaveNewMenu(props) {
	const [menuTitle, setMenuTitle] = useState("");
	const [disabledBtn, setDisabledBtn] = useState(true);

	useEffect(() => {
		if (menuTitle === "") {
			setDisabledBtn(true);
		} else {
			setDisabledBtn(false);
		}
	}, [menuTitle]);

	const handleSaveMenu = () => {
		props.onClose(menuTitle);
	};

	return (
		<div className="saveNewMenuC">
			<h3>Nombre del nuevo menú:</h3>
			<input
				type="search"
				name="searchMenus"
				autoFocus
				id="searchMenus"
				className="searchbar"
				autoComplete="off"
				placeholder="Guardar menú como..."
				onChange={(ev) => setMenuTitle(ev.target.value)}
			/>
			<div className="saveBtn">
				<Button
					disabled={disabledBtn}
					variant="contained"
					onClick={() => handleSaveMenu()}
					color={disabledBtn ? "default" : "primary"}>
					Guardar
				</Button>
			</div>
		</div>
	);
}

export default SaveNewMenu;
