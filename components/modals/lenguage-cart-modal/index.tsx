import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	Heading,
} from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "../../../redux/store";

import {
	CartItemType,
	addItem,
	lessItem,
	setCloseLenguageCartModal,
} from "../../../redux/slices/carrito-slice";
import { useEffect, useState } from "react";
import LessButtons from "./lessButtons";
import AddButtons from "./addButtons";

function LenguageCartModal() {
	const dispatch = useAppDispatch();
	const LenguageCartModalState = useAppSelector(
		(state) => state.cartListSlice.LenguageCartModalState,
	);
	const carritoItems = useAppSelector((store) => store.cartListSlice.items);
	const action = useAppSelector((store) => store.cartListSlice.action);
	const yugiohCardList = useAppSelector(
		(store) => store.YugiohCardListSlice.cardList,
	);

	const [carritoSelectedItem, setCarritoSelectedItem] = useState<
		CartItemType | undefined
	>();

	const selectedCartItem = useAppSelector(
		(store) => store.cartListSlice.editableItem,
	);

	const card = yugiohCardList.find(
		(cardItem) => cardItem.uid === selectedCartItem?.uid,
	);

	const handleLessItem = (lang: "spanish" | "english"): void => {
		if (carritoSelectedItem)
			dispatch(
				lessItem({
					uid: carritoSelectedItem.uid,
					name: carritoSelectedItem.name,
					price: carritoSelectedItem.price,
					url: carritoSelectedItem.url,
					tag: carritoSelectedItem.tag,
					type: lang,
				}),
			);
	};

	const handleAddItem = (lang: "spanish" | "english"): void => {
		if (carritoSelectedItem)
			dispatch(
				addItem({
					uid: carritoSelectedItem.uid,
					name: carritoSelectedItem.name,
					price: carritoSelectedItem.price,
					url: carritoSelectedItem.url,
					tag: carritoSelectedItem.tag,
					type: lang,
				}),
			);
	};

	const handleOnClick = (lang: "spanish" | "english"): void => {
		if (action === "add") {
			handleAddItem(lang);
		} else {
			handleLessItem(lang);
		}
	};

	useEffect(() => {
		if (carritoItems && selectedCartItem) {
			setCarritoSelectedItem(
				carritoItems.find((item) => item.uid === selectedCartItem.uid),
			);
			if (!carritoItems.find((item) => item.uid === selectedCartItem.uid)) {
				dispatch(setCloseLenguageCartModal());
			}
		}
	}, [carritoItems, selectedCartItem, dispatch]);

	if (!carritoSelectedItem || !card) return null;

	return (
		<Modal
			onClose={() => dispatch(setCloseLenguageCartModal())}
			size='xl'
			isOpen={LenguageCartModalState}>
			<ModalOverlay />
			<ModalContent>
				<ModalBody>
					<Heading fontSize='24px' textAlign='center'>
						{action === "add" ? "Agregar " : "Restar"} {selectedCartItem?.name}
					</Heading>
					{action === "add" ? (
						<AddButtons
							carritoSelectedItem={carritoSelectedItem}
							card={card}
							handleOnClick={handleOnClick}
						/>
					) : (
						<LessButtons
							carritoSelectedItem={carritoSelectedItem}
							card={card}
							handleOnClick={handleOnClick}
						/>
					)}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}

export default LenguageCartModal;
