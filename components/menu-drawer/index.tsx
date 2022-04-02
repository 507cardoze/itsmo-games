import {
	Box,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	IconButton,
	Spacer,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";
import MenuList from "./menu-list";
import GameList from "./game-list";
import SignOutButton from "./signout-button";
import AccountDisplay from "../account-display";
import { fCurrency } from "../../common/formatNumber";

const MenuButton = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<IconButton
				icon={<HamburgerIcon />}
				variant='solid'
				sx={{ fontSize: "2xl" }}
				aria-label='menu drawer swicher'
				onClick={() => setIsOpen(true)}
			/>
			<Drawer isOpen={isOpen} placement='left' onClose={() => setIsOpen(false)}>
				<DrawerOverlay />
				<DrawerContent bg='#c3c3c3'>
					<DrawerCloseButton sx={{ color: "white" }} />
					<DrawerBody
						w='100%'
						sx={{
							p: 0,
							m: 0,
							display: "flex",
							justifyContent: "flex-start",
							flexDirection: "column",
						}}>
						<AccountDisplay title='Anthony Cardoze' subTitle={fCurrency(300)} />
						<MenuList />
						<GameList />
						<Spacer />
						<SignOutButton />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default MenuButton;
