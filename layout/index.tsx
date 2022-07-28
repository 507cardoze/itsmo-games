import { Box, Spacer } from "@chakra-ui/react";
import { ReactNode, useEffect } from 'react';
import HeaderLogo from "../components/header-logo";
import {
	AuthModal,
	LenguageModal,
	LenguageCartModal,
	ClientOrderModal,
} from '../components/modals/';
import { useAppDispatch } from "../redux/store";
import { auth } from "../firebase/firebase-config";
import {
	isUserAuthenticated,
	startAuthLoading,
	stopAuthLoading,
} from "../redux/slices/auth-slice";
import Footer from "../components/footer";

type PropsTypes = { children: ReactNode };

const Layout = ({ children }: PropsTypes) => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		const unSubcribe = auth.onAuthStateChanged(async (currentUser) => {
			dispatch(startAuthLoading());
			await dispatch(isUserAuthenticated(currentUser));
			dispatch(stopAuthLoading());
		});
		return () => unSubcribe();
	}, []);

	const renderModal = () =>
		typeof window !== 'undefined' ? (
			<>
				<LenguageModal />
				<LenguageCartModal />
				<AuthModal />
				<ClientOrderModal />
			</>
		) : (
			<></>
		);

	return (
		<Box
			sx={{
				overFlowY: "hidden",
				height: "100vh",
				display: "flex",
				flexDirection: "column",
			}}>
			<HeaderLogo />
			{renderModal()}
			{children}
			<Spacer />
			<Footer />
		</Box>
	);
};

export default Layout;
