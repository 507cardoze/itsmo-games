import { Grid } from "@chakra-ui/react";
import { memo } from "react";
import { useAppSelector } from "../../redux/store";
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
		.map((card, idx) => (
			<CardItem key={card.uid + idx.toString()} card={card} />
		));

	return (
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
				"no hay resultados"
			)}
		</Grid>
	);
};

export default memo(CardList);
