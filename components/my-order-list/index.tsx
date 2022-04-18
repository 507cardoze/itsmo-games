import { Grid, Heading } from "@chakra-ui/react";
import { CartItemType } from "../../redux/slices/carrito-slice";
import MyOrderItem from "./my-orders-item";

type PropsTypes = {
	items: CartItemType[];
};

const MyOrderList = ({ items }: PropsTypes) => {
	return (
		<>
			<Heading textAlign='center' my={5}>
				Lista de productos
			</Heading>
			<Grid
				templateColumns={
					items.length
						? {
								base: "repeat(2, 1fr)",
								md: "repeat(4, 1fr)",
								lg: "repeat(6, 1fr)",
						  }
						: "1fr"
				}
				gap={2}
				m={5}>
				{items.length ? (
					items.map((product) => (
						<MyOrderItem key={product.uid} product={product} />
					))
				) : (
					<>vacio...</>
				)}
			</Grid>
		</>
	);
};

export default MyOrderList;
