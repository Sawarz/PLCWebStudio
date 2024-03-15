import { MouseEventHandler } from "react";
import styles from "./Coil.module.css";

type Props = {
	on: boolean | undefined;
	onClick: MouseEventHandler;
};

export default function Coil({ on, onClick }: Props) {
	return (
		<div
			style={{ borderColor: on ? "green" : "white" }}
			className={styles.coil}
			onClick={onClick}
		/>
	);
}
