import { Button, Grid, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import CardDetails from "../../components/card-details";
import CardDetailsSkeleton from "../../components/card-details/card-details-skeleton";
import SinglesRelated from "../../components/singles-related";
import {
	getCardDetails,
	setResetCardDetail,
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
		[dispatch],
	);

	useEffect(() => {
		fetchData(tag, name);

		return () => {
			dispatch(stopFetchingCardList());
			dispatch(setResetCardDetail());
		};
	}, [dispatch, tag, name, fetchData]);

	return (
		<>
			<Stack>
				<Button
					variant='solid'
					sx={{ width: "180px", height: "45px" }}
					ml={2}
					mt={3}
					onClick={() => router.push("/yugioh")}>
					Volver al listado
				</Button>
			</Stack>
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
