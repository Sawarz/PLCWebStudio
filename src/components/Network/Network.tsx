import { useState } from "react";
import Contact from "../PLCElements/Contact/Contact";
import Coil from "../PLCElements/Coil/Coil";
import styles from "./Network.module.css";
import Wire from "../PLCElements/Wire/Wire";

type Props = {
	id: string;
	deleteNetwork: Function;
};

export default function Network({ id, deleteNetwork }: Props) {
	const [PLCData, setPLCData] = useState([
		{
			element: "coil",
			on: true,
		},
		{
			element: "contact",
		},
		{
			element: "coil",
			on: false,
		},
	]);

	function handleCoilClick(i: number) {
		const newPLCData = [...PLCData];
		newPLCData[i].on = !newPLCData[i].on;
		setPLCData(newPLCData);
	}

	return (
		<div>
			<div className={styles.elements}>
				<Wire on={PLCData[0]?.on} />
				{PLCData.map(({ element, on }, i) => {
					if (element === "coil") {
						return (
							<>
								<Coil
									on={on}
									onClick={() => handleCoilClick(i)}
								/>
								<Wire on={PLCData[i]?.on} />
							</>
						);
					}

					if (element === "contact") {
						return (
							<>
								<Contact on={PLCData[i - 1].on} />
								<Wire on={PLCData[i - 1]?.on} />
							</>
						);
					}
				})}
			</div>
			<button onClick={() => deleteNetwork(id)}>X</button>
		</div>
	);
}
