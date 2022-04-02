import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";
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
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerBody></DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default MenuButton;
