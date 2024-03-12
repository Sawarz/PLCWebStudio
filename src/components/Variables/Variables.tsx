import { useState } from "react";
import styles from "./Variables.module.css";
import { useVariableStore } from "@/stores/VariableStore";
import VariableAddModal from "../VariableAddModal/VariableAddModal";

type Props = {};

export default function Variables({}: Props) {
	const [modalOpen, setModalOpen] = useState(false);
	const { variables } = useVariableStore((state: any) => state);

	return (
		<div className={styles.variables}>
			<button
				onClick={() => setModalOpen(true)}
				className={styles.addVariableButton}
			>
				Add Variable
			</button>
			{variables.map(
				({
					id,
					name,
					value,
				}: {
					id: string;
					name: string;
					value: number;
				}) => {
					return (
						<div key={id}>
							<p>{name}</p>
							<p>{value}</p>
						</div>
					);
				}
			)}
			{modalOpen && (
				<VariableAddModal closeModal={() => setModalOpen(false)} />
			)}
		</div>
	);
}
