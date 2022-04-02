import { Skeleton, Stack } from "@chakra-ui/react";

const CardDetailsSkeleton = () => {
	return (
		<Stack mt={10} ml={5} direction='row'>
			<Skeleton w='50%' height='400px' />
			<Stack w='50%' height='400px'>
				<Skeleton height='100px' />
				<Skeleton height='100px' />
				<Skeleton height='100px' />
				<Skeleton height='100px' />
			</Stack>
		</Stack>
	);
};

export default CardDetailsSkeleton;
