import { Box, Button, Image, Spacer, Stack, Text } from "@chakra-ui/react";
import { fCurrency } from "../../common/formatNumber";
import { Icon } from "@chakra-ui/react";
import {
	MdAdd,
	MdOutlineDeleteOutline,
	MdOutlineDangerous,
} from "react-icons/md";
import { VscChromeMinimize } from "react-icons/vsc";
import { SyntheticEvent } from "react";
import {
	CartItemType,
	deleteItem,
	setOpenLenguageCartModal,
} from "../../redux/slices/carrito-slice";
import { useAppDispatch } from "../../redux/store";

type PropsTypes = {
	product: CartItemType;
};

const CartItem = ({ product }: PropsTypes) => {
	const dispatch = useAppDispatch();

	const cantES = product.quantitySpanish || 0;
	const cantEN = product.quantityEnglish || 0;

	const totalProduct = cantES + cantEN;

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
				<Text sx={{ lineHeight: 1, fontSize: "1rem" }}>{product.name}</Text>
				<Text sx={{ lineHeight: 0.6, fontSize: "0.7rem" }}>{product.tag}</Text>
				<Text sx={{ lineHeight: 0.6, fontSize: "0.9rem", fontWeight: "bold" }}>
					{fCurrency(product.price) + " x " + totalProduct}
				</Text>
				<Stack direction='row' spacing={4}>
					{product.quantitySpanish && (
						<Text sx={{ lineHeight: 0.8, fontSize: "0.6rem" }}>
							Español: x{product.quantitySpanish}
						</Text>
					)}
					{product.quantityEnglish && (
						<Text sx={{ lineHeight: 0.8, fontSize: "0.6rem" }}>
							Ingles: x{product.quantityEnglish}
						</Text>
					)}
				</Stack>
			</Stack>
			<Spacer />
			<Stack direction='row' justifyContent='center' alignItems='center' pr={5}>
				<Button
					variant='outline'
					size='sm'
					onClick={() =>
						dispatch(
							setOpenLenguageCartModal({ cartItem: product, action: "add" }),
						)
					}>
					<Icon as={MdAdd} />
				</Button>
				<Button
					variant='outline'
					size='sm'
					onClick={() =>
						dispatch(
							setOpenLenguageCartModal({ cartItem: product, action: "less" }),
						)
					}>
					<Icon as={VscChromeMinimize} />
				</Button>
				<Button
					onClick={() => dispatch(deleteItem(product))}
					variant='outline'
					size='sm'
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
