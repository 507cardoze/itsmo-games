import { Stack } from "@chakra-ui/react";
import {
	MdAssignmentTurnedIn,
	MdAccountBox,
	MdOutlineWeb,
} from "react-icons/md";
import { Icon } from "@chakra-ui/react";
import { memo } from "react";
import MenuItem from "./menu-item";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useRouter } from "next/router";
import { onCloseDrawerMenu } from "../../redux/slices/auth-slice";

const MenuList = () => {
	const currentUser = useAppSelector((store) => store.AuthSlice.currentUser);

	const router = useRouter();

	const dispatch = useAppDispatch();

	const handleClick = (to: string) => {
		dispatch(onCloseDrawerMenu());
		router.push(to);
	};

	return (
		<Stack spacing={2} mt={1}>
			<MenuItem
				handleOnClick={() => handleClick("/")}
				label='Mis Pedidos'
				Icono={<Icon as={MdAssignmentTurnedIn} />}
			/>
			<MenuItem
				handleOnClick={() => handleClick("/")}
				label='Mi Cuenta'
				Icono={<Icon as={MdAccountBox} />}
			/>
			{currentUser?.isAdmin && (
				<MenuItem
					handleOnClick={() => handleClick("/")}
					label='Admin Panel'
					Icono={<Icon as={MdOutlineWeb} />}
				/>
			)}
		</Stack>
	);
};

export default memo(MenuList);
