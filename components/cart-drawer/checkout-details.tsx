import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { fCurrency } from "../../common/formatNumber";

const CheckoutDetails = () => {
	return (
		<Box w='100%' px={5} py={2} mt={5}>
			<Stack
				spacing={2}
				w='100%'
				justifyContent='center'
				alignItems='flex-start'>
				<Text sx={{ lineHeight: 0.6, fontSize: "0.8rem" }}>
					Subtotal: {fCurrency(110.2)}
				</Text>
				<Text sx={{ lineHeight: 0.6, fontSize: "0.8rem" }}>
					ITBMS: {fCurrency(7.78)}
				</Text>
				<Text sx={{ lineHeight: 1, fontSize: "1rem", fontWeight: "bold" }}>
					TOTAL: {fCurrency(117.98)}
				</Text>
			</Stack>
			<Button
				mt={2}
				bg='#003e69'
				color='white'
				_hover={{
					bg: "#005d9c",
					color: "white",
				}}
				variant='solid'
				isFullWidth>
				Ordenar
			</Button>
		</Box>
	);
};

export default CheckoutDetails;
