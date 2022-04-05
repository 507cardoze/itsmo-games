import { Button, Grid } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useLayoutEffect } from "react";
import CardDetails from "../../components/card-details";
import CardDetailsSkeleton from "../../components/card-details/card-details-skeleton";
import SinglesRelated from "../../components/singles-related";
import {
	getCardDetails,
	startFetchingCardList,
	stopFetchingCardList,
} from "../../redux/slices/yugioh-slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const CardDetailsPage: NextPage = () => {
	const router = useRouter();
	const { tag, name } = router.query;

	const dispatch = useAppDispatch();
	const isLoadingCardList = useAppSelector(
		(store) => store.YugiohCardListSlice.isLoadingCardList,
	);
	const cardDetail = useAppSelector(
		(store) => store.YugiohCardListSlice.cardDetail,
	);

	const fetchData = useCallback(
		async (tag, name) => {
			dispatch(startFetchingCardList());
			await dispatch(getCardDetails({ tag, name }));
			dispatch(stopFetchingCardList());
		},
		[tag, name],
	);

	useLayoutEffect(() => {
		fetchData(tag, name);
	}, [tag, name]);

	return (
		<>
			<Button
				variant='solid'
				ml={2}
				mt={2}
				onClick={() => router.push("/yugioh")}>
				Volver al listado
			</Button>
			<Grid
				templateColumns={{
					base: "repeat(1, 1fr)",
					lg: "repeat(2, 1fr)",
				}}
				gap={2}>
				{isLoadingCardList || !cardDetail ? (
					<CardDetailsSkeleton />
				) : (
					<CardDetails />
				)}
				<SinglesRelated />
			</Grid>
		</>
	);
};

export default CardDetailsPage;
