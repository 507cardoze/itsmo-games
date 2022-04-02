import { Stack } from "@chakra-ui/react";
import {
	MdAssignmentTurnedIn,
	MdAccountBox,
	MdOutlineWeb,
} from "react-icons/md";
import { Icon } from "@chakra-ui/react";
import { memo } from "react";
import MenuItem from "./menu-item";

const MenuList = () => {
	return (
		<Stack spacing={2} mt={1}>
			<MenuItem
				handleOnClick={() => {}}
				label='Mis Pedidos'
				Icono={<Icon as={MdAssignmentTurnedIn} />}
			/>
			<MenuItem
				handleOnClick={() => {}}
				label='Mi Cuenta'
				Icono={<Icon as={MdAccountBox} />}
			/>
			<MenuItem
				handleOnClick={() => {}}
				label='Admin Panel'
				Icono={<Icon as={MdOutlineWeb} />}
			/>
		</Stack>
	);
};

export default memo(MenuList);
