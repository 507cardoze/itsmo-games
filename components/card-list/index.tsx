import { Grid } from "@chakra-ui/react";
import React from "react";
import CardItem from "../card-item";

const CardList = () => {
	return (
		<Grid
			templateColumns={{
				base: "repeat(2, 1fr)",
				md: "repeat(3, 1fr)",
				lg: "repeat(4, 1fr)",
				xl: "repeat(6, 1fr)",
			}}
			gap={2}
			m={5}>
			<CardItem />
			<CardItem />
			<CardItem />
			<CardItem />
			<CardItem />
			<CardItem />
			<CardItem />
			<CardItem />
			<CardItem />
			<CardItem />
		</Grid>
	);
};

export default CardList;
