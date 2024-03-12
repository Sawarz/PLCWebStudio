import { useState } from "react";
import { useVariableStore } from "@/stores/VariableStore";
import { v4 } from "uuid";
import styles from "./VariableAddModal.module.css";

type Props = {
	closeModal: () => void;
};

export default function VariableAddModal({ closeModal }: Props) {
	const { addVariable } = useVariableStore((state: any) => state);
	const [name, setName] = useState<string>();
	const [value, setValue] = useState<string>();
	return (
		<div className={styles.modal}>
			<input
				type='text'
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				type='number'
				onChange={(e) => setValue(e.target.value)}
			/>
			<button
				onClick={() => {
					addVariable({
						id: v4(),
						name,
						value,
					});
					closeModal();
				}}
			>
				Add Variable
			</button>
			<button onClick={closeModal}>Cancel</button>
		</div>
	);
}
