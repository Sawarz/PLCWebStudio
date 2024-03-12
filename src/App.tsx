import "./App.css";
import "./Reset.css";
import PLC from "./components/PLC/PLC";
import Header from "./components/Header/Header";
import Scene3D from "./components/Scene3D/Scene3D";
import Variables from "./components/Variables/Variables";

function App() {
	return (
		<div>
			<Header />
			<PLC />
			<Scene3D />
			<Variables />
		</div>
	);
}

export default App;
