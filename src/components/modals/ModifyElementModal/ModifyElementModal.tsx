import { useState } from "react";
import styles from "./ModifyElementModal.module.css";
import { useNetworksStore } from "@/stores/NetworksStore";

type Props = {
	closeModal: () => void;
	elementId: string;
	networkId: string;
};

export default function ModifyElementModal({
	closeModal,
	elementId,
	networkId,
}: Props) {
	const { modifyElement } = useNetworksStore((state: any) => state);
	const [name, setName] = useState<string>();

	return (
		<div className={styles.modal}>
			<input
				type='text'
				onChange={(e) => setName(e.target.value)}
			/>
			<button
				onClick={() => {
					modifyElement({
						networkId,
						id: elementId,
						variableName: name,
					});
					closeModal();
				}}
			>
				Choose Variable
			</button>
			<button onClick={closeModal}>Cancel</button>
		</div>
	);
}
