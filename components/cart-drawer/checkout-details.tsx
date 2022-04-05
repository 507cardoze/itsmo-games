import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { fCurrency } from "../../common/formatNumber";
import { useAppSelector } from "../../redux/store";

const CheckoutDetails = () => {
	const cartItems = useAppSelector((store) => store.cartListSlice.items);
	const subtotal = useCallback(
		() => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
		[cartItems],
	)();
	const itbms = subtotal * 0.07;

	return (
		<Box w='100%' px={5} py={2} mt={5}>
			<Stack
				spacing={2}
				w='100%'
				justifyContent='center'
				alignItems='flex-start'>
				<Text sx={{ lineHeight: 0.6, fontSize: "0.8rem" }}>
					Subtotal: {fCurrency(subtotal)}
				</Text>
				<Text sx={{ lineHeight: 0.6, fontSize: "0.8rem" }}>
					ITBMS: {fCurrency(itbms)}
				</Text>
				<Text sx={{ lineHeight: 1, fontSize: "1rem", fontWeight: "bold" }}>
					TOTAL: {fCurrency(subtotal + itbms)}
				</Text>
			</Stack>
			<Button
				mt={2}
				disabled={cartItems.length === 0}
				colorScheme='blue'
				bgGradient='linear(to-r, blue.400, blue.500, blue.600)'
				color='white'
				variant='solid'
				isFullWidth>
				Ordenar
			</Button>
		</Box>
	);
};

export default CheckoutDetails;
