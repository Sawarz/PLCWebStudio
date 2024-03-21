import { useState } from "react";
import { useVariableStore } from "@/stores/VariableStore";
import { v4 } from "uuid";
import ValueInput from "@/components/ValueInput/ValueInput";
import styles from "./VariableAddModal.module.css";
import { Type } from "@/types/VariableEnum";

type Props = {
	closeModal: () => void;
};

export default function VariableAddModal({ closeModal }: Props) {
	const { addVariable } = useVariableStore((state: any) => state);
	const [name, setName] = useState<string>();
	const [value, setValue] = useState<Type>();
	const [type, setType] = useState<Type>(Type.Boolean);

	return (
		<div className={styles.modal}>
			<select onChange={(e) => setType(e.target.value as Type)}>
				<option value={Type.Boolean}>Boolean</option>
				<option value={Type.String}>String</option>
				<option value={Type.Int}>Int</option>
			</select>
			<input
				type='text'
				onChange={(e) => setName(e.target.value)}
			/>
			<ValueInput
				type={type}
				setValue={setValue}
			/>
			<button
				onClick={() => {
					addVariable({
						id: v4(),
						name,
						value,
						type,
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
