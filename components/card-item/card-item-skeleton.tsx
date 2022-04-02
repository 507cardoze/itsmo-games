import { Skeleton, Stack } from "@chakra-ui/react";

const CardItemSkeleton = () => {
	return (
		<>
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
		</>
	);
};

export default CardItemSkeleton;

const CardSkeleton = () => {
	return (
		<Stack mb={5}>
			<Skeleton height='200px' />
			<Skeleton height='25px' />
			<Skeleton height='25px' />
		</Stack>
	);
};
