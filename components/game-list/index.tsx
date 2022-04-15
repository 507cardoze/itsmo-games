import { Grid } from "@chakra-ui/react";
import GameItem from "./game-item";

const GameList = () => {
	const games = [
		{
			url: "https://www.licensingmagazine.com/wp-content/uploads/2020/02/card_game_yugioh.jpg",
			alt: "yugioh-trading-card",
			to: "/yugioh",
			comingSoon: false,
		},
		{
			url: "https://assets.pokemon.com/assets//cms2/img/trading-card-game/_tiles/tcg_product_gallery_169_en.jpg",
			alt: "pokemon trading card",
			to: "",
			comingSoon: true,
		},
		{
			url: "https://p.kindpng.com/picc/s/717-7173299_magic-the-gathering-logo-png-magic-the-gathering.png",
			alt: "magic-trading-card",
			to: "",
			comingSoon: true,
		},
		{
			url: "https://i.pinimg.com/736x/38/97/06/389706e2725fc9fb6dab26237b70b65c.jpg",
			alt: "trading-card",
			to: "",
			comingSoon: true,
		},
	];

	return (
		<Grid
			templateColumns={{
				base: "repeat(2, 1fr)",
				sm: "repeat(3, 1fr)",
				md: "repeat(4, 1fr)",
				lg: "repeat(5, 1fr)",
			}}
			gap={6}>
			{games.map((game, idx) => (
				<GameItem
					url={game.url}
					alt={game.alt}
					to={game.to}
					comingSoon={game.comingSoon}
					key={idx}
				/>
			))}
		</Grid>
	);
};

export default GameList;
