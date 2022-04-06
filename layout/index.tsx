import { Box } from "@chakra-ui/react";
import { ReactNode, useCallback, useEffect } from "react";
import HeaderLogo from "../components/header-logo";
import { AuthModal, LenguageModal } from "../components/modals/";
import {
	getCards,
	startFetchingCardList,
	stopFetchingCardList,
} from "../redux/slices/yugioh-slice";
import { useAppDispatch } from "../redux/store";
import { auth } from "../firebase/firebase-config";
import {
	isUserAuthenticated,
	startAuthLoading,
	stopAuthLoading,
} from "../redux/slices/auth-slice";

type PropsTypes = { children: ReactNode };

const Layout = ({ children }: PropsTypes) => {
	const dispatch = useAppDispatch();
	const fetchData = useCallback(async () => {
		dispatch(startFetchingCardList());
		await dispatch(getCards());
		dispatch(stopFetchingCardList());
	}, []);

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		const unSubcribe = auth.onAuthStateChanged(async (currentUser) => {
			dispatch(startAuthLoading());
			await dispatch(isUserAuthenticated(currentUser));
			dispatch(stopAuthLoading());
		});
		return () => unSubcribe();
	}, []);

	const renderModal = () =>
		typeof window !== "undefined" ? (
			<>
				<LenguageModal />
				<AuthModal />
			</>
		) : (
			<></>
		);

	return (
		<Box sx={{ overFlow: "hidden", minHeight: "100vh" }}>
			<HeaderLogo />
			{renderModal()}
			{children}
		</Box>
	);
};

export default Layout;
