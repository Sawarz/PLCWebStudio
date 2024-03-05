import styles from "./DraggableContact.module.css";
import { useDraggable } from "@dnd-kit/core";

type Props = {};

export default function DraggableContact({}: Props) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: "draggableContact",
		data: {
			type: "contact",
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
			className={styles.draggableContact}
		/>
	);
}
