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
import AccountDisplay from "../account-display";
import CartList from "./cart-list";
import CheckoutDetails from "./checkout-details";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
	setClosecartDrawerOpen,
	setOpencartDrawerOpen,
} from "../../redux/slices/carrito-slice";

const CartButton = () => {
	const dispatch = useAppDispatch();

	const isOpen = useAppSelector((store) => store.cartListSlice.cartDrawerOpen);

	return (
		<QtyIndicator>
			<IconButton
				icon={<Icon as={MdOutlineShoppingBag} />}
				variant='solid'
				sx={{ fontSize: "2xl" }}
				aria-label='cart drawer swicher'
				onClick={() => dispatch(setOpencartDrawerOpen())}
			/>
			<Drawer
				isOpen={isOpen}
				placement='right'
				onClose={() => dispatch(setClosecartDrawerOpen())}>
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
