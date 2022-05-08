import { Grid } from "@chakra-ui/react";
import { memo, useCallback, useEffect } from "react";
import {
	getFirstCards,
	getMoreCards,
	startFetchingCardList,
	stopFetchingCardList,
} from "../../redux/slices/yugioh-slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import CardItem from "../card-item";
import CardItemSkeleton from "../card-item/card-item-skeleton";

const CardList = () => {
	const cardList = useAppSelector(
		(store) => store.YugiohCardListSlice.cardList,
	);
	const isloading = useAppSelector(
		(store) => store.YugiohCardListSlice.isLoadingCardList,
	);
	const searchTerm = useAppSelector(
		(store) => store.YugiohCardListSlice.searchTerm,
	);

	const filteredCardList = cardList
		.filter((card) =>
			card.name?.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()),
		)
		.map((card) =>
			card.isActive ? <CardItem key={card.uid} card={card} /> : null,
		);

	const dispatch = useAppDispatch();
	const fetchData = useCallback(async () => {
		dispatch(startFetchingCardList());
		await dispatch(getFirstCards());
		dispatch(stopFetchingCardList());
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const handleScroll = async () => {
		const bottom =
			Math.ceil(window.innerHeight + window.scrollY) >=
			document.documentElement.scrollHeight;

		if (bottom) {
			await dispatch(getMoreCards());
		}
	};
	useEffect(() => {
		window.addEventListener("scroll", handleScroll, {
			passive: true,
		});

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<>
			<Grid
				templateColumns={{
					base: "repeat(2, 1fr)",
					md: "repeat(4, 1fr)",
					lg: "repeat(6, 1fr)",
				}}
				gap={2}
				m={5}>
				{isloading ? (
					<CardItemSkeleton />
				) : filteredCardList.length > 0 ? (
					filteredCardList
				) : (
					"No hay resultados."
				)}
			</Grid>
		</>
	);
};

export default memo(CardList);
