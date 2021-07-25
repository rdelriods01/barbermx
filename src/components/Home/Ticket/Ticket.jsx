import React from "react";
import { format } from "date-fns";
import logoBarber from "../../../assets/pp_default.svg";

import "./Ticket.scss";

function Ticket(props) {
	console.log(props);
	const barbers = ["", "Barber 1", "Barber 2", "Barber 3", "Barber 4"];

	return (
		<div className="TicketC">
			<button>
				<i className="material-icons">print</i>
			</button>
			<div className="logo">
				<img src={logoBarber} alt="logo" />
			</div>
			<div className="misDatos">
				<p>
					<strong>Barber Shop</strong>
				</p>
				<p>BSXX830507L23</p>
				<p>Calzada del Valle 169 Pte L5</p>
				<p>Col. del Valle C.P. 66020</p>
				<p>San Pedro Garza García, N.L.</p>
				<p>Tel. 8378 1111 / 8676 2222</p>
				<p>www.barbershopmonterrey.com.mx</p>
			</div>
			<div className="datosSuperior">
				<p>
					<strong>Fecha:</strong>{" "}
					{format(props.transaction.start, "dd-MM-yyyy HH:mm")}
				</p>
				<p>
					<strong>Folio:</strong> {props.transaction.ticket}{" "}
				</p>
				<p>
					<strong>Le atendió:</strong> {barbers[props.transaction.resourceId]}{" "}
				</p>
			</div>
			<div className="datosCliente">
				<span>{props.transaction.title} </span>
			</div>
			<div className="gridElements">
				<div className="headers">
					<span>
						<strong>Cant.</strong>
					</span>
					<span>
						<strong>Desc.</strong>
					</span>
					<span>
						<strong>Unit.</strong>
					</span>
					<span>
						<strong>Total</strong>
					</span>
				</div>
				<b>Servicios</b>

				<div className="cartServices">
					{props.transaction.cart.servicesInCart.map((service, index) => (
						<li key={index}>
							<div>
								<p>1</p>
							</div>
							<span>{service.description}</span>
							<span>${service.price}</span>
							<b className="costo">${service.price}</b>
						</li>
					))}
				</div>
				<b>Productos</b>
				<div className="cartProducts">
					{props.transaction.cart.productsInCart.map((product, index) => (
						<li key={index}>
							<div>
								<p>{product.cant}</p>
							</div>
							<span>{product.name}</span>
							<span>${product.price}</span>
							<b className="costo">${product.total}</b>
						</li>
					))}
				</div>
			</div>
			<div className="datosInferior">
				<span>
					Articulos: <strong>{props.transaction.articulos} </strong>{" "}
				</span>
				<div></div>
				<span>Sub-total:</span>
				<strong>${props.transaction.subTotal} </strong>
				<span>I.V.A.:</span>
				<strong>${props.transaction.iva} </strong>
				<span className="total">TOTAL:</span>
				<strong className="total">${props.transaction.cart.total} </strong>
			</div>
			<div className="pago">
				<p>Forma de Pago</p>
				{props.transaction.formaDePago === "tarjeta" ? (
					<div className="tarjeta">
						{props.transaction.tipoDeTarjeta === "visamastercard" ? (
							<>
								<span>Visa / Mastercard</span>
								<span>XXXX-XXXX-XXXX-{props.transaction.digitos}</span>
								<span>Autorización: {props.transaction.autorizacion}</span>
							</>
						) : (
							<>
								<span>Amex</span>
								<span>XXXX-XXXXXX-X{props.transaction.digitos}</span>
								<span>Autorización: {props.transaction.autorizacion}</span>
							</>
						)}
					</div>
				) : (
					<div className="efectivo">
						<span>Efectivo: ${props.transaction.pagacon}</span>
						<span>Cambio: ${props.transaction.cambio}</span>
					</div>
				)}
				{/* <div *ngIf="recibo.formadepago=='tarjeta'" class="tarjeta">
                    <div *ngIf="recibo.tipodetarjeta=='visamastercard'">
                        <span> Visa / MasterCard</span>
                        <br>
                        <span> XXXX-XXXX-XXXX-{{recibo.digitos}} </span> 
                    </div>
                    <div *ngIf="recibo.tipodetarjeta=='amex'">
                        <span> AMEX </span>
                        <br>
                        <span> XXXX-XXXXXX-X{{recibo.digitos}} </span>
                    </div>
                    <span>Autorización: {{recibo.autorizacion}} </span>
                </div>
                <div *ngIf="recibo.formadepago=='efectivo'" class="efectivo">
                    <span> Efectivo: ${{recibo.efectivo}}</span>
                    <br>
                    <span>Cambio: ${{recibo.cambio}}</span>
                </div> */}
			</div>
			<div className="footer">
				<p>Gracias por su preferencia!</p>
			</div>
		</div>
	);
}

export default Ticket;
