import { MouseEventHandler } from "react";
import styles from "./Coil.module.css";
import { useNetworksStore } from "@/stores/NetworksStore";
import { useState } from "react";

type Props = {
	on: boolean | undefined;
	onClick: MouseEventHandler;
	id: string;
};

export default function Coil({ on, onClick, id }: Props) {
	const [variable, setVariable] = useState();
	const { networksData } = useNetworksStore((state: any) => state);
	const networkData = networksData.find(({ elements }: { elements: [] }) =>
		elements.find(({ id: elementId }: { id: string }) => elementId === id)
	);

	if (networkData) {
		const { variableName } = networkData.elements.find(
			({ id: elementId }: { id: string }) => elementId === id
		);

		if (variableName !== variable) {
			setVariable(variableName);
		}
	}

	return (
		<div
			className={styles.container}
			style={{ top: variable ? "-15px" : "0" }}
		>
			<div className={styles.variableName}>{variable}</div>
			<div
				style={{ borderColor: on ? "green" : "white" }}
				className={styles.coil}
				onClick={onClick}
			/>
		</div>
	);
}
