import { Stack } from "@chakra-ui/react";
import { memo } from "react";
import { useAppSelector } from "../../redux/store";
import CartItem from "./cart-item";
import EmptyCartItem from "./empty-cart-item";

const CartList = () => {
	const cartItems = useAppSelector((store) => store.cartListSlice.items);

	return (
		<Stack spacing={2} w='100%' py={5} overflowY='auto'>
			{cartItems.length ? (
				cartItems.map((product) => <CartItem product={product} />)
			) : (
				<EmptyCartItem />
			)}
		</Stack>
	);
};

export default memo(CartList);
