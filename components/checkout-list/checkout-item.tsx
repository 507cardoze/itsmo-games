import { GridItem, Heading, Stack, Text } from "@chakra-ui/react";
import { fCurrency } from "../../common/formatNumber";
import { CartItemType } from "../../redux/slices/carrito-slice";
import Singles from "../singles";
import NextLink from "next/link";

type PropsTypes = {
	product: CartItemType;
};

const CheckoutItem = ({ product }: PropsTypes) => {
	return (
		<NextLink href={`./yugioh/${product.tag}?name=${product.name}`} passHref>
			<GridItem
				w='100%'
				sx={{
					mb: 5,
					transition: "all 0.3s ease-in-out",
					cursor: "pointer",
					"&:hover": {
						transform: "scale(1.05)",
					},
				}}>
				<Singles
					url={product.url}
					sx={{ width: "100%", height: "250px", objectFit: "contain" }}
					alt={product.name}
				/>
				<Stack sx={{ textAlign: "center", mt: 2 }}>
					<Heading
						as='h3'
						size='lg'
						color='black'
						sx={{ lineHeight: 0.8, fontSize: "20px" }}>
						{product.name}
					</Heading>
					<Text color='black' sx={{ lineHeight: 0.8, fontSize: "14px" }}>
						{product.tag}
					</Text>
					<Text
						sx={{ lineHeight: 0.6, fontSize: "0.7rem", fontWeight: "bold" }}>
						{fCurrency(product.price)} x {product.quantity}
					</Text>
				</Stack>
			</GridItem>
		</NextLink>
	);
};

export default CheckoutItem;
