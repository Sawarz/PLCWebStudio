import Contact from "@/components/PLCElements/Contact/Contact";
import Coil from "@/components/PLCElements/Coil/Coil";
import styles from "./Network.module.css";
import Wire from "@/components/PLCElements/Wire/Wire";
import { useNetworksStore } from "@/stores/NetworksStore";
import { useState } from "react";
import ModifyElementModal from "@/components/modals/ModifyElementModal/ModifyElementModal";

type Props = {
	id: string;
	deleteNetwork: Function;
};

export default function Network({ id: networkId, deleteNetwork }: Props) {
	const [modifiedElement, setModifiedElement] = useState("noelement");
	const { networksData } = useNetworksStore((state: any) => state);

	const { elements } = networksData.find(
		({ id: currentNetworkId }: { id: string }) =>
			currentNetworkId === networkId
	);

	return (
		<div>
			<div className={styles.elements}>
				{elements.map(
					(
						{ type, id }: { type: string; on: any; id: string },
						i: number
					) => {
						if (type === "wire") {
							return (
								<Wire
									on={
										i === 0
											? elements[i + 1]?.on
											: elements[i - 1]?.on
									}
									id={id}
									key={id}
								/>
							);
						}

						if (type === "coil") {
							return (
								<Coil
									onClick={() => setModifiedElement(id)}
									on={elements[i - 2]?.on}
									key={id}
								/>
							);
						}

						if (type === "contact") {
							return (
								<Contact
									onClick={() => setModifiedElement(id)}
									on={elements[i]?.on}
									key={id}
								/>
							);
						}
					}
				)}
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
