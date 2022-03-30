import { Box } from "@chakra-ui/react";
import { ReactNode, useCallback, useEffect } from "react";
import {
	getCards,
	startFetchingCardList,
	stopFetchingCardList,
} from "../redux/slices/card-list-slice";
import { useAppDispatch } from "../redux/store";

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
	return <Box>{children}</Box>;
};

export default Layout;
