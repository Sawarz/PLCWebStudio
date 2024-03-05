import { MouseEventHandler } from "react";
import styles from "./Contact.module.css";

type Props = {
	on: boolean | undefined;
	onClick: MouseEventHandler;
};

export default function Contact({ on, onClick }: Props) {
	return (
		<div
			style={{ borderColor: on ? "green" : "white" }}
			className={styles.contact}
			onClick={onClick}
		/>
	);
}
