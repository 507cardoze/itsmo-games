import { Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { memo } from "react";
import { onCloseDrawerMenu } from "../../redux/slices/auth-slice";
import { useAppDispatch } from "../../redux/store";
import MenuItem from "./menu-item";

const GameList = () => {
	const router = useRouter();

	const dispatch = useAppDispatch();

	const handleClick = (to: string) => {
		dispatch(onCloseDrawerMenu());
		router.push(to);
	};

	return (
		<Stack spacing={2} mt={2}>
			<MenuItem
				handleOnClick={() => handleClick("/yugioh")}
				label='Yu-Gi-Oh!'
			/>
			{/* <MenuItem handleOnClick={() => {}} label='Juegos de mesa' />
			<MenuItem handleOnClick={() => {}} label='Funko Pops' />
			<MenuItem handleOnClick={() => {}} label='Magic: The Gathering' />
			<MenuItem handleOnClick={() => {}} label='Pokemon' /> */}
		</Stack>
	);
};

export default memo(GameList);
