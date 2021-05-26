import React, { useState, useEffect } from "react";
// import { db } from "./index";
import axios from "axios";

export const ServicesContext = React.createContext();

const Store = ({ children }) => {
	const [services, setServices] = useState([]);

	useEffect(() => {
		getServices();
	}, []);

	// GET SERVICES
	function getServices() {
		axios.get("http://localhost:4000/api/services").then((data) => {
			let myServices = [];
			data.data.forEach((service) => {
				myServices.push(service);
			});
			setServices(myServices);
		});
	}

	return (
		<ServicesContext.Provider value={services}>
			{children}
		</ServicesContext.Provider>
	);
};

export default Store;
