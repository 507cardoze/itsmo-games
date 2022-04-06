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
import { addItem } from "../../../redux/slices/carrito-slice";
import { MdAddShoppingCart } from "react-icons/md";

function LenguageModal() {
	const dispatch = useAppDispatch();
	const isOpenLenguageModal = useAppSelector(
		(state) => state.YugiohCardListSlice.isOpenLenguageModal,
	);

	const cardDetail = useAppSelector(
		(store) => store.YugiohCardListSlice.cardDetail,
	);

	const carritoItems = useAppSelector((store) => store.cartListSlice.items);

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

	const checkStock = (lang: "spanish" | "english"): boolean => {
		if (!cardDetail) return true;

		const carritoSelectedItem = carritoItems.find(
			(item) => item.uid === cardDetail.uid,
		);

		if (carritoSelectedItem) {
			if (
				lang === "spanish" &&
				cardDetail.Spanish <= carritoSelectedItem.quantitySpanish
			)
				return true;
			if (
				lang === "english" &&
				cardDetail.English <= carritoSelectedItem.quantityEnglish
			)
				return true;
			return false;
		}
		return false;
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
						{cardDetail && cardDetail.Spanish && (
							<Button
								disabled={checkStock("spanish")}
								onClick={() => handleAddItem("spanish")}
								colorScheme='red'
								bgGradient='linear(to-r, red.400, red.500, red.600)'
								color='white'
								variant='solid'
								isFullWidth
								leftIcon={<Icon as={MdAddShoppingCart} />}>
								Agregar versión española
							</Button>
						)}
						{cardDetail && cardDetail.English && (
							<Button
								disabled={checkStock("english")}
								onClick={() => handleAddItem("english")}
								colorScheme='blue'
								bgGradient='linear(to-r, blue.400, blue.500, blue.600)'
								color='white'
								variant='solid'
								isFullWidth
								leftIcon={<Icon as={MdAddShoppingCart} />}>
								Agregar versión inglesa
							</Button>
						)}
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

export default LenguageModal;
