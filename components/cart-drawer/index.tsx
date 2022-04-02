import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	IconButton,
} from "@chakra-ui/react";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Icon } from "@chakra-ui/react";
import QtyIndicator from "./qty-indicator";
import { useState } from "react";

const CartButton = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<QtyIndicator qty={0}>
			<IconButton
				icon={<Icon as={MdOutlineShoppingBag} />}
				variant='solid'
				sx={{ fontSize: "2xl" }}
				aria-label='cart drawer swicher'
				onClick={() => setIsOpen(true)}
			/>
			<Drawer
				isOpen={isOpen}
				placement='right'
				onClose={() => setIsOpen(false)}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerBody></DrawerBody>
				</DrawerContent>
			</Drawer>
		</QtyIndicator>
	);
};

export default CartButton;
