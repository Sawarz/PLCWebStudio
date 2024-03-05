import Network from "../Network/Network";
import Toolbar from "../Toolbar/Toolbar";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useNetworksStore } from "../../stores/NetworksStore";

export default function PLC() {
	const { networksData, addNetwork, deleteNetwork } = useNetworksStore(
		(state: any) => state
	);

	const { addElement } = useNetworksStore((state: any) => state);

	function handleDragEnd({ active, over }: DragEndEvent) {
		if (over) {
			const {
				data: { current },
			} = active;
			const { id } = over;
			const networkData = networksData.find(
				({ elements }: { elements: [] }) =>
					elements.find(
						({ id: elementId }: { id: string }) => elementId === id
					)
			);

			if (current) {
				addElement(networkData, id, current.type);
			}
		}
	}

	return (
		<DndContext onDragEnd={handleDragEnd}>
			<Toolbar />
			<button onClick={addNetwork}>Add Network</button>
			{networksData.map(({ id }: { id: string }) => {
				return (
					<Network
						id={id}
						deleteNetwork={deleteNetwork}
						key={id}
					/>
				);
			})}
		</DndContext>
	);
}
