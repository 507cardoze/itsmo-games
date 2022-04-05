import { Button } from "@chakra-ui/react";

const AuthButtons = () => {
	return (
		<>
			<Button borderRadius={0} variant='solid'>
				Iniciar sesión
			</Button>
			<Button borderRadius={0} variant='solid'>
				Registrarte
			</Button>
		</>
	);
};

export default AuthButtons;
