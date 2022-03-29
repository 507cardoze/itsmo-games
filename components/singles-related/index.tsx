import { Box, Grid, Heading } from "@chakra-ui/react";
import SingleItemGrid from "./single-item-grid";

const SinglesRelated = () => {
	return (
		<Box
			mt={10}
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}>
			<Heading sx={{ textAlign: "center" }}>Singles relacionados</Heading>
			<Grid
				templateColumns={{
					base: "repeat(3, 1fr)",
					// md: "repeat(1, 1fr)",
					lg: "repeat(6, 1fr)",
					// xl: "repeat(8, 1fr)",
				}}
				sx={{ m: 5 }}
				gap={2}>
				<SingleItemGrid />
				<SingleItemGrid />
				<SingleItemGrid />
				<SingleItemGrid />
			</Grid>
		</Box>
	);
};

export default SinglesRelated;
