import { Button } from "@chakra-ui/react";
import React from "react";

const SignOutButton = () => {
	return (
		<Button
			isLoading={false}
			loadingText='Cerrando...'
			colorScheme='red'
			bgGradient='linear(to-r, red.400, red.500, red.600)'
			color='white'
			_hover={{
				bg: "red.400",
				color: "white",
			}}
			borderRadius={0}
			variant='solid'>
			Cerrar sesión
		</Button>
	);
};

export default SignOutButton;
