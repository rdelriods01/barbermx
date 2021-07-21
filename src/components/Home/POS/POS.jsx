import React from "react";

import { Button, IconButton } from "@material-ui/core";

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

	const cobrarDone = (done, transaction) => {
		console.log(done, transaction);
		if (done) {
			console.log(transaction);
			props.onClose(false, false, { ...props.transaction, ...transaction });
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
					{/* <div className="actionBtns">
						
						<Button
							className="cancelBtn"
							onClick={() => {
								console.log({ servicesInCart, productsInCart, total });
								props.onClose(false);
							}}>
							Cancelar
						</Button>
					</div> */}
				</div>
			</div>
			<div className="right">
				<Cobrar onClose={cobrarDone} transaction={props.transaction} />
			</div>
		</div>
	);
}

export default POS;
