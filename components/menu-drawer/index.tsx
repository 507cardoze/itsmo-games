import {
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
import { useAppSelector } from "../../redux/store";
import LogoBox from "../logo-box";
import AuthButtons from "../auth-buttons";

const MenuButton = () => {
	const [isOpen, setIsOpen] = useState(false);

	const currentUser = useAppSelector((store) => store.AuthSlice.currentUser);

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
						{currentUser ? (
							<AccountDisplay
								title='Anthony Cardoze'
								subTitle={fCurrency(300)}
							/>
						) : (
							<LogoBox />
						)}
						{currentUser && <MenuList />}
						<GameList />
						<Spacer />
						{currentUser ? <SignOutButton /> : <AuthButtons />}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default MenuButton;
