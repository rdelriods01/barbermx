import React, { useContext, useState } from "react";
import { ServicesContext, ProductsContext } from "../../Store";
import axios from "axios";

import "./Catalogo.scss";
import noimage from "../../assets/noimage.png";

function Catalogo() {
	const { services, setServices } = useContext(ServicesContext);
	const [sDesc, setSDesc] = useState("");
	const [sPrice, setSPrice] = useState("");

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
	const [requiredF, setRequiredF] = useState(false);

	// Services
	const addService = async () => {
		console.log(`se agregó ${sDesc} con el precio ${sPrice} a la BD`);
		await axios.post("http://localhost:4000/api/services", {
			description: sDesc,
			price: sPrice,
		});
		setSDesc("");
		setSPrice("");
		getServices();
	};

	const deleteService = async (serv) => {
		await axios.delete(`http://localhost:4000/api/services/${serv._id}`);
		getServices();
	};

	const getServices = () => {
		axios.get("http://localhost:4000/api/services").then((data) => {
			let myServices = [];
			data.data.forEach((service) => {
				myServices.push(service);
			});
			setServices(myServices);
		});
	};
	// Products
	const addProduct = async () => {
		console.log(`se agregó ${pName} con el precio ${pPrice} a la BD`);
		if (
			pSKU === "" ||
			pName === "" ||
			pDesc === "" ||
			pPrice === "" ||
			pInv === ""
		) {
			setRequiredF(true);
			setTimeout(() => {
				setRequiredF(false);
				console.log("off");
			}, 10000);
		} else {
			await axios.post("http://localhost:4000/api/products", {
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
	const sendDataToEdit = (prod) => {
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
		await axios.put(`http://localhost:4000/api/products/${pID}`, {
			...newProductData,
		});
		resetProdData();
	};

	const resetProdData = () => {
		setEditProductF(false);
		setRequiredF(false);
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
		await axios.delete(`http://localhost:4000/api/products/${prod._id}`);
		getProducts();
	};

	const getProducts = () => {
		axios.get("http://localhost:4000/api/products").then((data) => {
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
							placeholder="Agregar descripción del servicio..."
							onChange={(ev) => setSDesc(ev.target.value.toLowerCase())}
						/>
						<b>Precio</b>

						<input
							type="text"
							value={sPrice}
							placeholder="Fijar precio..."
							onChange={(event) => {
								setSPrice(event.target.value);
							}}
						/>

						<div className="btns">
							<i
								onClick={() => addService()}
								className="material-icons blueBtn">
								add
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
									className={requiredF && pSKU === "" ? "required" : "null"}
									value={pSKU}
									placeholder="Agregar sku..."
									onChange={(ev) => setPSKU(ev.target.value.toLowerCase())}
								/>
								<b>Nombre</b>
								<input
									type="text"
									className={requiredF && pName === "" ? "required" : "null"}
									value={pName}
									placeholder="Agregar nombre..."
									onChange={(ev) => setPName(ev.target.value.toLowerCase())}
								/>
								<b>Precio</b>
								<input
									type="text"
									className={requiredF && pPrice === "" ? "required" : "null"}
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
									className={requiredF && pDesc === "" ? "required" : "null"}
									value={pDesc}
									placeholder="Agregar descripción..."
									onChange={(ev) => setPDesc(ev.target.value.toLowerCase())}
								/>
								<b>Inventario</b>
								<input
									type="text"
									className={requiredF && pInv === "" ? "required" : "null"}
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
								<i
									onClick={() => addProduct()}
									className="material-icons blueBtn">
									add
								</i>
							)}
							<i
								onClick={() => resetProdData()}
								className="material-icons reset">
								cancel
							</i>
						</div>
					</div>
					{requiredF ? (
						<div className="requiredLeyend">
							<span>Revisa que los campos sean correctos</span>
						</div>
					) : null}
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
													onClick={() => sendDataToEdit(product)}>
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
