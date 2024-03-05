import Contact from "../PLCElements/Contact/Contact";
import Coil from "../PLCElements/Coil/Coil";
import styles from "./Network.module.css";
import Wire from "../PLCElements/Wire/Wire";
import { useNetworksStore } from "../../stores/NetworksStore";

type Props = {
	id: string;
	deleteNetwork: Function;
};

export default function Network({ id: networkId, deleteNetwork }: Props) {
	const { networksData, switchContact } = useNetworksStore(
		(state: any) => state
	);

	const { elements } = networksData.find(
		({ id: currentNetworkId }: { id: string }) =>
			currentNetworkId === networkId
	);

	return (
		<div>
			<div className={styles.elements}>
				{elements.map(
					(
						{ type, id }: { type: string; on: any; id: number },
						i: number
					) => {
						if (type === "wire") {
							return (
								<Wire
									on={
										i === 0
											? elements[i + 1]?.on
											: elements[i - 1]?.on
									}
									id={id}
									key={id}
								/>
							);
						}

						if (type === "coil") {
							return (
								<Coil
									on={elements[i - 2]?.on}
									key={id}
								/>
							);
						}

						if (type === "contact") {
							return (
								<Contact
									onClick={() => switchContact(networkId, id)}
									on={elements[i]?.on}
									key={id}
								/>
							);
						}
					}
				)}
			</div>
			<button onClick={() => deleteNetwork(networkId)}>X</button>
		</div>
	);
}
