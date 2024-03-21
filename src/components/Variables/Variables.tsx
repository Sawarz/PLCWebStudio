import { useState } from "react";
import styles from "./Variables.module.css";
import { useVariableStore } from "@/stores/VariableStore";
import VariableAddModal from "@/components/modals/VariableAddModal/VariableAddModal";
import { Variable } from "@/stores/VariableStore";
import ValueInput from "../ValueInput/ValueInput";
import { Type } from "@/types/VariableEnum";

type Props = {};

export default function Variables({}: Props) {
	const [modalOpen, setModalOpen] = useState(false);
	const { variables, modifyVariable } = useVariableStore(
		(state: any) => state
	);

	function handleInputChange(
		e: React.ChangeEvent<HTMLInputElement>,
		variable: Variable
	) {
		console.log(e.target.checked);
		const newVariable = {
			...variable,
			[e.target.name]:
				e.target.type === "checkbox"
					? e.target.checked
					: e.target.value,
		};

		modifyVariable(newVariable);
	}

	function handleSelectChange(
		e: React.ChangeEvent<HTMLSelectElement>,
		variable: Variable
	) {
		const newVariable = {
			...variable,
			[e.target.name]: e.target.value,
		};

		modifyVariable(newVariable);
	}

	return (
		<div className={styles.variables}>
			<button
				onClick={() => setModalOpen(true)}
				className={styles.addVariableButton}
			>
				Add Variable
			</button>
			{variables.map((variable: Variable) => {
				const { id, name, type } = variable;
				return (
					<div
						key={id}
						className={styles.variable}
					>
						<input
							name='name'
							onChange={(e) => handleInputChange(e, variable)}
							value={name}
						></input>
						<ValueInput
							type={type}
							handleVariableChange={(e) =>
								handleInputChange(e, variable)
							}
							variable={variable}
						/>
						<select
							name='type'
							onChange={(e) => handleSelectChange(e, variable)}
							value={type}
						>
							<option value={Type.Boolean}>Boolean</option>
							<option value={Type.String}>String</option>
							<option value={Type.Int}>Int</option>
						</select>
					</div>
				);
			})}
			{modalOpen && (
				<VariableAddModal closeModal={() => setModalOpen(false)} />
			)}
		</div>
	);
}
