import styles from "./Coil.module.css";

type Props = {
	on: boolean | undefined;
};

export default function Coil({ on }: Props) {
	return (
		<div
			style={{ borderColor: on ? "green" : "white" }}
			className={styles.coil}
		/>
	);
}
