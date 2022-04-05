import { Grid } from "@chakra-ui/react";
import { useAppSelector } from "../../redux/store";
import EmptyCartItem from "../cart-drawer/empty-cart-item";
import CheckoutItem from "./checkout-item";

const CheckoutList = () => {
	const cartItems = useAppSelector((store) => store.cartListSlice.items);
	return (
		<Grid
			templateColumns={
				cartItems.length
					? {
							base: "repeat(2, 1fr)",
							md: "repeat(4, 1fr)",
							lg: "repeat(6, 1fr)",
					  }
					: "1fr"
			}
			gap={2}
			m={5}>
			{cartItems.length ? (
				cartItems.map((product) => (
					<CheckoutItem key={product.uid} product={product} />
				))
			) : (
				<EmptyCartItem />
			)}
		</Grid>
	);
};

export default CheckoutList;
