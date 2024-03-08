import "./App.css";
import PLC from "./components/PLC/PLC";
import Header from "./components/Header/Header";
import Scene3D from "./components/Scene3D/Scene3D";

function App() {
	return (
		<div>
			<Header />
			<PLC />
			<Scene3D />
		</div>
	);
}

export default App;
