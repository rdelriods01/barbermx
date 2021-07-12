import React from "react";

import "./Cart.scss";

function Cart(props) {
	console.log(props);
	return (
		<div className="CartC">
			<h1>{props.transaction.title}</h1>
			<p>Cart</p>
		</div>
	);
}

export default Cart;
