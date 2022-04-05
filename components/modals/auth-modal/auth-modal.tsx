import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalFooter,
	Button,
} from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "../../../redux/store";
import { onCloseModalAuth } from "../../../redux/slices/auth-slice";
import { LoginForm, RegisterForm, AuthSocial } from "../../forms";

function AuthModal() {
	const dispatch = useAppDispatch();
	const isOpenAuthModal = useAppSelector(
		(state) => state.AuthSlice.isOpenAuthModal,
	);
	const authForm = useAppSelector((state) => state.AuthSlice.authForm);

	return (
		<Modal
			onClose={() => dispatch(onCloseModalAuth())}
			size='xl'
			isOpen={isOpenAuthModal}>
			<ModalOverlay />
			<ModalContent>
				<ModalBody>
					<AuthSocial />
					{authForm === "login" ? <LoginForm /> : <RegisterForm />}
				</ModalBody>
				<ModalFooter justifyContent='center' alignItems='center'>
					<Button size='sm' onClick={() => dispatch(onCloseModalAuth())}>
						Cancelar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default AuthModal;
