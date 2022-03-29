import type { NextPage } from "next";
import Head from "next/head";
import HeaderLogo from "../components/header-logo";
import Toolbar from "../components/tool-bar";
import CardList from "../components/card-list";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Itsmo games inventario</title>
			</Head>
			<HeaderLogo />
			<Toolbar />
			<CardList />
		</>
	);
};

export default Home;
