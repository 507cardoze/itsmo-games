import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import {
	onCloseDrawerMenu,
	signoutSession,
} from "../../redux/slices/auth-slice";
import { useAppDispatch } from "../../redux/store";

const SignOutButton = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const handleOnSignout = async () => {
		await dispatch(signoutSession("withToast"));
		dispatch(onCloseDrawerMenu());
		router.push("/");
	};
	return (
		<Button
			onClick={handleOnSignout}
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
