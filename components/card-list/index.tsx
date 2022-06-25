import { Grid } from "@chakra-ui/react";
import { memo } from 'react';
import { useAppSelector } from '../../redux/store';
import CardItem from '../card-item';
import CardItemSkeleton from '../card-item/card-item-skeleton';

const CardList = () => {
	const cardList = useAppSelector(
		(store) => store.YugiohCardListSlice.cardList
	);
	const isloading = useAppSelector(
		(store) => store.YugiohCardListSlice.isLoadingCardList
	);

	const filteredCardList = cardList.map((card) =>
		card.isActive ? <CardItem key={card.uid} card={card} /> : null
	);

	return (
		<>
			<Grid
				templateColumns={{
					base: 'repeat(2, 1fr)',
					md: 'repeat(4, 1fr)',
					lg: 'repeat(6, 1fr)',
				}}
				gap={2}
				m={5}>
				{isloading ? <CardItemSkeleton /> : filteredCardList}
			</Grid>
		</>
	);
};

export default memo(CardList);
