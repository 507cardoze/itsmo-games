import type { NextPage } from "next";
import HeaderLogo from "../components/header-logo";
import Toolbar from "../components/tool-bar";
import CardList from "../components/card-list";

const Home: NextPage = () => {
	return (
		<>
			<HeaderLogo />
			<Toolbar />
			<CardList />
		</>
	);
};

export default Home;
