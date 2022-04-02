import { Box, Button, Image, Spacer, Stack, Text } from "@chakra-ui/react";
import { fCurrency } from "../../common/formatNumber";
import { Icon } from "@chakra-ui/react";
import {
	MdAdd,
	MdOutlineDeleteOutline,
	MdOutlineDangerous,
} from "react-icons/md";

const CartItem = () => {
	return (
		<Stack direction='row' mt={2}>
			<Box w='30%'>
				<Image
					src='/dorso.jpeg'
					alt='image'
					sx={{
						width: "100%",
						height: "85px",
						objectFit: "contain",
					}}
				/>
			</Box>
			<Stack spacing={2} w='30%' justifyContent='center'>
				<Text sx={{ lineHeight: 1, fontSize: "0.8rem" }}>Blue-Eyes Jet</Text>
				<Text sx={{ lineHeight: 0.6, fontSize: "0.6rem" }}>BACH-ENCO4</Text>
				<Text sx={{ lineHeight: 0.6, fontSize: "0.7rem", fontWeight: "bold" }}>
					{fCurrency(22.24)} x {123}
				</Text>
			</Stack>
			<Spacer />
			<Stack direction='row' justifyContent='center' alignItems='center' pr={5}>
				<Button variant='outline' size='xs'>
					<Icon as={MdAdd} />
				</Button>
				<Button variant='outline' size='xs'>
					<Icon as={MdOutlineDangerous} />
				</Button>
				<Button
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
