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
import MenuList from "./menu-list";
import GameList from "./game-list";
import SignOutButton from "./signout-button";
import AccountDisplay from "../account-display";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import AuthButtons from "../auth-buttons";
import {
	onCloseDrawerMenu,
	onOpenDrawerMenu,
} from "../../redux/slices/auth-slice";

const MenuButton = () => {

	const dispatch = useAppDispatch();

	const isOpen = useAppSelector((store) => store.AuthSlice.isDrawerOpen);

	const currentUser = useAppSelector((store) => store.AuthSlice.currentUser);

	return (
		<>
			<IconButton
				icon={<HamburgerIcon />}
				variant='solid'
				sx={{ fontSize: "2xl" }}
				aria-label='menu drawer swicher'
				onClick={() => dispatch(onOpenDrawerMenu())}
			/>
			<Drawer
				isOpen={isOpen}
				placement='left'
				onClose={() => dispatch(onCloseDrawerMenu())}>
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
						<AccountDisplay />
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
