import type { NextPage } from "next";
import CardList from "../../components/card-list";
import Toolbar from "../../components/tool-bar";

const YugiohLobby: NextPage = () => {
	return (
		<>
			<Toolbar />
			<CardList />
		</>
	);
};

export default YugiohLobby;
