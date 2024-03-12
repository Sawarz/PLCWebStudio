import { useEffect, useRef } from "react";
import { animate, renderer } from "../../util/ThreeJSSetup";
import styles from "./Scene3D.module.css";

type Props = {};

export default function Scene3D({}: Props) {
	const canvasRef = useRef<HTMLDivElement>();

	useEffect(() => {
		if (!canvasRef.current) return;

		if (canvasRef.current) {
			canvasRef.current.appendChild(renderer.domElement);
		}

		animate();

		return () => {
			renderer.dispose();
		};
	}, [canvasRef]);

	return (
		<div
			className={styles.scene}
			ref={canvasRef as React.LegacyRef<HTMLDivElement>}
		/>
	);
}
