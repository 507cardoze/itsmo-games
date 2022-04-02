import { Grid } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import CardDetails from "../components/card-details";
import CardDetailsSkeleton from "../components/card-details/card-details-skeleton";
import SinglesRelated from "../components/singles-related";
import {
	getCardDetails,
	startFetchingCardList,
	stopFetchingCardList,
} from "../redux/slices/card-list-slice";
import { useAppDispatch, useAppSelector } from "../redux/store";

const CardDetailsPage: NextPage = () => {
	const router = useRouter();
	const { tag, name } = router.query;

	const dispatch = useAppDispatch();
	const isLoadingCardList = useAppSelector(
		(store) => store.CardListSlice.isLoadingCardList,
	);

	const fetchData = useCallback(async () => {
		dispatch(startFetchingCardList());
		await dispatch(getCardDetails({ tag, name }));
		dispatch(stopFetchingCardList());
	}, [dispatch, tag, name]);

	useEffect(() => {
		fetchData();
	}, [fetchData, tag, name]);

	return (
		<>
			<Grid
				templateColumns={{
					base: "repeat(1, 1fr)",
					lg: "repeat(2, 1fr)",
				}}
				gap={2}>
				{isLoadingCardList ? <CardDetailsSkeleton /> : <CardDetails />}
				<SinglesRelated />
			</Grid>
		</>
	);
};

export default CardDetailsPage;
