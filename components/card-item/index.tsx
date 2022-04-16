import { GridItem, Stack } from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { YugiohCardType } from "../../redux/slices/yugioh-slice";
import Singles from "../singles";

const CardItem = ({ card }: { card: YugiohCardType }) => {
	return (
		<NextLink href={`./yugioh/${card.printTag}?name=${card.name}`} passHref>
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
						sx={{ lineHeight: 0.8, fontSize: "18px" }}>
						{card.name}
					</Heading>
					<Text color='black' sx={{ lineHeight: 0.8, fontSize: "12px" }}>
						{card.printTag}
					</Text>
					<Text color='black' sx={{ lineHeight: 0.8, fontSize: "12px" }}>
						{card.rarity}
					</Text>
					<Text
						color='black'
						sx={{ lineHeight: 0.8, fontSize: "12px", fontStyle: "italic" }}>
						{card.cardType}
					</Text>
				</Stack>
			</GridItem>
		</NextLink>
	);
};

export default CardItem;
