import Agenda from "./components/Agenda/Agenda";
import Home from "./components/Home/Home";
import Services from "./components/Services/Services";
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
		path: "/services",
		component: Services,
	},
	//   {
	//     path: "/clients",
	//     component: Clients,
	//   },
	//   {
	//     path: "/client/:uid",
	//     component: ClientProfile,
	//   },
	//   {
	//     path: "/admindb",
	//     component: Contabilidad,
	//   },
];

export default routes;
