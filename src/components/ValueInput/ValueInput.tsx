import { Type } from "@/stores/VariableStore";

type Props = {
	type: Type;
	setValue: (value: Type) => void;
};

export default function ValueInput({ type, setValue }: Props) {
	if (type === Type.Boolean) {
		return (
			<div>
				<label>True: </label>
				<input
					type='checkbox'
					onChange={(e) => setValue(e.target.value as Type.Boolean)}
				/>
			</div>
		);
	}
	if (type === Type.String) {
		return (
			<input
				type='text'
				onChange={(e) => setValue(e.target.value as Type.String)}
			/>
		);
	}
	if (type === Type.Int) {
		return (
			<input
				type='number'
				onChange={(e) => setValue(e.target.value as Type.Int)}
			/>
		);
	}
}
