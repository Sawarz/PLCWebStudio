import { MouseEventHandler, useState } from "react";
import { useNetworksStore } from "@/stores/NetworksStore";
import ElementRenderer from "../ElementRenderer/ElementRenderer";
import styles from "./ElementWrapper.module.css";

type Props = {
	id: string;
	onClick: MouseEventHandler;
};

export default function ElementWrapper({ id, onClick }: Props) {
	const [variable, setVariable] = useState();
	const { networksData } = useNetworksStore((state: any) => state);
	const networkData = networksData.find(({ elements }: { elements: [] }) =>
		elements.find(({ id: elementId }: { id: string }) => elementId === id)
	);

	const element = networkData.elements.find(
		({ id: elementId }: { id: string }) => elementId === id
	);

	if (networkData) {
		const { variableName } = element;

		if (variableName !== variable) {
			setVariable(variableName);
		}
	}

	return (
		<div
			className={styles.elementWrapper}
			onClick={onClick}
		>
			<div className={styles.variable}>{variable}</div>
			<ElementRenderer element={element} />
		</div>
	);
}
