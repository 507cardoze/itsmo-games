import type { NextPage } from "next";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const SuccessPage: NextPage = () => {
	const router = useRouter();
	return (
		<Box textAlign='center' py={10} px={6}>
			<CheckCircleIcon boxSize={"150px"} color={"green.500"} />
			<Heading as='h2' size='xl' mt={6} mb={2}>
				¡Orden creada con exito!
			</Heading>
			<Text color={"gray.500"}>Gracias por tu compra.</Text>
			<Text color={"gray.500"}>
				Te contactaremos mientras procesamos tu orden.
			</Text>
			<Button
				colorScheme='blue'
				bgGradient='linear(to-r, blue.400, blue.500, blue.600)'
				color='white'
				variant='solid'
				mt={6}
				onClick={() => router.push("/")}>
				¡Seguir comprando!
			</Button>
		</Box>
	);
};

export default SuccessPage;
