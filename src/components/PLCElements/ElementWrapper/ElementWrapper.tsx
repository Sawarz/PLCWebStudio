import { MouseEventHandler, useState } from "react";
import { useNetworksStore } from "@/stores/NetworksStore";
import ElementRenderer from "../ElementRenderer/ElementRenderer";
import styles from "./ElementWrapper.module.css";
import { ElementType } from "@/types/ElementEnum";

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

	const { type } = element;

	return (
		<div
			className={styles.elementWrapper}
			onClick={type !== ElementType.Wire ? onClick : undefined}
			style={{ cursor: type !== ElementType.Wire ? "pointer" : "auto" }}
		>
			<div className={styles.variable}>{variable}</div>
			<ElementRenderer element={element} />
		</div>
	);
}
