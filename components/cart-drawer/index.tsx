import {
	Divider,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	IconButton,
	Spacer,
} from "@chakra-ui/react";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Icon } from "@chakra-ui/react";
import QtyIndicator from "./qty-indicator";
import { useState } from "react";
import AccountDisplay from "../account-display";
import CartList from "./cart-list";
import CheckoutDetails from "./checkout-details";

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
					<DrawerCloseButton sx={{ color: "white" }} />
					<DrawerBody
						w='100%'
						sx={{
							p: 0,
							m: 0,
							display: "flex",
							justifyContent: "flex-start",
							alignItems: "center",
							flexDirection: "column",
						}}>
						<AccountDisplay />
						<CartList />
						<Spacer as={Divider} />
						<CheckoutDetails />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</QtyIndicator>
	);
};

export default CartButton;
