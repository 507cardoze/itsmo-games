import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { fCurrency } from "../../common/formatNumber";
import {
	onOpenModalAuth,
	setAuthFormToLogin,
} from "../../redux/slices/auth-slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const CheckoutDetails = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const cartItems = useAppSelector((store) => store.cartListSlice.items);
	const subtotal = useCallback(
		() => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
		[cartItems],
	)();
	const itbms = subtotal * 0.07;
	const currentUser = useAppSelector((store) => store.AuthSlice.currentUser);

	const handleOrdenar = async () => {
		if (!currentUser) {
			dispatch(setAuthFormToLogin());
			dispatch(onOpenModalAuth());
		} else if (cartItems.length) {
			alert("facturando...");
		}
	};

	return (
		<Box w='100%' p={10}>
			<Stack
				spacing={6}
				justifyContent={{ base: "space-around", md: "flex-start" }}
				alignItems='center'
				direction='row'>
				<Stack>
					<Text sx={{ lineHeight: 1, fontSize: "0.8rem" }}>
						Subtotal: {fCurrency(subtotal)}
					</Text>
					<Text sx={{ lineHeight: 1, fontSize: "0.8rem" }}>
						ITBMS: {fCurrency(itbms)}
					</Text>
					<Text sx={{ lineHeight: 1, fontSize: "1rem", fontWeight: "bold" }}>
						TOTAL: {fCurrency(subtotal + itbms)}
					</Text>
				</Stack>
				<Button
					sx={{ maxWidth: "250px" }}
					disabled={cartItems.length === 0}
					onClick={handleOrdenar}
					colorScheme='blue'
					bgGradient='linear(to-r, blue.400, blue.500, blue.600)'
					color='white'
					variant='solid'
					isFullWidth>
					Completar Orden
				</Button>
			</Stack>
		</Box>
	);
};

export default CheckoutDetails;
