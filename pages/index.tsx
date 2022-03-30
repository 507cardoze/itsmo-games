import type { NextPage } from "next";
import HeaderLogo from "../components/header-logo";
import Toolbar from "../components/tool-bar";
import CardList from "../components/card-list";
import { useCallback, useEffect } from "react";
import {
	getCards,
	startFetchingCardList,
	stopFetchingCardList,
} from "../redux/slices/card-list-slice";
import { useAppDispatch, useAppSelector } from "../redux/store";

const Home: NextPage = () => {
	const dispatch = useAppDispatch();
	const cardList = useAppSelector((store) => store.CartListSlice.cardList);
	const isLoadingCardList = useAppSelector(
		(store) => store.CartListSlice.isLoadingCardList,
	);

	const fetchData = useCallback(async () => {
		dispatch(startFetchingCardList());
		await dispatch(getCards());
		dispatch(stopFetchingCardList());
	}, []);

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<>
			<HeaderLogo />
			<Toolbar />
			<CardList isloading={isLoadingCardList} cardList={cardList} />
		</>
	);
};

export default Home;
