import DraggableCoil from "@/components/draggables/DraggableCoil/DraggableCoil";
import DraggableContact from "@/components/draggables/DraggableContact/DraggableContact";
import styles from "./Toolbar.module.css";

type Props = {};

export default function Toolbar({}: Props) {
	return (
		<div className={styles.toolbar}>
			<DraggableCoil />
			<DraggableContact />
		</div>
	);
}
