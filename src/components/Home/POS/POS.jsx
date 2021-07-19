import React from "react";

import { Button, IconButton } from "@material-ui/core";

import "./POS.scss";

function POS(props) {
	console.log(props);

	const { servicesInCart, productsInCart, total } = props.transaction.cart;

	return (
		<div className="POSC">
			<div className="left">
				<div className="header">
					<IconButton
						className="backBtn"
						onClick={() => {
							console.log({ servicesInCart, productsInCart, total });
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
					<h3 className="total"> {`Total: $${total}`} </h3>
					{/* <div className="actionBtns">
						<Button
							className="cancelBtn"
							color="primary"
							variant="contained"
							onClick={() => {
								console.log({ servicesInCart, productsInCart, total });
								props.onClose(false, true);
							}}>
							Atras
						</Button>
						<Button
							className="cancelBtn"
							onClick={() => {
								console.log({ servicesInCart, productsInCart, total });
								props.onClose(false);
							}}>
							Cancelar
						</Button>
						<Button
							variant="contained"
							className="cobrarBtn"
							disabled={total === 0}
							onClick={() => {
								console.log({ servicesInCart, productsInCart, total });
								props.onClose({ servicesInCart, productsInCart, total });
							}}>
							Cobrar
						</Button>
					</div> */}
				</div>
			</div>
		</div>
	);
}

export default POS;
