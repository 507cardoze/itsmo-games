import type { NextPage } from "next";
import Toolbar from "../components/tool-bar";
import CardList from "../components/card-list";

const Home: NextPage = () => {
	return (
		<>
			<Toolbar />
			<CardList />
		</>
	);
};

export default Home;
