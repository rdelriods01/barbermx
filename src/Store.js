import React, { useState, useEffect } from "react";
// import { db } from "./index";
import axios from "axios";

export const ServicesContext = React.createContext();

const Store = ({ children }) => {
	const [services, setServices] = useState([]);

	useEffect(() => {
		console.log("services from Store");
		console.log(services);
	}, [services]);

	useEffect(() => {
		getServices();
	}, []);

	// GET SERVICES
	function getServices() {
		axios.get("http://localhost:4000/api/services").then((data) => {
			let myServices = [];
			console.log(data);
			data.data.forEach((service) => {
				console.log(service);
				myServices.push(service);
			});
			console.log("Read services from DB");
			console.log(myServices);
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
