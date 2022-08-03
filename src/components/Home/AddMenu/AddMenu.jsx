import { useState, useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import axios from "axios";

import { Tabs, Paper, Tab, Button, Drawer } from "@material-ui/core";

import "./AddMenu.scss";
import SearchMenu from "./SearchMenu";
import SaveNewMenu from "./SaveNewMenu";

function AddMenu(props) {
	console.log(props);

	const tran = props.transaction;

	const desayunosDB = [
		{
			title: "huevito con chorizo y queso gratinado",
			description:
				"2 huevos revueltos con chorizo con 1cdita de aceite de oliva",
		},
		{
			title: "huevito con jamon",
			description: "2 huevos revueltos con jamon con 1cdita de aceite de oliva",
		},
		{
			title: "huevito con salchicha",
			description:
				"2 huevos revueltos con salchicha con 1cdita de aceite de oliva",
		},
		{
			title: "huevito con frijolitos",
			description:
				"2 huevos revueltos con frijolitos con 1cdita de aceite de oliva",
		},
		{
			title: "huevito con nopalitos",
			description:
				"2 huevos revueltos con nopalitos con 1cdita de aceite de oliva",
		},
		{
			title: "huevito con cebolla",
			description:
				"2 huevos revueltos con cebolla con 1cdita de aceite de oliva",
		},
		{
			title: "huevito con tomate",
			description:
				"2 huevos revueltos con tomate con 1cdita de aceite de oliva",
		},
		{
			title: "huevito estrellados",
			description: "2 huevos estrellados con 1cdita de aceite de oliva",
		},
		{
			title: "huevito con catsup",
			description:
				"2 huevos revueltos con catsup con 1cdita de aceite de oliva",
		},
		{
			title: "huevito con frijolitos negros",
			description:
				"2 huevos revueltos con frijolitos negros con 1cdita de aceite de oliva",
		},
		{
			title: "huevito con machacado",
			description:
				"2 huevos revueltos con machacado con 1cdita de aceite de oliva",
		},
		{
			title: "huevito con chile",
			description: "2 huevos revueltos con chile con 1cdita de aceite de oliva",
		},
	];
	const comidasDB = [
		{
			title: "pollo en mole",
			description: "2 pechugas de pollo acompañadas con salsa de mole",
		},
		{
			title: "picadillo",
			description:
				"300gr de picadillo, puede cocinarse con chile morron, tomate y cebolla",
		},
		{ title: "ensalada", description: "lechuga al gusto con tomate" },
	];
	const cenasDB = [
		{
			title: "burritos",
			description: "4 burritos, 2 de aguacate y 2 de huevo con chorizo",
		},
		{
			title: "molletes",
			description:
				"2 molletes con frijolitos y queso gratinado, puede agregar chorizo encima al gusto",
		},
		{
			title: "pan dulce",
			description: "pan dulce del castaño con cafecito o leche",
		},
	];
	const snacksDB = [
		{ title: "fruta", description: "fruta al gusto" },
		{ title: "yogurt", description: "yogurt al gusto" },
		{ title: "gelatina", description: "gelatina al gusto" },
	];

	const [tabsValue, setTabsValue] = useState(0);
	const [desayunos, setDesayunos] = useState([...desayunosDB]);
	const [comidas, setComidas] = useState([...comidasDB]);
	const [cenas, setCenas] = useState([...cenasDB]);
	const [snacks, setSnacks] = useState([...snacksDB]);
	const [desayunosInMenu, setDesayunosInMenu] = useState(
		tran.menu ? tran.menu.desayunos : []
	);
	const [comidasInMenu, setComidasInMenu] = useState(
		tran.menu ? tran.menu.comidas : []
	);
	const [cenasInMenu, setCenasInMenu] = useState(
		tran.menu ? tran.menu.cenas : []
	);
	const [snacksInMenu, setSnacksInMenu] = useState(
		tran.menu ? tran.menu.snacks : []
	);
	const [showMoreMenu, setShowMoreMenu] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [openSearchMenu, setOpenSearchMenu] = useState(false);
	const [openSaveNewMenu, setOpenSaveNewMenu] = useState(false);

	// const for Edit

	const [titleEdited, setTitleEdited] = useState("");
	const [descriptionEdited, setDescriptionEdited] = useState("");
	const [editDesayuno, setEditDesayuno] = useState(false);
	const [editComida, setEditComida] = useState(false);
	const [editCena, setEditCena] = useState(false);
	const [editSnack, setEditSnack] = useState(false);
	const [editIndex, setEditIndex] = useState(999);

	useEffect(() => {
		if (
			desayunosInMenu.length === 0 ||
			comidasInMenu.length === 0 ||
			cenasInMenu.length === 0 ||
			snacksInMenu.length === 0
		) {
			setDisabled(true);
		} else {
			setDisabled(false);
		}
	}, [desayunosInMenu, comidasInMenu, cenasInMenu, snacksInMenu]);

	const handleTabChange = (event, newValue) => {
		setTabsValue(newValue);
	};
	const handleTabChangeIndex = (index) => {
		setTabsValue(index);
	};

	const searchFor = async (v, menuTime) => {
		if (v) {
			if (v.length > 2) {
				switch (menuTime) {
					case "desayuno":
						let myDesayunos = await filterByProperty(
							desayunos,
							"description",
							v
						);
						setDesayunos(myDesayunos);
						break;
					case "comida":
						let myComidas = await filterByProperty(comidas, "description", v);
						setComidas(myComidas);
						break;
					case "cena":
						let myCenas = await filterByProperty(cenas, "description", v);
						setCenas(myCenas);
						break;
					case "snack":
						let mySnacks = await filterByProperty(snacks, "description", v);
						setSnacks(mySnacks);
						break;

					default:
						break;
				}
			} else {
				switch (menuTime) {
					case "desayuno":
						setDesayunos(desayunosDB);
						break;
					case "comida":
						setComidas(comidasDB);
						break;
					case "cena":
						setCenas(cenasDB);
						break;
					case "snack":
						setSnacks(snacksDB);
						break;
					default:
						break;
				}
			}
		}
	};

	const filterByProperty = (array, prop, value) => {
		var filtered = [];
		for (var i = 0; i < array.length; i++) {
			var obj = array[i];
			if (obj[prop].indexOf(value) >= 0) {
				filtered.push(obj);
			}
		}
		return filtered;
	};

	const addToMenu = (val, menuTime) => {
		let arr =
			menuTime === "desayuno"
				? [...desayunosInMenu]
				: menuTime === "comida"
				? [...comidasInMenu]
				: menuTime === "cena"
				? [...cenasInMenu]
				: [...snacksInMenu];
		// let arr = [...servicesInCart];
		let alreadyAdded = false;
		arr.find((o, i) => {
			if (o.description === val.description) {
				alreadyAdded = true;
				return true; // stop searching
			}
			return null;
		});
		if (alreadyAdded) {
			switch (menuTime) {
				case "desayuno":
					setDesayunosInMenu(arr);
					break;
				case "comida":
					setComidasInMenu(arr);
					break;
				case "cena":
					setCenasInMenu(arr);
					break;
				case "snack":
					setSnacksInMenu(arr);
					break;
				default:
					break;
			}
		} else {
			arr.push(val);
			switch (menuTime) {
				case "desayuno":
					setDesayunosInMenu(arr);
					break;
				case "comida":
					setComidasInMenu(arr);
					break;
				case "cena":
					setCenasInMenu(arr);
					break;
				case "snack":
					setSnacksInMenu(arr);
					break;
				default:
					break;
			}
		}
	};

	const deleteFromMenu = (val, menuTime) => {
		let arr =
			menuTime === "desayuno"
				? [...desayunosInMenu]
				: menuTime === "comida"
				? [...comidasInMenu]
				: menuTime === "cena"
				? [...cenasInMenu]
				: [...snacksInMenu];
		arr.find((o, i) => {
			if (o.description === val.description) {
				arr.splice(i, 1);
				return true; // stop searching
			}
			return null;
		});
		menuTime === "desayuno"
			? setDesayunosInMenu(arr)
			: menuTime === "comida"
			? setComidasInMenu(arr)
			: menuTime === "cena"
			? setCenasInMenu(arr)
			: setSnacksInMenu(arr);
	};

	const editFromMenu = (val, menuTime, index) => {
		let arr =
			menuTime === "desayuno"
				? [...desayunosInMenu]
				: menuTime === "comida"
				? [...comidasInMenu]
				: menuTime === "cena"
				? [...cenasInMenu]
				: [...snacksInMenu];
		arr.find((o, i) => {
			if (o.description === val.description) {
				setTitleEdited(arr[i].title);
				setDescriptionEdited(arr[i].description);
				return true; // stop searching
			}
			return null;
		});

		switch (menuTime) {
			case "desayuno":
				setEditDesayuno(true);
				break;
			case "comida":
				setEditComida(true);
				break;
			case "cena":
				setEditCena(true);
				break;
			case "snack":
				setEditSnack(true);
				break;
			default:
				break;
		}
		setEditIndex(index);
	};

	const saveEditFromMenu = (menuTime, index) => {
		let arr =
			menuTime === "desayuno"
				? [...desayunosInMenu]
				: menuTime === "comida"
				? [...comidasInMenu]
				: menuTime === "cena"
				? [...cenasInMenu]
				: [...snacksInMenu];
		arr[index] = { title: titleEdited, description: descriptionEdited };
		switch (menuTime) {
			case "desayuno":
				setDesayunosInMenu(arr);
				setEditDesayuno(false);
				break;
			case "comida":
				setComidasInMenu(arr);
				setEditComida(false);
				break;
			case "cena":
				setCenasInMenu(arr);
				setEditCena(false);
				break;
			case "snack":
				setSnacksInMenu(arr);
				setEditSnack(false);
				break;
			default:
				break;
		}
		setEditIndex(999);
	};

	const bringLastMenu = () => {
		// Aqui tengo que empezar a buscar dependiendo del consecutivo, esto lo puedo hacer en el back y nomas traer el menu.
		console.log(tran.client.consecutive);
	};
	const bringSomeMenu = () => {
		setOpenSearchMenu(true);
	};

	const searchMenuDone = (menu) => {
		console.log(menu);
		if (menu) {
			setDesayunosInMenu(menu.desayunos);
			setComidasInMenu(menu.comidas);
			setCenasInMenu(menu.cenas);
			setSnacksInMenu(menu.snacks);
		}
		setOpenSearchMenu(false);
	};

	const saveNewMenu = () => {
		if (disabled) {
			alert("No es posible guardar el menu si está incompleto");
		} else {
			setOpenSaveNewMenu(true);
		}
	};
	const saveNewMenuDone = async (title) => {
		let myNewMenu = {
			title,
			desayunos: desayunosInMenu,
			comidas: comidasInMenu,
			cenas: cenasInMenu,
			snacks: snacksInMenu,
		};

		console.log(myNewMenu);
		await axios
			.post("http://localhost:4000/api/menus/", myNewMenu)
			.catch((error) => {
				console.log(error);
			});
		alert(`Menú guardado correctamente con el nombre ${title}`);
		setOpenSaveNewMenu(false);
	};
	const deleteAllMenu = () => {
		setDesayunosInMenu([]);
		setComidasInMenu([]);
		setCenasInMenu([]);
		setSnacksInMenu([]);
	};

	const handleSave = (menu) => {
		console.log(menu);
		props.onClose({
			...props.transaction,
			menu,
		});
	};

	return (
		<div className="addMenuC">
			<div className="gridAddMenu">
				<div className="left">
					<Paper square className="tabsFooter">
						<Tabs
							value={tabsValue}
							onChange={handleTabChange}
							variant="fullWidth"
							orientation="vertical"
							indicatorColor="primary"
							textColor="primary"
							aria-label="icon label tabs example">
							<Tab
								icon={<i className="material-icons">free_breakfast</i>}
								label="Desayunos"
							/>
							<Tab
								icon={<i className="material-icons">restaurant</i>}
								label="Comidas"
							/>
							<Tab
								icon={<i className="material-icons">dinner_dining</i>}
								label="Cenas"
							/>
							<Tab
								icon={<i className="material-icons">brunch_dining</i>}
								label="Sancks"
							/>
						</Tabs>
					</Paper>
					<SwipeableViews
						axis={"x"}
						className="swipeableViews"
						index={tabsValue}
						onChangeIndex={handleTabChangeIndex}>
						<div value={tabsValue} index={0} className="viewContent">
							<div className="searchBar">
								<input
									type="search"
									placeholder="Buscar desayunos..."
									onChange={(ev) =>
										searchFor(ev.target.value.toLowerCase(), "desayuno")
									}
								/>
							</div>
							<div className="viewContentList">
								{desayunos.map((desayuno, index) => (
									<li
										key={index}
										onClick={() => {
											addToMenu(desayuno, "desayuno");
										}}>
										<div>
											<i className="material-icons">free_breakfast</i>
										</div>
										<b>{desayuno.title}</b>
										<span>{desayuno.description}</span>
									</li>
								))}
							</div>
						</div>
						<div value={tabsValue} index={1} className="viewContent">
							<div className="searchBar">
								<input
									type="search"
									placeholder="Buscar comidas..."
									onChange={(ev) =>
										searchFor(ev.target.value.toLowerCase(), "comida")
									}
								/>
							</div>
							<div className="viewContentList">
								{comidas.map((comida, index) => (
									<li
										key={index}
										onClick={() => {
											addToMenu(comida, "comida");
										}}>
										<div>
											<i className="material-icons">restaurant</i>
										</div>
										<b>{comida.title}</b>
										<span>{comida.description}</span>
									</li>
								))}
							</div>
						</div>
						<div value={tabsValue} index={2} className="viewContent">
							<div className="searchBar">
								<input
									type="search"
									placeholder="Buscar cenas..."
									onChange={(ev) =>
										searchFor(ev.target.value.toLowerCase(), "cena")
									}
								/>
							</div>
							<div className="viewContentList">
								{cenas.map((cena, index) => (
									<li
										key={index}
										onClick={() => {
											addToMenu(cena, "cena");
										}}>
										<div>
											<i className="material-icons">dinner_dining</i>
										</div>
										<b>{cena.title}</b>
										<span>{cena.description}</span>
									</li>
								))}
							</div>
						</div>
						<div value={tabsValue} index={3} className="viewContent">
							<div className="searchBar">
								<input
									type="search"
									placeholder="Buscar snacks..."
									onChange={(ev) =>
										searchFor(ev.target.value.toLowerCase(), "snack")
									}
								/>
							</div>
							<div className="viewContentList">
								{snacks.map((snack, index) => (
									<li
										key={index}
										onClick={() => {
											addToMenu(snack, "snack");
										}}>
										<div>
											<i className="material-icons">brunch_dining</i>
										</div>
										<b>{snack.title}</b>
										<span>{snack.description}</span>
									</li>
								))}
							</div>
						</div>
					</SwipeableViews>
				</div>
				<div className="right">
					<div className="header">
						<b className="patientName">{props.transaction.title}</b>
						<b>-</b>
						<div className="lastHeaderItem">
							<b>Menú</b>

							<button
								className="moreBtn"
								onClick={() => setShowMoreMenu((prev) => !prev)}>
								<i className="material-icons">more_vert</i>
							</button>
							<div
								className={showMoreMenu ? "moreMenuBackground" : "hide"}
								onClick={() => {
									setShowMoreMenu(false);
								}}>
								<div className="dropdown">
									<label
										className="option"
										onClick={() => {
											bringLastMenu();
											setShowMoreMenu(false);
										}}>
										Cargar último menú
									</label>
									<label
										className="option"
										onClick={() => {
											bringSomeMenu();
											setShowMoreMenu(false);
										}}>
										Buscar y cargar menú
									</label>
									<label
										className="option"
										onClick={() => {
											saveNewMenu();
											setShowMoreMenu(false);
										}}>
										Guardar como menú
									</label>
									<label
										className="option"
										onClick={() => {
											setShowMoreMenu(false);
											deleteAllMenu();
										}}>
										Borrar todo
									</label>
								</div>
							</div>
						</div>
					</div>
					<div className="menuList">
						<h3>Desayunos</h3>
						<div className="menuListItems">
							{desayunosInMenu.map((desayuno, index) => (
								<li key={index}>
									<div>
										<i
											className="material-icons deleteBtn"
											onClick={() => deleteFromMenu(desayuno, "desayuno")}>
											delete
										</i>
										{editDesayuno && editIndex === index ? (
											<i
												className="material-icons"
												onClick={() => saveEditFromMenu("desayuno", index)}>
												save
											</i>
										) : (
											<i
												className="material-icons"
												onClick={() =>
													editFromMenu(desayuno, "desayuno", index)
												}>
												edit
											</i>
										)}
									</div>
									{editDesayuno && editIndex === index ? (
										<>
											<input
												type="text"
												value={titleEdited}
												onChange={(ev) =>
													setTitleEdited(ev.target.value.toLowerCase())
												}
											/>
										</>
									) : (
										<b>{desayuno.title}</b>
									)}
									{editDesayuno && editIndex === index ? (
										<input
											type="text"
											value={descriptionEdited}
											onChange={(ev) =>
												setDescriptionEdited(ev.target.value.toLowerCase())
											}
										/>
									) : (
										<span>{desayuno.description}</span>
									)}
								</li>
							))}
						</div>
						<h3>Comidas</h3>
						<div className="menuListItems">
							{comidasInMenu.map((comida, index) => (
								<li key={index}>
									<div>
										<i
											className="material-icons deleteBtn"
											onClick={() => deleteFromMenu(comida, "comida")}>
											delete
										</i>
										{editComida && editIndex === index ? (
											<i
												className="material-icons"
												onClick={() => saveEditFromMenu("comida", index)}>
												save
											</i>
										) : (
											<i
												className="material-icons"
												onClick={() => editFromMenu(comida, "comida", index)}>
												edit
											</i>
										)}
									</div>
									{editComida && editIndex === index ? (
										<>
											<input
												type="text"
												value={titleEdited}
												onChange={(ev) =>
													setTitleEdited(ev.target.value.toLowerCase())
												}
											/>
										</>
									) : (
										<b>{comida.title}</b>
									)}
									{editComida && editIndex === index ? (
										<input
											type="text"
											value={descriptionEdited}
											onChange={(ev) =>
												setDescriptionEdited(ev.target.value.toLowerCase())
											}
										/>
									) : (
										<span>{comida.description}</span>
									)}
								</li>
							))}
						</div>
						<h3>Cenas</h3>
						<div className="menuListItems">
							{cenasInMenu.map((cena, index) => (
								<li key={index}>
									<div>
										<i
											className="material-icons deleteBtn"
											onClick={() => deleteFromMenu(cena, "cena")}>
											delete
										</i>
										{editCena && editIndex === index ? (
											<i
												className="material-icons"
												onClick={() => saveEditFromMenu("cena", index)}>
												save
											</i>
										) : (
											<i
												className="material-icons"
												onClick={() => editFromMenu(cena, "cena", index)}>
												edit
											</i>
										)}
									</div>
									{editCena && editIndex === index ? (
										<>
											<input
												type="text"
												value={titleEdited}
												onChange={(ev) =>
													setTitleEdited(ev.target.value.toLowerCase())
												}
											/>
										</>
									) : (
										<b>{cena.title}</b>
									)}
									{editCena && editIndex === index ? (
										<input
											type="text"
											value={descriptionEdited}
											onChange={(ev) =>
												setDescriptionEdited(ev.target.value.toLowerCase())
											}
										/>
									) : (
										<span>{cena.description}</span>
									)}
								</li>
							))}
						</div>
						<h3>Snacks</h3>
						<div className="menuListItems">
							{snacksInMenu.map((snack, index) => (
								<li key={index}>
									<div>
										<i
											className="material-icons deleteBtn"
											onClick={() => deleteFromMenu(snack, "snack")}>
											delete
										</i>
										{editSnack && editIndex === index ? (
											<i
												className="material-icons"
												onClick={() => saveEditFromMenu("snack", index)}>
												save
											</i>
										) : (
											<i
												className="material-icons"
												onClick={() => editFromMenu(snack, "snack", index)}>
												edit
											</i>
										)}
									</div>
									{editSnack && editIndex === index ? (
										<>
											<input
												type="text"
												value={titleEdited}
												onChange={(ev) =>
													setTitleEdited(ev.target.value.toLowerCase())
												}
											/>
										</>
									) : (
										<b>{snack.title}</b>
									)}
									{editSnack && editIndex === index ? (
										<input
											type="text"
											value={descriptionEdited}
											onChange={(ev) =>
												setDescriptionEdited(ev.target.value.toLowerCase())
											}
										/>
									) : (
										<span>{snack.description}</span>
									)}
								</li>
							))}
						</div>
					</div>
					<div className="actionBtns">
						<Button
							className="cancelBtn"
							onClick={() => {
								props.onClose(false);
							}}>
							Cancelar
						</Button>
						<Button
							variant="contained"
							className={disabled ? "guardarBtn disabled" : "guardarBtn"}
							disabled={disabled}
							onClick={() => {
								handleSave({
									desayunosInMenu,
									comidasInMenu,
									cenasInMenu,
									snacksInMenu,
								});
							}}>
							Guardar
						</Button>
					</div>
				</div>
				<Drawer
					className="SearchMenuDrawer"
					open={openSearchMenu}
					anchor="bottom"
					onClose={() => setOpenSearchMenu(false)}>
					<SearchMenu onClose={searchMenuDone}></SearchMenu>
				</Drawer>
				<Drawer
					className="SaveNewMenuDrawer"
					open={openSaveNewMenu}
					anchor="bottom"
					onClose={() => setOpenSaveNewMenu(false)}>
					<SaveNewMenu onClose={saveNewMenuDone}></SaveNewMenu>
				</Drawer>
			</div>

			{/* <Button variant="contained" color="primary" onClick={() => handleSave()}>
				Guardar
			</Button> */}
		</div>
	);
}

export default AddMenu;
