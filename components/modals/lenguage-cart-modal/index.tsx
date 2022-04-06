import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalFooter,
	Button,
	Icon,
	Stack,
	Heading,
} from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "../../../redux/store";
import { setCloseLenguageModal } from "../../../redux/slices/yugioh-slice";
import { addItem, lessItem } from "../../../redux/slices/carrito-slice";
import { MdAddShoppingCart } from "react-icons/md";

function LenguageCartModal() {
	const dispatch = useAppDispatch();
	const isOpenLenguageModal = useAppSelector(
		(state) => state.YugiohCardListSlice.isOpenLenguageModal,
	);

	const cardDetail = useAppSelector(
		(store) => store.YugiohCardListSlice.cardDetail,
	);

	const carritoItems = useAppSelector((store) => store.cartListSlice.items);

	const lenguageModalType = useAppSelector(
		(store) => store.YugiohCardListSlice.lenguageModalType,
	);

	const handleAddItem = (lang: "spanish" | "english"): void => {
		if (cardDetail)
			dispatch(
				addItem({
					uid: cardDetail.uid,
					name: cardDetail.name,
					price: cardDetail.prices.average,
					url: cardDetail.url,
					tag: cardDetail.printTag,
					type: lang,
				}),
			);
	};

	const handleLessItem = (lang: "spanish" | "english"): void => {
		if (cardDetail)
			dispatch(
				lessItem({
					uid: cardDetail.uid,
					name: cardDetail.name,
					price: cardDetail.prices.average,
					url: cardDetail.url,
					tag: cardDetail.printTag,
					type: lang,
				}),
			);
	};

	const handleOnClick = (lang: "spanish" | "english") => {
		if (cardDetail) {
			if (lenguageModalType === "add") {
				handleAddItem(lang);
			}
			if (lenguageModalType === "less") {
				handleLessItem(lang);
			}
		}
	};

	const checkStock = (lang: "spanish" | "english"): boolean => {
		if (!cardDetail) return false;

		const carritoSelectedItem = carritoItems.find(
			(item) => item.uid === cardDetail.uid,
		);

		if (carritoSelectedItem) {
			if (lang === "spanish") {
				if (cardDetail.Spanish <= carritoSelectedItem.quantitySpanish) {
					return true;
				} else {
					return false;
				}
			} else if (lang === "english") {
				if (cardDetail.English <= carritoSelectedItem.quantityEnglish) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	};

	return (
		<Modal
			onClose={() => dispatch(setCloseLenguageModal())}
			size='xl'
			isOpen={isOpenLenguageModal}>
			<ModalOverlay />
			<ModalContent>
				<ModalBody>
					<Heading fontSize='24px' textAlign='center'>
						Lenguajes disponibles
					</Heading>
					<Stack direction='row' spacing={4} justifyContent='center' my={10}>
						<Button
							disabled={checkStock("spanish")}
							onClick={() => handleOnClick("spanish")}
							colorScheme='red'
							bgGradient='linear(to-r, red.400, red.500, red.600)'
							color='white'
							variant='solid'
							isFullWidth
							leftIcon={<Icon as={MdAddShoppingCart} />}>
							Agregar versión española
						</Button>
						<Button
							disabled={checkStock("english")}
							onClick={() => handleOnClick("english")}
							colorScheme='blue'
							bgGradient='linear(to-r, blue.400, blue.500, blue.600)'
							color='white'
							variant='solid'
							isFullWidth
							leftIcon={<Icon as={MdAddShoppingCart} />}>
							Agregar versión inglesa
						</Button>
					</Stack>
				</ModalBody>
				<ModalFooter justifyContent='center' alignItems='center'>
					<Button size='sm' onClick={() => dispatch(setCloseLenguageModal())}>
						Cancelar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default LenguageCartModal;
