import { GridItem, Heading, Stack, Text } from "@chakra-ui/react";
import { fCurrency } from "../../common/formatNumber";
import { CartItemType } from "../../redux/slices/carrito-slice";
import Singles from "../singles";

type PropsTypes = {
	product: CartItemType;
};

const MyOrderItem = ({ product }: PropsTypes) => {
	return (
		<GridItem
			w='100%'
			h='355px'
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
				<Text sx={{ lineHeight: 0.6, fontSize: "0.7rem", fontWeight: "bold" }}>
					{fCurrency(product.price)}
				</Text>
				<Stack w='100%' direction='row' justifyContent='center' spacing={2}>
					{product.quantitySpanish && (
						<Text sx={{ lineHeight: 0.6, fontSize: "0.6rem" }}>
							ES: x{product.quantitySpanish}
						</Text>
					)}
					{product.quantityEnglish && (
						<Text sx={{ lineHeight: 0.6, fontSize: "0.6rem" }}>
							EN: x{product.quantityEnglish}
						</Text>
					)}
				</Stack>
			</Stack>
		</GridItem>
	);
};

export default MyOrderItem;
