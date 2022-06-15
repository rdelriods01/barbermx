import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./PatientsList.scss";

function PatientsList() {
	const [patients, setPatients] = useState([]);

	useEffect(() => {
		getPatients();
	}, []);

	const getPatients = async () => {
		await axios.get("http://localhost:4000/api/clients").then((data) => {
			console.log(data.data);
			setPatients(data.data);
		});
	};

	return (
		<div className="patientListC">
			{patients &&
				patients.map((patient, index) => (
					<Link
						to={{ pathname: `/clients/${patient._id}` }}
						className="patientElement">
						<span> {patient.name} </span>
					</Link>
				))}
		</div>
	);
}

export default PatientsList;
