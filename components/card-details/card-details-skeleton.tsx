import { Skeleton, Stack } from "@chakra-ui/react";

const CardDetailsSkeleton = () => {
	return (
		<>
			<Stack mt={5} mx={5} my={5} direction='column'>
				<Stack direction='row'>
					<Skeleton w='50%' height='400px' />
					<Stack w='50%' height='400px'>
						<Skeleton height='100px' />
						<Skeleton height='100px' />
						<Skeleton height='100px' />
						<Skeleton height='100px' />
					</Stack>
				</Stack>
				<Skeleton w='100%' height='75px' />
				<Skeleton w='100%' height='75px' />
			</Stack>
		</>
	);
};

export default CardDetailsSkeleton;
