import { Button, Icon, Stack } from "@chakra-ui/react";
import { MdAddShoppingCart } from "react-icons/md";
import { CartItemType } from "../../../redux/slices/carrito-slice";
import { YugiohCardType } from "../../../redux/slices/yugioh-slice";

type PropsTypes = {
	carritoSelectedItem: CartItemType;
	card: YugiohCardType;
	handleOnClick: (lang: "spanish" | "english") => void;
};

const LessButtons = ({
	carritoSelectedItem,
	card,
	handleOnClick,
}: PropsTypes) => {
	const checkStockDisable = (lang: "spanish" | "english") => {
		if (!carritoSelectedItem) return true;
		if (lang === "spanish") {
			if (carritoSelectedItem.quantitySpanish === 0) {
				return true;
			} else {
				return false;
			}
		} else if (lang === "english") {
			if (carritoSelectedItem.quantityEnglish === 0) {
				return true;
			} else {
				return false;
			}
		} else {
			return true;
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
						disabled={checkStockDisable("spanish")}
						onClick={() => handleOnClick("spanish")}
						colorScheme='red'
						bgGradient='linear(to-r, red.400, red.500, red.600)'
						color='white'
						maxW='250px'
						variant='solid'
						isFullWidth
						leftIcon={<Icon as={MdAddShoppingCart} />}>
						Restar versión española
					</Button>
				)}
				{carritoSelectedItem && carritoSelectedItem.quantityEnglish >= 0 && (
					<Button
						disabled={checkStockDisable("english")}
						onClick={() => handleOnClick("english")}
						colorScheme='blue'
						bgGradient='linear(to-r, blue.400, blue.500, blue.600)'
						color='white'
						variant='solid'
						isFullWidth
						leftIcon={<Icon as={MdAddShoppingCart} />}>
						Restar versión inglesa
					</Button>
				)}
			</Stack>
		</>
	);
};

export default LessButtons;
