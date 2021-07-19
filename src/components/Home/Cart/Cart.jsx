import { useState, useContext, useEffect } from "react";
import SwipeableViews from "react-swipeable-views";

import { Tabs, Paper, Tab, Button } from "@material-ui/core";

import { ServicesContext, ProductsContext } from "../../../Store";
import noimage from "../../../assets/noimage.png";

import "./Cart.scss";

function Cart(props) {
	const [tabsValue, setTabsValue] = useState(0);
	const productsDB = useContext(ProductsContext);
	const servicesDB = useContext(ServicesContext);

	const [products, setProducts] = useState([...productsDB]);
	const [services, setServices] = useState([...servicesDB]);

	const [productsInCart, setProductsInCart] = useState([]);
	const [servicesInCart, setServicesInCart] = useState([
		...props.transaction.service,
	]);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		getTotal();
	}, [servicesInCart, productsInCart]);

	const handleTabChange = (event, newValue) => {
		setTabsValue(newValue);
	};
	const handleTabChangeIndex = (index) => {
		setTabsValue(index);
	};

	const searchProducts = async (v) => {
		if (v) {
			if (v.length > 2) {
				let myProducts = await filterByProperty(productsDB, "name", v);
				setProducts(myProducts);
			} else {
				setProducts(productsDB);
			}
		}
	};
	const searchServices = async (v) => {
		if (v) {
			if (v.length > 2) {
				let myProducts = await filterByProperty(servicesDB, "description", v);
				setServices(myProducts);
			} else {
				setServices(servicesDB);
			}
		}
	};

	const filterByProperty = (array, prop, value) => {
		var filtered = [];
		for (var i = 0; i < array.length; i++) {
			var obj = array[i];
			if (obj[prop].indexOf(value) >= 0) {
				filtered.push(obj);
			}
		}
		return filtered;
	};

	const addServiceToCart = (serv) => {
		let arr = [...servicesInCart];
		let alreadyAdded = false;
		arr.find((o, i) => {
			if (o.description === serv.description) {
				alreadyAdded = true;
				return true; // stop searching
			}
		});
		if (alreadyAdded) {
			setServicesInCart(arr);
		} else {
			arr.push(serv);
			setServicesInCart(arr);
		}
	};
	const addProductToCart = (prod) => {
		let arr = [...productsInCart];
		let find = arr.find((o, i) => {
			if (o.name === prod.name) {
				let newCant = o.cant + 1;
				let newTotal = o.price * newCant;
				arr[i] = { ...prod, cant: newCant, total: newTotal };
				setProductsInCart(arr);
				return true; // stop searching
			}
		});
		if (!find) {
			arr.push({ ...prod, cant: 1, total: Number(prod.price) });
			setProductsInCart(arr);
		}
	};

	const deleteServiceFromCart = (serv) => {
		let arr = [...servicesInCart];
		arr.find((o, i) => {
			if (o.description === serv.description) {
				arr.splice(i, 1);
				return true; // stop searching
			}
		});
		setServicesInCart(arr);
	};

	const deleteProductFromCart = (prod) => {
		let arr = [...productsInCart];
		arr.find((o, i) => {
			if (o.name === prod.name) {
				if (o.cant === 1) {
					arr.splice(i, 1);
				} else {
					let newCant = o.cant - 1;
					let newTotal = o.price * newCant;
					arr[i] = { ...prod, cant: newCant, total: newTotal };
				}
				setProductsInCart(arr);
				return true; // stop searching
			}
		});
	};

	const getTotal = () => {
		let sum = 0;
		for (let i = 0; i < servicesInCart.length; i++) {
			sum = sum + Number(servicesInCart[i].price);
		}
		for (let i = 0; i < productsInCart.length; i++) {
			sum = sum + Number(productsInCart[i].total);
		}
		setTotal(sum);
	};

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
									onChange={(ev) =>
										searchProducts(ev.target.value.toLowerCase())
									}
								/>
							</div>
							<div className="productsList">
								{products.map((product, index) => (
									<div
										key={index}
										className="demoProduct"
										onClick={() => {
											addProductToCart(product);
										}}>
										<img src={noimage} alt="noImg" />
										<span> {product.name}</span>
										<b>${product.price}</b>
									</div>
								))}
							</div>
						</div>
						<div value={tabsValue} index={1} className="servicesView">
							<div className="searchBarServices searchBar">
								<input
									type="search"
									placeholder="Buscar servicios..."
									onChange={(ev) =>
										searchServices(ev.target.value.toLowerCase())
									}
								/>
							</div>
							<div className="servicesList">
								{services.map((service, index) => (
									<li
										key={index}
										onClick={() => {
											addServiceToCart(service);
										}}>
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
						<h3>Servicios</h3>
						<div className="cartServices">
							{servicesInCart.map((service, index) => (
								<li key={index}>
									<div>
										<i
											className="material-icons"
											onClick={() => deleteServiceFromCart(service)}>
											delete
										</i>
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
										<i
											className="material-icons"
											onClick={() => deleteProductFromCart(product)}>
											{product.cant === 1 ? "delete" : "remove"}
										</i>
										<p>{product.cant}</p>
										<i
											className="material-icons add"
											onClick={() => addProductToCart(product)}>
											add
										</i>
									</div>
									<span>{product.name}</span>
									<b className="costo">${product.price}</b>
									<b className="costo">${product.total}</b>
								</li>
							))}
						</div>
						<h3 className="total"> {`Total: $${total}`} </h3>
						<div className="actionBtns">
							<Button
								className="cancelBtn"
								onClick={() => {
									console.log({ servicesInCart, productsInCart, total });
									props.onClose(false);
								}}>
								Cancel
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
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Cart;
