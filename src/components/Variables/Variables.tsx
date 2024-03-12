import { useVariableStore } from "@/stores/VariableStore";
import styles from "./Variables.module.css";

type Props = {};

export default function Variables({}: Props) {
	const { variables, addVariable } = useVariableStore((state: any) => state);

	return (
		<div className={styles.variables}>
			<button
				onClick={() => addVariable({ id: "1", name: "test", value: 0 })}
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
		</div>
	);
}
