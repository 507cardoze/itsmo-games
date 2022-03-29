import { GridItem, Stack } from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import Singles from "../singles";

const CardItem = () => {
	return (
		<NextLink href={`./${"TN19-EN012"}?name=${"Dimension Shifter"}`} passHref>
			<GridItem
				w='100%'
				sx={{
					mb: 5,
					transition: "all 0.3s ease-in-out",
					cursor: "pointer",
					"&:hover": {
						transform: "scale(1.05)",
					},
				}}>
				<Singles
					url='https://static-3.studiobebop.net/ygo_data/card_images/Dimension_Shifter.jpg'
					sx={{ width: "100%", height: "250px", objectFit: "contain" }}
					alt='card-text'
				/>
				<Stack sx={{ textAlign: "center", mt: 2 }}>
					<Heading
						as='h3'
						size='lg'
						color='black'
						sx={{ lineHeight: 0.8, fontSize: "20px" }}>
						Dimension Shifter
					</Heading>
					<Text color='black' sx={{ lineHeight: 0.8, fontSize: "14px" }}>
						TN19-EN012
					</Text>
				</Stack>
			</GridItem>
		</NextLink>
	);
};

export default CardItem;
