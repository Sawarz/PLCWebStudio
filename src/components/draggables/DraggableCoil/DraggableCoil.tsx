import styles from "./DraggableCoil.module.css";
import { useDraggable } from "@dnd-kit/core";

type Props = {};

export default function DraggableCoil({}: Props) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: "draggableCoil",
		data: {
			type: "coil",
		},
	});

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		  }
		: undefined;

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className={styles.draggableCoil}
		/>
	);
}
