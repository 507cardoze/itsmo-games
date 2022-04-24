import { Skeleton, Stack } from "@chakra-ui/react";

const TableSkeleton = () => {
	return (
		<Stack mb={5}>
			<Skeleton height='50px' />
			<Skeleton height='25px' />
			<Skeleton height='25px' />
			<Skeleton height='25px' />
			<Skeleton height='25px' />
			<Skeleton height='25px' />
			<Skeleton height='25px' />
			<Skeleton height='25px' />
			<Skeleton height='25px' />
			<Skeleton height='25px' />
			<Skeleton height='25px' />
		</Stack>
	);
};

export default TableSkeleton;
