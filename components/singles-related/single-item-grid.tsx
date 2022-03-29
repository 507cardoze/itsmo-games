import { GridItem } from "@chakra-ui/react";
import Singles from "../singles";
import NextLink from "next/link";

const SingleItemGrid = () => {
	return (
		<NextLink href={`./${"TN19-EN012"}?name=${"Dimension Shifter"}`} passHref>
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
		</NextLink>
	);
};

export default SingleItemGrid;
