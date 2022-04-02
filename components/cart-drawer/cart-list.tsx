import { Stack } from "@chakra-ui/react";
import { memo } from "react";
import CartItem from "./cart-item";
import EmptyCartItem from "./empty-cart-item";

const CartList = () => {
	return (
		<Stack spacing={2} w='100%' h='500' py={5} overflowY='auto'>
			<CartItem />
			<CartItem />
			<CartItem />
			<CartItem />
			<CartItem />
			<CartItem />
			<CartItem />
			<CartItem />
			<CartItem />
			<CartItem />
			<CartItem />
			<CartItem />
			{/* <EmptyCartItem /> */}
		</Stack>
	);
};

export default memo(CartList);
