import styles from "./Wire.module.css";

type Props = {
	on: boolean | undefined;
};

export default function Wire({ on }: Props) {
	return (
		<div
			style={{ backgroundColor: on ? "green" : "black" }}
			className={styles.wire}
		/>
	);
}
