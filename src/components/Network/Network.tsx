import styles from "./Network.module.css";
import { useNetworksStore } from "@/stores/NetworksStore";
import { useEffect, useState } from "react";
import ModifyElementModal from "@/components/modals/ModifyElementModal/ModifyElementModal";
import ElementWrapper from "../PLCElements/ElementWrapper/ElementWrapper";
import { PLCElement } from "@/types/PLCElement";

type Props = {
	id: string;
	deleteNetwork: Function;
};

export default function Network({ id: networkId, deleteNetwork }: Props) {
	const [modifiedElement, setModifiedElement] = useState("noelement");
	const { networksData, calculateNetwork } = useNetworksStore(
		(state: any) => state
	);

	const { elements } = networksData.find(
		({ id: currentNetworkId }: { id: string }) =>
			currentNetworkId === networkId
	);

	useEffect(() => {
		setInterval(() => {
			calculateNetwork(networkId);
		}, 50);
	}, [networkId, calculateNetwork]);

	return (
		<div>
			<div className={styles.elements}>
				{elements.map(({ id }: PLCElement, i: number) => {
					return (
						<ElementWrapper
							onClick={() => setModifiedElement(id)}
							id={id}
							key={i}
						/>
					);
				})}
			</div>
			<button onClick={() => deleteNetwork(networkId)}>X</button>
			{modifiedElement !== "noelement" && (
				<ModifyElementModal
					elementId={modifiedElement}
					networkId={networkId}
					closeModal={() => setModifiedElement("noelement")}
				/>
			)}
		</div>
	);
}
