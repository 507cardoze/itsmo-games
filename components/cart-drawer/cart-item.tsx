import { Box, Button, Image, Spacer, Stack, Text } from "@chakra-ui/react";
import { fCurrency } from "../../common/formatNumber";
import { Icon } from "@chakra-ui/react";
import {
	MdAdd,
	MdOutlineDeleteOutline,
	MdOutlineDangerous,
} from "react-icons/md";
import { SyntheticEvent } from "react";
import {
	addItem,
	CartItemType,
	deleteItem,
	lessItem,
} from "../../redux/slices/carrito-slice";
import { useAppDispatch } from "../../redux/store";

type PropsTypes = {
	product: CartItemType;
};

const CartItem = ({ product }: PropsTypes) => {
	const dispatch = useAppDispatch();
	return (
		<Stack direction='row' mt={2}>
			<Box w='30%'>
				<Image
					src={product.url}
					fallbackSrc='/dorso.jpeg'
					loading='lazy'
					onError={(e: SyntheticEvent<HTMLImageElement, Event>) =>
						(e.currentTarget.src = "/dorso.jpeg")
					}
					alt='image'
					sx={{
						width: "100%",
						height: "85px",
						objectFit: "contain",
					}}
				/>
			</Box>
			<Stack spacing={2} w='30%' justifyContent='center'>
				<Text sx={{ lineHeight: 1, fontSize: "0.8rem" }}>{product.name}</Text>
				<Text sx={{ lineHeight: 0.6, fontSize: "0.6rem" }}>{product.tag}</Text>
				<Text sx={{ lineHeight: 0.6, fontSize: "0.7rem", fontWeight: "bold" }}>
					{fCurrency(product.price)} x {product.quantity}
				</Text>
			</Stack>
			<Spacer />
			<Stack direction='row' justifyContent='center' alignItems='center' pr={5}>
				<Button
					variant='outline'
					size='xs'
					onClick={() => dispatch(addItem(product))}>
					<Icon as={MdAdd} />
				</Button>
				<Button
					variant='outline'
					size='xs'
					onClick={() => dispatch(lessItem(product))}>
					<Icon as={MdOutlineDangerous} />
				</Button>
				<Button
					onClick={() => dispatch(deleteItem(product))}
					variant='outline'
					size='xs'
					colorScheme='red'
					bgGradient='linear(to-r, red.400, red.500, red.600)'
					color='white'
					_hover={{
						bg: "red.400",
						color: "white",
					}}>
					<Icon as={MdOutlineDeleteOutline} />
				</Button>
			</Stack>
		</Stack>
	);
};

export default CartItem;
