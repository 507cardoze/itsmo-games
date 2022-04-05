import { Stack, Button } from "@chakra-ui/react";
import { SyntheticEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import {
	onCloseDrawerMenu,
	onCloseModalAuth,
	signInWithGoogle,
} from "../../../redux/slices/auth-slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

const AuthSocial = () => {
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector((state) => state.AuthSlice.isAuthLoading);

	const handleLoginWithGoogle = async (event: SyntheticEvent) => {
		event.preventDefault();
		await dispatch(signInWithGoogle());
		dispatch(onCloseModalAuth());
		dispatch(onCloseDrawerMenu());
	};
	return (
		<Stack flexDirection='column' spacing={4} mt={4}>
			<Button
				isLoading={isLoading}
				w={"full"}
				variant={"outline"}
				onClick={handleLoginWithGoogle}
				leftIcon={<FcGoogle />}>
				Continua con Google
			</Button>
		</Stack>
	);
};

export default AuthSocial;
