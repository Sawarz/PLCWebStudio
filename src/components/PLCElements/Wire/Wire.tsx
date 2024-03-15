import { useDroppable } from "@dnd-kit/core";
import styles from "./Wire.module.css";

type Props = {
	on: boolean | undefined;
	id: string;
};

export default function Wire({ on, id }: Props) {
	const { isOver, setNodeRef } = useDroppable({
		id: id,
	});

	return (
		<div
			ref={setNodeRef}
			style={{
				border: isOver ? "1px solid red" : "none",
			}}
			className={styles.wireDroppable}
		>
			<div
				className={styles.wire}
				style={{
					backgroundColor: on ? "green" : "white",
					boxShadow: on ? "0px 0px 5px 1px green" : "none",
				}}
			/>
		</div>
	);
}
