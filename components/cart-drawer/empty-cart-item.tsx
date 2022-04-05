import { Box, Icon, Text } from "@chakra-ui/react";
import { MdOutlineTagFaces } from "react-icons/md";

const EmptyCartItem = () => {
	return (
		<Box
			w='100%'
			h='85px'
			display='flex'
			justifyContent='center'
			alignItems='center'
			textAlign='center'
			flexDirection='column'>
			<Icon as={MdOutlineTagFaces} w={50} h={50} />
			<Text fontSize={"lg"}>Carrito Vacío</Text>
		</Box>
	);
};

export default EmptyCartItem;
