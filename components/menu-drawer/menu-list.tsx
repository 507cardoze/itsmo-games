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
				handleOnClick={() => handleClick('/orders')}
				label="Mis ordenes"
				Icono={<Icon as={MdAssignmentTurnedIn} />}
			/>
			<MenuItem
				handleOnClick={() => handleClick('/account')}
				label="Mi Cuenta"
				Icono={<Icon as={MdAccountBox} />}
			/>
			{currentUser && currentUser.isAdmin && (
				<MenuItem
					handleOnClick={() => handleClick('/panel-admin/client-panel')}
					label="Admin Panel"
					Icono={<Icon as={MdOutlineWeb} />}
				/>
			)}
		</Stack>
	);
};

export default memo(MenuList);
