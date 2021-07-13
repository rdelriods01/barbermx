import React, { useState, useEffect } from "react";
// import { db } from "./index";
import axios from "axios";

export const ServicesContext = React.createContext();
export const ProductsContext = React.createContext();

const Store = ({ children }) => {
	const [services, setServices] = useState([]);

	const products = [
		{
			sku: "1001",
			name: "locion after shave",
			desc: "locion para despues del afeitado",
			price: "60",
		},
		{
			sku: "1002",
			name: "shampoo para caballero",
			desc: "shampoo para el cuidado del cabello",
			price: "30",
		},
		{
			sku: "1003",
			name: "espuma para afeitar",
			desc: "espuma suave para el afeitado",
			price: "25",
		},
		{
			sku: "1004",
			name: "shampoo anticaspa",
			desc: "shampoo anticaspa para caballero",
			price: "40",
		},
		{
			sku: "1005",
			name: "spray para caballero",
			desc: "spray en laca para fijacion del cabello",
			price: "40",
		},
		{
			sku: "1006",
			name: "gel para caballero",
			desc: "gel para el cabello sensacion natural",
			price: "20",
		},
		{
			sku: "1007",
			name: "locion fragancia voyager",
			desc: "locion para caballero",
			price: "100",
		},
		{
			sku: "1008",
			name: "cera para caballero",
			desc: "cera para fijacion del cabello",
			price: "30",
		},
		{
			sku: "1009",
			name: "gel con keratina",
			desc: "gel con keratina para el cuidado del cabello",
			price: "30",
		},
		{
			sku: "1010",
			name: "spray extrafirme",
			desc: "spray en laca para fijación extrema del cabello",
			price: "60",
		},
		{
			sku: "1011",
			name: "colonia extravaganza",
			desc: "colonia para caballero",
			price: "100",
		},
		{
			sku: "1012",
			name: "colonia mystery",
			desc: "colonia para caballero",
			price: "100",
		},
		{
			sku: "1013",
			name: "cera brillo styling",
			desc: "cera para cabello estilo mojado",
			price: "25",
		},
		{
			sku: "1014",
			name: "beard conditioner",
			desc: "acondicionador para cuidado de la barba",
			price: "30",
		},
		{
			sku: "1015",
			name: "crema after shave",
			desc: "crema para despues del afeitado",
			price: "30",
		},
	];

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

	// GET PRODUCTS

	return (
		<ServicesContext.Provider value={services}>
			<ProductsContext.Provider value={products}>
				{children}
			</ProductsContext.Provider>
		</ServicesContext.Provider>
	);
};

export default Store;
