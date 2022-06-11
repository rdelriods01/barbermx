import Agenda from "./components/Agenda/Agenda";
import Home from "./components/Home/Home";
import Database from "./components/Database/Database";
import Catalogo from "./components/Catalogo/Catalogo";
import PatientList from "./components/Patients/PatientsList";
import PatientProfile from "./components/Patients/PatientProfile";
// import Venta from "./components/Venta/Venta";

const routes = [
	{
		path: "/",
		component: Home,
	},
	{
		path: "/agenda",
		component: Agenda,
	},
	{
		path: "/catalogue",
		component: Catalogo,
	},
	{
		path: "/clients",
		component: PatientList,
	},
	{
		path: "/clients/:uid",
		component: PatientProfile,
	},
	{
		path: "/admindb",
		component: Database,
	},
];

export default routes;
