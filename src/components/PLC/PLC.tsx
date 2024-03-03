import Network from "../Network/Network";
import { useState } from "react";
import { v4 } from "uuid";

export default function PLC() {
	const [networksIDs, setNetworksIDs] = useState<string[]>([]);

	function addNetwork() {
		const currentID = v4();
		setNetworksIDs([...networksIDs, currentID]);
	}

	function deleteNetwork(id: string) {
		const networkIndex = networksIDs.findIndex(
			(networkID) => networkID === id
		);
		const newNetworkIDs = [...networksIDs];
		newNetworkIDs.splice(networkIndex, 1);
		setNetworksIDs(newNetworkIDs);
	}

	return (
		<div>
			<div>PLC</div>
			<button onClick={addNetwork}>Add Network</button>
			{networksIDs.map((networkID) => {
				return (
					<Network
						id={networkID}
						deleteNetwork={deleteNetwork}
					/>
				);
			})}
		</div>
	);
}
