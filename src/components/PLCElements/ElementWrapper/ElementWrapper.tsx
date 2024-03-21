import React, { MouseEventHandler, useState, useEffect } from "react";
import { useNetworksStore } from "@/stores/NetworksStore";
import ElementRenderer from "../ElementRenderer/ElementRenderer";
import styles from "./ElementWrapper.module.css";
import { ElementType } from "@/types/ElementEnum";
import useDebounce from "@/util/useDebounce";

type Props = {
	id: string;
	onClick: MouseEventHandler;
};

export default function ElementWrapper({ id, onClick }: Props) {
	const [variable, setVariable] = useState("???");
	const debouncedVariable = useDebounce(variable, 500);
	const { networksData, modifyElement } = useNetworksStore(
		(state: any) => state
	);
	const networkData = networksData.find(({ elements }: { elements: [] }) =>
		elements.find(({ id: elementId }: { id: string }) => elementId === id)
	);
	const element = networkData.elements.find(
		({ id: elementId }: { id: string }) => elementId === id
	);

	const { variableName, type } = element;

	function handleInputBlur(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.value === "") {
			console.log(e.target.value);
			setVariable("???");
		}
	}

	function handleInputClick(e: React.MouseEvent<HTMLInputElement>) {
		const eventTarget = e.target as HTMLInputElement;
		if (eventTarget.value === "???") {
			setVariable("");
		}
	}

	useEffect(() => {
		const { id: networkId } = networkData;
		modifyElement({
			networkId,
			id,
			variableName: debouncedVariable,
		});
	}, [debouncedVariable]);

	if (networkData) {
		if (
			variableName &&
			type !== ElementType.Wire &&
			variableName !== variable &&
			variable &&
			!debouncedVariable
		) {
			setVariable(variableName);
		}
	}

	return (
		<div
			className={styles.elementWrapper}
			style={{ cursor: type !== ElementType.Wire ? "pointer" : "auto" }}
		>
			{type !== ElementType.Wire && (
				<input
					className={styles.variable}
					type='text'
					onClick={(e) => handleInputClick(e)}
					onBlur={(e) => handleInputBlur(e)}
					onChange={(e) => setVariable(e.target.value)}
					value={variable}
				/>
			)}
			<div onClick={type !== ElementType.Wire ? onClick : undefined}>
				<ElementRenderer element={element} />
			</div>
		</div>
	);
}
