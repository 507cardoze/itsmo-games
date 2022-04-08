import { Button, Icon, Stack } from "@chakra-ui/react";
import { CartItemType } from "../../../redux/slices/carrito-slice";
import { YugiohCardType } from "../../../redux/slices/yugioh-slice";
import { MdAddShoppingCart } from "react-icons/md";

type PropsTypes = {
	carritoSelectedItem: CartItemType;
	card: YugiohCardType;
	handleOnClick: (lang: "spanish" | "english") => void;
};

const AddButtons = ({
	carritoSelectedItem,
	card,
	handleOnClick,
}: PropsTypes) => {
	const checkStock = (lang: "spanish" | "english"): boolean => {
		if (!carritoSelectedItem) return false;

		if (!card) return false;

		if (carritoSelectedItem) {
			if (lang === "spanish") {
				if (carritoSelectedItem.quantitySpanish < card.Spanish) {
					return true;
				} else {
					return false;
				}
			} else if (lang === "english") {
				if (carritoSelectedItem.quantityEnglish < card.English) {
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
		<>
			<Stack direction='row' spacing={4} justifyContent='center' my={10}>
				{carritoSelectedItem && carritoSelectedItem.quantitySpanish >= 0 && (
					<Button disabled maxW='250px' variant='outlined' isFullWidth>
						{carritoSelectedItem
							? `${
									carritoSelectedItem.quantitySpanish
										? `${carritoSelectedItem.quantitySpanish} de ${card?.Spanish}`
										: `0 de ${card?.Spanish}`
							  }`
							: `0`}
					</Button>
				)}
				{carritoSelectedItem && carritoSelectedItem.quantityEnglish >= 0 && (
					<Button disabled maxW='250px' variant='outlined' isFullWidth>
						{carritoSelectedItem
							? `${
									carritoSelectedItem.quantityEnglish
										? `${carritoSelectedItem.quantityEnglish} de ${card?.English}`
										: `0 de ${card?.English}`
							  }`
							: `0`}
					</Button>
				)}
			</Stack>
			<Stack direction='row' spacing={4} justifyContent='center' my={10}>
				{carritoSelectedItem && carritoSelectedItem.quantitySpanish >= 0 && (
					<Button
						disabled={!checkStock("spanish")}
						onClick={() => handleOnClick("spanish")}
						colorScheme='red'
						bgGradient='linear(to-r, red.400, red.500, red.600)'
						color='white'
						maxW='250px'
						variant='solid'
						isFullWidth
						leftIcon={<Icon as={MdAddShoppingCart} />}>
						Agregar versión española
					</Button>
				)}
				{carritoSelectedItem && carritoSelectedItem.quantityEnglish >= 0 && (
					<Button
						disabled={!checkStock("english")}
						onClick={() => handleOnClick("english")}
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
		</>
	);
};

export default AddButtons;
