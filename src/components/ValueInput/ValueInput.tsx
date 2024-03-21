import { Variable } from "@/stores/VariableStore";
import { Type } from "@/types/VariableEnum";

type Props = {
	type?: Type;
	setValue?: (value: Type) => void;
	handleVariableChange?: (
		e: React.ChangeEvent<HTMLInputElement>,
		variable: Variable
	) => void;
	variable?: Variable;
};

export default function ValueInput({
	type,
	setValue,
	handleVariableChange,
	variable,
}: Props) {
	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.name === "value" && handleVariableChange && variable) {
			handleVariableChange(e, variable);
		} else if (setValue) {
			if (e.target.type === "checkbox") {
				setValue(e.target.checked as unknown as Type);
				return;
			}

			setValue(e.target.value as Type);
		}
	}
	if (type === Type.Boolean) {
		return (
			<div>
				<label>True: </label>
				<input
					type='checkbox'
					name='value'
					defaultChecked={
						variable ? (variable.value as boolean) : false
					}
					onChange={(e) => handleInputChange(e)}
				/>
			</div>
		);
	}
	if (type === Type.String) {
		return (
			<input
				type='text'
				name='value'
				defaultValue={variable ? (variable.value as string) : ""}
				onChange={(e) => handleInputChange(e)}
			/>
		);
	}
	if (type === Type.Int) {
		return (
			<input
				type='number'
				name='value'
				defaultValue={variable ? (variable.value as number) : 0}
				onChange={(e) => handleInputChange(e)}
			/>
		);
	}
}
