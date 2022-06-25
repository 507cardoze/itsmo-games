import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useCallback, useEffect } from "react";
import Calendar from "../components/calendar";
import CalendarSkeleton from "../components/calendar/skeleton";
import GameList from "../components/game-list";
import { loadHomePageInfo } from "../redux/slices/home-page-slice";
import { useAppDispatch, useAppSelector } from '../redux/store';

const Home: NextPage = () => {
	const isLoading = useAppSelector(
		(store) => store.HomePageSlice.isLoadingHomePage
	);

	const dispatch = useAppDispatch();

	const fetchHomePageInfo = useCallback(async () => {
		await dispatch(loadHomePageInfo());
	}, [dispatch]);

	useEffect(() => {
		fetchHomePageInfo();
	}, [fetchHomePageInfo]);

	return (
		<Box sx={{ p: 5 }}>
			{!isLoading ? <Calendar /> : <CalendarSkeleton />}
			<GameList />
		</Box>
	);
};

export default Home;
