import { Grid } from "@chakra-ui/react";
import { memo } from "react";
import { CardType } from "../../redux/slices/card-list-slice";
import CardItem from "../card-item";

type PropsTypes = {
	isloading: boolean;
	cardList: CardType[];
};

const CardList = ({ isloading, cardList }: PropsTypes) => {
	return (
		<Grid
			templateColumns={{
				base: "repeat(2, 1fr)",
				md: "repeat(4, 1fr)",
				lg: "repeat(6, 1fr)",
			}}
			gap={2}
			m={5}>
			{isloading
				? "cargando..."
				: cardList.map((card, idx) => (
						<CardItem key={card.uid + idx.toString()} card={card} />
				  ))}
		</Grid>
	);
};

export default memo(CardList);
