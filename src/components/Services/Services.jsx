import React, { useContext } from "react";
import { ServicesContext } from "../../Store";

function Services() {
	const services = useContext(ServicesContext);
	console.log(services);
	return (
		<div>
			{services &&
				services.map((service) => (
					<p>
						{service.description} <span>${service.price}</span>
					</p>
				))}
		</div>
	);
}

export default Services;
