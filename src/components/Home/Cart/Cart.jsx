import { useState, useContext } from "react";
import SwipeableViews from "react-swipeable-views";

import { Tabs, Paper, Tab } from "@material-ui/core";

import { ServicesContext, ProductsContext } from "../../../Store";
import noimage from "../../../assets/noimage.png";

import "./Cart.scss";

function Cart(props) {
	const [tabsValue, setTabsValue] = useState(0);
	const services = useContext(ServicesContext);
	const products = useContext(ProductsContext);

	const handleTabChange = (event, newValue) => {
		setTabsValue(newValue);
	};
	const handleTabChangeIndex = (index) => {
		setTabsValue(index);
	};

	console.log(props);
	return (
		<div className="CartC">
			<div className="gridCart">
				<div className="left">
					<SwipeableViews
						axis={"x"}
						className="swipeableViews"
						index={tabsValue}
						onChangeIndex={handleTabChangeIndex}>
						<div value={tabsValue} index={0} className="productsView">
							<div className="searchBarProducts searchBar">
								<input
									autoFocus
									type="search"
									placeholder="Buscar productos..."
								/>
							</div>
							<div className="productsList">
								{products.map((product, index) => (
									<div key={index} className="demoProduct">
										<img src={noimage} alt="noImg" />
										<span> {product.name}</span>
										<b>${product.price}</b>
									</div>
								))}
							</div>
						</div>
						<div value={tabsValue} index={1} className="servicesView">
							<div className="searchBarServices searchBar">
								<input type="search" placeholder="Buscar servicios..." />
							</div>
							<div className="servicesList">
								{services.map((service, index) => (
									<li
										key={index}
										// value={service.desc}
										// onClick={() => {
										// 	handleService(service, index);
										// }}
									>
										<div>
											<i className="material-icons">content_cut</i>
										</div>
										<span>{service.description}</span>
										<span className="costo">${service.price}</span>
									</li>
								))}
							</div>
						</div>
					</SwipeableViews>
					<Paper square className="tabsFooter">
						<Tabs
							value={tabsValue}
							onChange={handleTabChange}
							variant="fullWidth"
							indicatorColor="primary"
							textColor="primary"
							aria-label="icon label tabs example">
							<Tab
								icon={<i className="material-icons">shopping_basket</i>}
								label="Productos"
							/>
							<Tab
								icon={<i className="material-icons">content_cut</i>}
								label="Servicios"
							/>
						</Tabs>
					</Paper>
				</div>
				<div className="right">
					<div className="header">
						<b>{props.transaction.title}</b>
						<b>-</b>
						<span>
							Cart <i className="material-icons">shopping_cart</i>
						</span>
					</div>
					<div className="cartList">
						<div className="cartServices">
							<h3>Servicios</h3>
							{props?.transaction?.service.map((service, index) => (
								<li
									key={index}
									// value={service.desc}
									// onClick={() => {
									// 	handleService(service, index);
									// }}
								>
									<span>{service.description}</span>
									<span className="costo">${service.price}</span>
								</li>
							))}
						</div>
						<div className="cartProducts">
							<h3>Productos</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Cart;
