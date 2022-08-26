import React from "react";
import "./MenuPreview.scss";
import LZlogo from "../../assets/LZlogo.png";

function MenuPreview(props) {
	const menu = props.menu;
	const client = props.client;

	console.log(client);

	return (
		<div className="menuPreviewC">
			<div className="superior">
				<h2>{client.name.split(" ")[0]}</h2>
				<div></div>
				<div className="brand">
					<img src={LZlogo} alt="LZlogo" />
				</div>
			</div>

			<div className="menuContainer">
				<div className="desayuno">
					<h3>Desayunos</h3>
					{menu.desayunos.map((item, index) => (
						<li key={index}>
							<p>{item.title}</p>:<span> {item.description}</span>
						</li>
					))}
				</div>
				<div className="comida">
					<h3>Comidas</h3>
					{menu.comidas.map((item, index) => (
						<li key={index}>
							<p>{item.title}</p>:<span> {item.description}</span>
						</li>
					))}
				</div>
				<div className="cena">
					<h3>Cenas</h3>
					{menu.cenas.map((item, index) => (
						<li key={index}>
							<p>{item.title}</p>:<span> {item.description}</span>
						</li>
					))}
				</div>
				<div className="snacks">
					<h3>Snacks</h3>
					{menu.snacks.map((item, index) => (
						<li key={index}>
							<p>{item.title}</p>:<span> {item.description}</span>
						</li>
					))}
				</div>
			</div>
			<span className="spacer" />
			<footer>
				<p>Lic. Karen Guerra</p>
				<p>Nutriologa</p>
				<p>
					Av. Paseo de los Leones 252-A Col. Mitras Centro C.P. 64460 Monterrey
					N.L.
				</p>
				<p>LIGHTZONE nut.karenguerra 8113964485</p>
			</footer>
		</div>
	);
}

export default MenuPreview;
