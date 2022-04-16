import { Box, Skeleton } from "@chakra-ui/react";
import React from "react";

const CalendarSkeleton = () => {
	return (
		<Box
			sx={{
				mb: 5,
				maxHeight: "500px",
				display: "block",
			}}>
			<Skeleton height='100px' />
			<Skeleton height='100px' />
			<Skeleton height='100px' />
			<Skeleton height='100px' />
			<Skeleton height='100px' />
		</Box>
	);
};

export default CalendarSkeleton;
