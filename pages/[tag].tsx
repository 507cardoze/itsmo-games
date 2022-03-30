import { Grid } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import CardDetails from "../components/card-details";
import HeaderLogo from "../components/header-logo";
import SinglesRelated from "../components/singles-related";
import {
	getDetailsByname,
	startFetchingCardList,
	stopFetchingCardList,
} from "../redux/slices/card-list-slice";
import { useAppDispatch, useAppSelector } from "../redux/store";

const CardDetailsPage: NextPage = () => {
	const router = useRouter();
	const { tag, name } = router.query;

	const dispatch = useAppDispatch();
	const cardDetail = useAppSelector((store) => store.CartListSlice.cardDetail);
	const isLoadingCardList = useAppSelector(
		(store) => store.CartListSlice.isLoadingCardList,
	);

	const fetchData = useCallback(async () => {
		dispatch(startFetchingCardList());
		await dispatch(getDetailsByname());
		dispatch(stopFetchingCardList());
	}, []);

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<HeaderLogo />
			<Grid
				templateColumns={{
					base: "repeat(1, 1fr)",
					lg: "repeat(2, 1fr)",
				}}
				gap={2}>
				<CardDetails />
				<SinglesRelated />
			</Grid>
		</>
	);
};

export default CardDetailsPage;
