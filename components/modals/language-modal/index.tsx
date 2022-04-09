import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
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

	const carritoSelectedItem = carritoItems.find(
		(item) => item.uid === cardDetail?.uid,
	);

	const checkStock = (lang: "spanish" | "english"): boolean => {
		if (!cardDetail) return true;

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
						{cardDetail && cardDetail.Spanish > 0 && (
							<Button disabled maxW='250px' variant='outlined' isFullWidth>
								{cardDetail
									? `${
											cardDetail.Spanish
												? `${cardDetail.Spanish} de ${
														carritoSelectedItem &&
														carritoSelectedItem.quantitySpanish
															? carritoSelectedItem.quantitySpanish
															: 0
												  }`
												: `0 de ${
														carritoSelectedItem
															? carritoSelectedItem.quantitySpanish
															: 0
												  }`
									  }`
									: `0`}
							</Button>
						)}
						{cardDetail && cardDetail.English >= 0 && (
							<Button disabled maxW='250px' variant='outlined' isFullWidth>
								{cardDetail
									? `${
											cardDetail.English
												? `${cardDetail.English} de ${
														carritoSelectedItem &&
														carritoSelectedItem.quantityEnglish
															? carritoSelectedItem.quantityEnglish
															: 0
												  }`
												: `0 de ${
														carritoSelectedItem &&
														carritoSelectedItem.quantityEnglish
															? carritoSelectedItem.quantityEnglish
															: 0
												  }`
									  }`
									: `0`}
							</Button>
						)}
					</Stack>
					<Stack direction='row' spacing={4} justifyContent='center' my={10}>
						{cardDetail && cardDetail.Spanish && (
							<Button
								maxW='250px'
								disabled={checkStock("spanish")}
								onClick={() => handleAddItem("spanish")}
								colorScheme='red'
								bgGradient='linear(to-r, red.400, red.500, red.600)'
								color='white'
								variant='solid'
								isFullWidth
								leftIcon={<Icon as={MdAddShoppingCart} />}>
								Español
							</Button>
						)}
						{cardDetail && cardDetail.English && (
							<Button
								maxW='250px'
								disabled={checkStock("english")}
								onClick={() => handleAddItem("english")}
								colorScheme='blue'
								bgGradient='linear(to-r, blue.400, blue.500, blue.600)'
								color='white'
								variant='solid'
								isFullWidth
								leftIcon={<Icon as={MdAddShoppingCart} />}>
								Ingles
							</Button>
						)}
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}

export default LenguageModal;
