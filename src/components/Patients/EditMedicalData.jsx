import { useState } from "react";
import axios from "axios";

import { Button } from "@material-ui/core";
import "./EditMedicalData.scss";

function EditMedicalData(props) {
	console.log(props);

	const [reason, setReason] = useState(props.data.reason);
	const [conditions, setConditions] = useState(props.data.conditions);
	const [illness, setIllness] = useState(props.data.illness);
	const [allergies, setAllergies] = useState(props.data.allergies);
	const [notIncluded, setNotIncluded] = useState(props.data.notIncluded);
	const [waterConsumption, setWaterConsumption] = useState(
		props.data.waterConsumption
	);
	const [exercise, setExercise] = useState(props.data.exercise);
	const [comments, setComments] = useState(props.data.comments);

	const handleSubmit = async (ev) => {
		ev.preventDefault();
		let newPatientData = {
			medicalHistory: {
				reason,
				conditions,
				illness,
				allergies,
				notIncluded,
				waterConsumption,
				exercise,
				comments,
			},
		};
		await axios
			.put(
				`http://localhost:4000/api/clients/${props.patientId}`,
				newPatientData
			)
			.then(async (response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
		props.onClose();
	};

	return (
		<div className="editMedicalDataC">
			<h3>Editar historia clínica</h3>
			<form onSubmit={handleSubmit} className="editMedicalDataForm">
				<div className="inputs">
					<div className="leftData">
						<div className="reason">
							<b>Motivo de la consulta</b>
							<textarea
								rows={3}
								value={reason}
								autoFocus
								placeholder="Motivo de la consulta..."
								onChange={(ev) => setReason(ev.target.value)}
							/>
						</div>
						<div className="conditions">
							<b>Enfermedades</b>
							<textarea
								rows={3}
								value={conditions}
								placeholder="Enfermedades..."
								onChange={(ev) => setConditions(ev.target.value)}
							/>
						</div>
						<div className="illness">
							<b>Malestares</b>
							<textarea
								rows={3}
								value={illness}
								placeholder="Malestares..."
								onChange={(ev) => setIllness(ev.target.value)}
							/>
						</div>
						<div className="allergies">
							<b>Alergias</b>
							<textarea
								rows={3}
								value={allergies}
								placeholder="Alergias..."
								onChange={(ev) => setAllergies(ev.target.value)}
							/>
						</div>
					</div>
					<div className="rightData">
						<div className="notIncluded">
							<b>No incluir en la dieta</b>
							<textarea
								rows={3}
								value={notIncluded}
								placeholder="No incluir en la dieta..."
								onChange={(ev) => setNotIncluded(ev.target.value)}
							/>
						</div>
						<div className="waterConsumption">
							<b>Ingesta de agua</b>
							<textarea
								rows={3}
								value={waterConsumption}
								placeholder="Ingesta de agua..."
								onChange={(ev) => setWaterConsumption(ev.target.value)}
							/>
						</div>
						<div className="exercise">
							<b>Ejercicio</b>
							<textarea
								rows={3}
								value={exercise}
								placeholder="Ejercicio..."
								onChange={(ev) => setExercise(ev.target.value)}
							/>
						</div>
						<div className="comments">
							<b>Observaciones</b>
							<textarea
								rows={3}
								value={comments}
								placeholder="Observaciones..."
								onChange={(ev) => setComments(ev.target.value)}
							/>
						</div>
					</div>
				</div>
				<Button
					className="submitBtn"
					type="submit"
					variant="contained"
					color="primary">
					Editar
				</Button>
			</form>
		</div>
	);
}

export default EditMedicalData;
