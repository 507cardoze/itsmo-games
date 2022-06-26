import { Box, Button, Grid } from '@chakra-ui/react';
import { memo, useCallback, useEffect } from 'react';
import { getCards, getMoreCards } from '../../redux/slices/yugioh-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import CardItem from '../card-item';
import CardItemSkeleton from '../card-item/card-item-skeleton';

const CardList = () => {
	const dispatch = useAppDispatch();
	const filteredCardList = useAppSelector((store) =>
		store.YugiohCardListSlice.cardList.filter((card) => card.isActive === true)
	);
	const isloading = useAppSelector(
		(store) => store.YugiohCardListSlice.isLoadingCardList
	);

	const CardListElements = filteredCardList.map((card) => (
		<CardItem key={card.uid} card={card} />
	));

	const handlegetMoreCards = async () => {
		if (filteredCardList.length) {
			await dispatch(
				getMoreCards({
					last: filteredCardList[filteredCardList.length - 1].uid,
				})
			);
		}
	};

	const getData = useCallback(async () => {
		if (filteredCardList.length < 12) await dispatch(getCards());
	}, []);

	useEffect(() => {
		getData();
	}, []);

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
				{isloading ? <CardItemSkeleton /> : CardListElements}
			</Grid>
			<Box sx={{ width: '100%', p: 2 }}>
				<Button
					variant="ghost"
					size="sm"
					rounded="lg"
					shadow="lg"
					onClick={handlegetMoreCards}
					w="100%"
					alignSelf="center"
					sx={{
						mt: 5,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						minH: '50px',
					}}>
					Ver más
				</Button>
			</Box>
		</>
	);
};

export default memo(CardList);
