import {
	Heading,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
} from "@chakra-ui/react";
import { setModalInventory } from "../../../redux/slices/admin-panel-slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import YugiohForm from "../../forms/yugioh-form";

type PropsTypes = {
	tcg: string;
};

const InventoryModal = ({ tcg }: PropsTypes) => {
	const dispatch = useAppDispatch();

	const loadData = (tcg: string) => {
		switch (tcg) {
			case "yugioh":
				return;
			default:
				return null;
		}
	};

	const isModalInventoryOpen = useAppSelector(
		(store) => store.adminPanelSlice.isModalInventoryOpen,
	);

	const handleClose = () => {
		dispatch(setModalInventory(false));
	};

	return (
		<Modal onClose={handleClose} size='xl' isOpen={isModalInventoryOpen}>
			<ModalOverlay />
			<ModalContent>
				<ModalBody>
					<YugiohForm />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default InventoryModal;
