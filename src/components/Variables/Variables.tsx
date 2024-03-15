import { useState } from "react";
import styles from "./Variables.module.css";
import { useVariableStore } from "@/stores/VariableStore";
import VariableAddModal from "@/components/modals/VariableAddModal/VariableAddModal";
import { Variable } from "@/stores/VariableStore";

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
			{variables.map(({ id, name, value, type }: Variable) => {
				return (
					<div key={id}>
						<p>{name}</p>
						<p>{value}</p>
						<p>{type}</p>
					</div>
				);
			})}
			{modalOpen && (
				<VariableAddModal closeModal={() => setModalOpen(false)} />
			)}
		</div>
	);
}
