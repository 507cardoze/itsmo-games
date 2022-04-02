import { Stack } from "@chakra-ui/react";
import { memo } from "react";
import MenuItem from "./menu-item";

const GameList = () => {
	return (
		<Stack spacing={2} mt={2}>
			<MenuItem handleOnClick={() => {}} label='Juegos de mesa' />
			<MenuItem handleOnClick={() => {}} label='Funko Pops' />
			<MenuItem handleOnClick={() => {}} label='Magic: The Gathering' />
			<MenuItem handleOnClick={() => {}} label='Yu-Gi-Oh!' />
			<MenuItem handleOnClick={() => {}} label='Pokemon' />
		</Stack>
	);
};

export default memo(GameList);
