import styles from "./Contact.module.css";

type Props = {
	on: boolean | undefined;
};

export default function Contact({ on }: Props) {
	return (
		<div
			style={{ borderColor: on ? "green" : "white" }}
			className={styles.contact}
		/>
	);
}
