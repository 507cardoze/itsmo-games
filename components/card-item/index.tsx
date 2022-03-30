import { GridItem, Stack } from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { CardType } from "../../redux/slices/card-list-slice";
import Singles from "../singles";

const CardItem = ({ card }: { card: CardType }) => {
	return (
		<NextLink href={`./${card.printTag}?name=${card.name}`} passHref>
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
					url={card.url}
					sx={{ width: "100%", height: "250px", objectFit: "contain" }}
					alt={card.name}
				/>
				<Stack sx={{ textAlign: "center", mt: 2 }}>
					<Heading
						as='h3'
						size='lg'
						color='black'
						sx={{ lineHeight: 0.8, fontSize: "20px" }}>
						{card.name}
					</Heading>
					<Text color='black' sx={{ lineHeight: 0.8, fontSize: "14px" }}>
						{card.printTag}
					</Text>
				</Stack>
			</GridItem>
		</NextLink>
	);
};

export default CardItem;
