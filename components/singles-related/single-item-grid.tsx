import { GridItem } from "@chakra-ui/react";
import Singles from "../singles";

const SingleItemGrid = () => {
	return (
		<GridItem
			sx={{
				mb: 5,
				transition: "all 0.3s ease-in-out",
				cursor: "pointer",
				"&:hover": {
					transform: "scale(1.05)",
				},
			}}>
			<Singles />
		</GridItem>
	);
};

export default SingleItemGrid;
