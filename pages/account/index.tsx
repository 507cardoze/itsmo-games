import { Box, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import MyAccountInfo from "../../components/my-account-info";
import { useAppSelector } from "../../redux/store";

const Account: NextPage = () => {
	const router = useRouter();

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
