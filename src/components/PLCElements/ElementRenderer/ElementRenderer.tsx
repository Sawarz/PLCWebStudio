import { PLCElement } from "@/types/PLCElement";
import Wire from "@/components/PLCElements/Wire/Wire";
import Coil from "@/components/PLCElements/Coil/Coil";
import Contact from "@/components/PLCElements/Contact/Contact";
import { ElementType } from "@/types/ElementEnum";

type Props = {
	element: PLCElement;
};

export default function ElementRenderer({ element }: Props) {
	const { type, id, on } = element;

	if (type === ElementType.Wire) {
		return (
			<Wire
				on={on}
				id={id}
				key={id}
			/>
		);
	}

	if (type === ElementType.Coil) {
		return (
			<Coil
				on={on}
				key={id}
			/>
		);
	}

	if (type === ElementType.Contact) {
		return (
			<Contact
				on={on}
				key={id}
			/>
		);
	}
}
