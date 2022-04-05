import { Stack, Button } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "../../../redux/slices/auth-slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

const AuthSocial = () => {
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector((state) => state.AuthSlice.isAuthLoading);
	return (
		<Stack flexDirection='column' spacing={4} mt={4}>
			<Button
				isLoading={isLoading}
				w={"full"}
				variant={"outline"}
				onClick={() => dispatch(signInWithGoogle())}
				leftIcon={<FcGoogle />}>
				Continua con Google
			</Button>
		</Stack>
	);
};

export default AuthSocial;
