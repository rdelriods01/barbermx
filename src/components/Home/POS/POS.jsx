import React from "react";

import "./POS.scss";

function POS(props) {
	console.log(props);
	return (
		<div className="POSC">
			<h1>
				{props.transaction.title} - ${props.transaction.cart?.total}{" "}
			</h1>
		</div>
	);
}

export default POS;
