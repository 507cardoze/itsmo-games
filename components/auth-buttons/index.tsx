import { Button } from "@chakra-ui/react";
import {
	onOpenModalAuth,
	setAuthFormToLogin,
	setAuthFormToRegister,
} from "../../redux/slices/auth-slice";
import { useAppDispatch } from "../../redux/store";

const AuthButtons = () => {

	const dispatch = useAppDispatch();
	return (
		<>
			<Button
				borderRadius={0}
				variant='solid'
				onClick={() => {
					dispatch(setAuthFormToLogin());
					dispatch(onOpenModalAuth());
				}}>
				Iniciar sesión
			</Button>
			<Button
				borderRadius={0}
				variant='solid'
				onClick={() => {
					dispatch(setAuthFormToRegister());
					dispatch(onOpenModalAuth());
				}}>
				Registrarte
			</Button>
		</>
	);
};

export default AuthButtons;
