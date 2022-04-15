import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import Calendar from "../components/calendar";
import GameList from "../components/game-list";

const Home: NextPage = () => {
	return (
		<Box sx={{ p: 5 }}>
			<Calendar />
			<GameList />
		</Box>
	);
};

export default Home;
