import { Box, Text } from "@chakra-ui/react";

const EmptyCartItem = () => {
	return (
		<Box
			w='100%'
			h='85px'
			display='flex'
			justifyContent='center'
			alignItems='center'
			textAlign='center'>
			<Text fontSize={"xl"}>Carrito Vacío</Text>
		</Box>
	);
};

export default EmptyCartItem;
