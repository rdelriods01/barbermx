import Agenda from "./components/Agenda/Agenda";
import Home from "./components/Home/Home";
import Database from "./components/Database/Database";
import Catalogo from "./components/Catalogo/Catalogo";
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
	//   {
	//     path: "/clients",
	//     component: Clients,
	//   },
	//   {
	//     path: "/client/:uid",
	//     component: ClientProfile,
	//   },
	{
		path: "/admindb",
		component: Database,
	},
];

export default routes;
