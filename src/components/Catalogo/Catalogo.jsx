import React, { useContext, useState } from "react";
import { ServicesContext, ProductsContext } from "../../Store";
import axios from "axios";

import "./Catalogo.scss";
import noimage from "../../assets/noimage.png";

function Catalogo() {
	const { services, setServices } = useContext(ServicesContext);
	const [sID, setSID] = useState("");
	const [sDesc, setSDesc] = useState("");
	const [sPrice, setSPrice] = useState("");
	const [editServiceF, setEditServiceF] = useState(false);
	const [requiredServF, setRequiredServF] = useState(false);

	const { products, setProducts } = useContext(ProductsContext);
	const [pID, setPID] = useState("");
	const [pSKU, setPSKU] = useState("");
	const [pName, setPName] = useState("");
	const [pDesc, setPDesc] = useState("");
	const [pPrice, setPPrice] = useState("");
	const [pInv, setPInv] = useState("");
	const [pPhoto, setPPhoto] = useState("");
	const [gridView, setGridView] = useState(false);
	const [editProductF, setEditProductF] = useState(false);
	const [requiredProdF, setRequiredProdF] = useState(false);

	// Services
	const addService = async () => {
		if (sDesc === "" || sPrice === "") {
			setRequiredServF(true);
			setTimeout(() => {
				setRequiredServF(false);
				console.log("off");
			}, 10000);
		} else {
			await axios.post("http://192.168.100.17:4000/api/services", {
				description: sDesc,
				price: sPrice,
			});
			resetServData();
			getServices();
		}
	};

	const deleteService = async (serv) => {
		await axios.delete(`http://192.168.100.17:4000/api/services/${serv._id}`);
		getServices();
	};

	const getServices = () => {
		axios.get("http://192.168.100.17:4000/api/services").then((data) => {
			let myServices = [];
			data.data.forEach((service) => {
				myServices.push(service);
			});
			setServices(myServices);
		});
	};

	const sendServiceToEdit = (serv) => {
		console.log(serv);
		setEditServiceF(true);
		setSID(serv._id);
		setSDesc(serv.description);
		setSPrice(serv.price);
	};

	const editService = async () => {
		let newServiceData = {
			description: sDesc,
			price: sPrice,
		};
		await axios.put(`http://192.168.100.17:4000/api/services/${sID}`, {
			...newServiceData,
		});
		resetServData();
	};

	const resetServData = () => {
		setEditServiceF(false);
		setRequiredServF(false);
		setSID("");
		setSDesc("");
		setSPrice("");
		getServices();
	};
	// Products
	const addProduct = async () => {
		if (
			pSKU === "" ||
			pName === "" ||
			pDesc === "" ||
			pPrice === "" ||
			pInv === ""
		) {
			setRequiredProdF(true);
			setTimeout(() => {
				setRequiredProdF(false);
				console.log("off");
			}, 10000);
		} else {
			await axios.post("http://192.168.100.17:4000/api/products", {
				sku: pSKU,
				name: pName,
				description: pDesc,
				price: pPrice,
				inv: pInv,
				photo: pPhoto,
			});
			resetProdData();
		}
	};

	const sendProductToEdit = (prod) => {
		console.log(prod);
		setEditProductF(true);
		setPID(prod._id);
		setPSKU(prod.sku);
		setPName(prod.name);
		setPPrice(prod.price);
		setPDesc(prod.description);
		setPInv(prod.inv);
		setPPhoto(prod.photo);
	};

	const editProduct = async () => {
		let newProductData = {
			sku: pSKU,
			name: pName,
			price: pPrice,
			description: pDesc,
			inv: pInv,
			photo: pPhoto,
		};
		await axios.put(`http://192.168.100.17:4000/api/products/${pID}`, {
			...newProductData,
		});
		resetProdData();
	};

	const resetProdData = () => {
		setEditProductF(false);
		setRequiredProdF(false);
		setPID("");
		setPSKU("");
		setPName("");
		setPPrice("");
		setPDesc("");
		setPInv("");
		setPPhoto("");
		getProducts();
	};

	const deleteProduct = async (prod) => {
		await axios.delete(`http://192.168.100.17:4000/api/products/${prod._id}`);
		getProducts();
	};

	const getProducts = () => {
		axios.get("http://192.168.100.17:4000/api/products").then((data) => {
			let myProducts = [];
			data.data.forEach((product) => {
				myProducts.push(product);
			});
			setProducts(myProducts);
		});
	};

	const toggleProductsView = () => {
		gridView ? setGridView(false) : setGridView(true);
	};

	return (
		<div className="CatalogoC">
			{requiredProdF ? (
				<div className="notification">
					<span>Revisa que los campos sean correctos</span>
				</div>
			) : null}
			{requiredServF ? (
				<div className="notification">
					<span>Revisa que los campos sean correctos</span>
				</div>
			) : null}
			<div className="superior">
				<h2>
					<i className="material-icons">apps</i> Catálogo
				</h2>
			</div>
			<div className="grid">
				<h3>Servicios</h3>
				<h3>Productos</h3>
				<div className="services">
					<div className="servSuperior">
						<b>Descripción</b>
						<input
							type="text"
							value={sDesc}
							className={requiredServF && sDesc === "" ? "required" : "null"}
							placeholder="Agregar descripción del servicio..."
							onChange={(ev) => setSDesc(ev.target.value.toLowerCase())}
						/>
						<b>Precio</b>

						<input
							type="text"
							value={sPrice}
							className={requiredServF && sPrice === "" ? "required" : "null"}
							placeholder="Fijar precio..."
							onChange={(event) => {
								setSPrice(event.target.value);
							}}
						/>

						<div className="btns">
							{editServiceF ? (
								<i
									onClick={() => editService()}
									className="material-icons blueBtn">
									done
								</i>
							) : (
								<i
									onClick={() => addService()}
									className="material-icons blueBtn">
									add
								</i>
							)}
							<i
								onClick={() => resetServData()}
								className="material-icons reset">
								cancel
							</i>
						</div>
					</div>
					<div className="servInferior">
						{services &&
							services.length > 0 &&
							services.map((service, index) => (
								<div className="row" key={index}>
									<span className="descripcion">{service.description}</span>
									<span>${service.price}</span>
									<div className="btns">
										<i
											className="material-icons delete"
											onClick={() => deleteService(service)}>
											delete
										</i>
										<i
											className="material-icons"
											onClick={() => sendServiceToEdit(service)}>
											edit
										</i>
									</div>
								</div>
							))}
					</div>
				</div>
				<div className="products">
					<div className="prodSuperior">
						<div className="prows">
							<div className="row1">
								<b>SKU</b>
								<input
									type="text"
									className={requiredProdF && pSKU === "" ? "required" : "null"}
									value={pSKU}
									placeholder="Agregar sku..."
									onChange={(ev) => setPSKU(ev.target.value.toLowerCase())}
								/>
								<b>Nombre</b>
								<input
									type="text"
									className={
										requiredProdF && pName === "" ? "required" : "null"
									}
									value={pName}
									placeholder="Agregar nombre..."
									onChange={(ev) => setPName(ev.target.value.toLowerCase())}
								/>
								<b>Precio</b>
								<input
									type="text"
									className={
										requiredProdF && pPrice === "" ? "required" : "null"
									}
									value={pPrice}
									placeholder="Fijar precio..."
									onChange={(event) => {
										setPPrice(event.target.value);
									}}
								/>
							</div>
							<div className="row2">
								<b>Descripción</b>
								<input
									type="text"
									className={
										requiredProdF && pDesc === "" ? "required" : "null"
									}
									value={pDesc}
									placeholder="Agregar descripción..."
									onChange={(ev) => setPDesc(ev.target.value.toLowerCase())}
								/>
								<b>Inventario</b>
								<input
									type="text"
									className={requiredProdF && pInv === "" ? "required" : "null"}
									value={pInv}
									placeholder="Agregar cantidad inicial..."
									onChange={(ev) => setPInv(ev.target.value)}
								/>
								<b>Foto</b>
								<input
									type="text"
									value={pPhoto}
									placeholder="Agregar foto..."
									onChange={(ev) => setPPhoto(ev.target.value.toLowerCase())}
								/>
							</div>
						</div>
						<div className="btns">
							{editProductF ? (
								<i
									onClick={() => editProduct()}
									className="material-icons blueBtn">
									done
								</i>
							) : (
								<>
									<i
										onClick={() => addProduct()}
										className="material-icons blueBtn">
										add
									</i>
									<i
										onClick={() => console.log(`searching ${pSKU} ${pName}`)}
										className="material-icons blueBtn">
										search
									</i>
								</>
							)}
							<i
								onClick={() => resetProdData()}
								className="material-icons reset">
								cancel
							</i>
						</div>
					</div>

					<div className="productsSettings">
						<div className="leyend">
							Vista {gridView ? "cuadriculada" : "de lista"}
						</div>
						<div className="btns">
							<i
								onClick={() => toggleProductsView()}
								className="material-icons">
								{gridView ? "grid_view" : "view_list"}
							</i>
						</div>
					</div>
					<div className={gridView ? "productInfGrid" : "prodInferior"}>
						{products &&
							products.length > 0 &&
							products.map((product, index) =>
								gridView ? (
									<div key={index} className="productInGrid">
										<img
											src={product.photo ? product.photo : noimage}
											alt="noImg"
										/>
										<span> {product.name}</span>
										<b>${product.price}</b>
									</div>
								) : (
									<>
										<div
											className={pID === product._id ? "row editing" : "row"}
											key={index}>
											<span>{product.sku}</span>
											<span className="descripcion">{product.name}</span>
											<span className="descripcion">{product.description}</span>
											<span>${product.price}</span>
											<span>{product.inv}</span>
											<img
												src={product.photo ? product.photo : noimage}
												alt="noImg"
											/>
											<div className="btns">
												<i
													className="material-icons delete"
													onClick={() => deleteProduct(product)}>
													delete
												</i>
												<i
													className="material-icons"
													onClick={() => sendProductToEdit(product)}>
													edit
												</i>
											</div>
										</div>
									</>
								)
							)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Catalogo;
