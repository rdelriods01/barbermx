import React, { useState } from "react";
import axios from "axios";

import "./SearchMenu.scss";

function SearchMenu(props) {
	const [menus, setMenus] = useState([]);

	const searchMenus = (value) => {
		console.log(value);
		if (value.length > 2) {
			axios
				.get("http://192.168.100.17:4000/api/menus/filtered", {
					params: { pre: value },
				})
				.then((data) => {
					let myMenus = [];
					data.data.forEach((menu) => {
						myMenus.push(menu);
					});
					setMenus(myMenus);
				});
		} else {
			setMenus([]);
		}
	};

	return (
		<div className="searchMenuC">
			<div className="searchContainer">
				<input
					type="search"
					name="searchMenus"
					autoFocus
					id="searchMenus"
					className="searchbar"
					autoComplete="off"
					placeholder="Buscar menús..."
					onChange={(ev) => searchMenus(ev.target.value)}
				/>
				<div className={menus.length > 0 ? "dropdownList" : "hide"}>
					{menus &&
						menus.map((menu, index) => (
							<li
								key={index}
								value={menu.title}
								onClick={() => {
									props.onClose({
										desayunos: menu.desayunos,
										comidas: menu.comidas,
										cenas: menu.cenas,
										snacks: menu.snacks,
									});
								}}>
								<span>{menu.title}</span>
							</li>
						))}
				</div>
			</div>
		</div>
	);
}

export default SearchMenu;
