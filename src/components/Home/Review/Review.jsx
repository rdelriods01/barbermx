import React from "react";

import { Button } from "@material-ui/core";

function Review(props) {
	console.log(props);

	return (
		<div className="reviewC">
			<div className="title">Review of {props.transaction.title}</div>
			<div className="actionsBtn">
				<Button
					className="backToTodayData"
					variant="contained"
					color="primary"
					onClick={() => props.onClose(false, true, false)}>
					<i className="material-icons">arrow_back</i>
				</Button>
				<Button
					variant="contained"
					color="primary"
					onClick={() =>
						props.onClose(false, false, true, { ...props.transaction })
					}>
					to Menu
				</Button>
			</div>
		</div>
	);
}

export default Review;
