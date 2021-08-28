import React from "react";

import { IconButton } from "@material-ui/core";

import "./POS.scss";
import Cobrar from "./Cobrar";

function POS(props) {
	console.log(props.transaction);
	const servicesInCart = props.transaction.cart
		? props.transaction.cart.servicesInCart
		: props.transaction.service;
	const productsInCart = props.transaction.cart
		? props.transaction.cart.productsInCart
		: [];

	const cobrarDone = async (done, transaction) => {
		console.log(done, transaction);
		if (done) {
			console.log(transaction);
			let sum = 0;
			let articulos = 0;
			for (let i = 0; i < servicesInCart.length; i++) {
				sum = sum + Number(servicesInCart[i].price);
				articulos = articulos + 1;
			}
			for (let i = 0; i < productsInCart.length; i++) {
				sum = sum + Number(productsInCart[i].total);
				articulos = articulos + productsInCart[i].cant;
			}
			let iva = (sum * 0.16).toFixed(2);
			let subTotal = (sum - iva).toFixed(2);
			props.onClose(false, false, {
				...props.transaction,
				...transaction,
				articulos,
				subTotal,
				iva,
			});
		} else {
			console.log("Cerrar cobrar OK");
			props.onClose(false, false);
		}
	};

	return (
		<div className="POSC">
			<div className="left">
				<div className="header">
					<IconButton
						className="backBtn"
						onClick={() => {
							props.onClose(false, true);
						}}>
						<i className="material-icons">arrow_back</i>
					</IconButton>
					<b>{props.transaction.title}</b>
					<span className="cartLabel">
						Cart <i className="material-icons">shopping_cart</i>
					</span>
				</div>
				<div className="cartList">
					<h3>Servicios</h3>
					<div className="cartServices">
						{servicesInCart.map((service, index) => (
							<li key={index}>
								<div>
									<p>1</p>
								</div>
								<span>{service.description}</span>
								<b className="costo">${service.price}</b>
							</li>
						))}
					</div>
					<h3>Productos</h3>
					<div className="cartProducts">
						{productsInCart.map((product, index) => (
							<li key={index}>
								<div>
									<p>{product.cant}</p>
								</div>
								<span>{product.name}</span>
								<b className="costo">${product.price}</b>
								<b className="costo">${product.total}</b>
							</li>
						))}
					</div>
				</div>
			</div>
			<div className="right">
				<Cobrar onClose={cobrarDone} transaction={props.transaction} />
			</div>
		</div>
	);
}

export default POS;
