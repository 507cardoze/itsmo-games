import { Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import MyAccountInfo from "../../components/my-account-info";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const Account = () => {
	const router = useRouter();

	const dispatch = useAppDispatch();

	const currentUser = useAppSelector((store) => store.AuthSlice.currentUser);

	useEffect(() => {
		if (!currentUser) {
			router.push("/");
		}
	}, [currentUser, router]);

	return (
		<Box px={10} sx={{ overflowY: "auto" }}>
			<Heading my={10}>Mi cuenta</Heading>
			<MyAccountInfo />
		</Box>
	);
};

export default Account;
