import Logo from "../Logo/Logo";
import styles from "./Header.module.css";

type Props = {};

export default function Header({}: Props) {
	return (
		<div className={styles.header}>
			<Logo />
		</div>
	);
}
