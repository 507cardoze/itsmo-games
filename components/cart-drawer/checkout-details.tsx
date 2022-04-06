import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { fCurrency } from "../../common/formatNumber";
import {
	onOpenModalAuth,
	setAuthFormToLogin,
} from "../../redux/slices/auth-slice";
import { setClosecartDrawerOpen } from "../../redux/slices/carrito-slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const CheckoutDetails = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const cartItems = useAppSelector((store) => store.cartListSlice.items);
	const subtotal = useCallback(
		() =>
			cartItems.reduce((acc, item) => {
				const cantES = item.quantitySpanish ? item.quantitySpanish : 0;
				const cantEN = item.quantityEnglish ? item.quantityEnglish : 0;
				const qty = cantES + cantEN;
				return acc + item.price * qty;
			}, 0),
		[cartItems],
	)();
	const itbms = subtotal * 0.07;
	const currentUser = useAppSelector((store) => store.AuthSlice.currentUser);

	const handleOrdenar = async () => {
		if (!currentUser) {
			dispatch(setAuthFormToLogin());
			dispatch(onOpenModalAuth());
		} else {
			dispatch(setClosecartDrawerOpen());
			router.push("/checkout");
		}
	};

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
				onClick={handleOrdenar}
				colorScheme='blue'
				bgGradient='linear(to-r, blue.400, blue.500, blue.600)'
				color='white'
				variant='solid'
				isFullWidth>
				Continuar
			</Button>
		</Box>
	);
};

export default CheckoutDetails;
