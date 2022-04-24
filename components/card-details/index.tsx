import {
	Box,
	Button,
	Heading,
	Icon,
	Spacer,
	Stack,
	Text,
} from "@chakra-ui/react";
import { fCurrency } from "../../common/formatNumber";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { MdAddShoppingCart } from "react-icons/md";
import Singles from "../singles";
import { setOpenLenguageModal } from "../../redux/slices/yugioh-slice";
import { useState } from "react";

const CardDetails = () => {
	const [seeMore, setSeeMore] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const cardDetail = useAppSelector(
		(store) => store.YugiohCardListSlice.cardDetail,
	);

	const toggleSeeMore = () => {
		setSeeMore(!seeMore);
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "space-around",
				alignItems: "center",
				flexDirection: "column",
				py: 5,
			}}>
			<Stack
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
				}}>
				<Singles
					url={cardDetail ? cardDetail.url : ""}
					sx={{
						width: "50%",
						height: "350px",
						objectFit: "contain",
						cursor: "pointer",
						mx: 5,
						transition: "all 0.3s ease-in-out",
						"&:hover": {
							transform: "scale(1.02)",
						},
					}}
					alt={cardDetail ? cardDetail.name : ""}
				/>
				<Stack sx={{ width: "50%", height: "95%", display: "flex" }}>
					<Stack>
						<Heading sx={{ lineHeight: 1, fontSize: "24px" }}>
							{cardDetail ? cardDetail.name : ""}
						</Heading>
						<Text fontStyle='italic' fontWeight='bold'>
							{cardDetail ? cardDetail.cardType : ""}
						</Text>
						<Text sx={{ lineHeight: 0.6 }}>
							{cardDetail ? cardDetail.printTag : ""}
						</Text>
						{cardDetail && cardDetail.atk ? (
							<Text sx={{ lineHeight: 0.6, fontWeight: "bold" }}>
								ATK: {cardDetail.atk}
							</Text>
						) : null}
						{cardDetail && cardDetail.def ? (
							<Text sx={{ lineHeight: 0.6, fontWeight: "bold" }}>
								DEF: {cardDetail.def}
							</Text>
						) : null}
						{cardDetail && cardDetail.level ? (
							<Text sx={{ lineHeight: 0.6, fontWeight: "bold" }}>
								level: {cardDetail.level}
							</Text>
						) : null}
						<Text sx={{ lineHeight: 0.6 }}>
							rarity: {cardDetail ? cardDetail.rarity : "xxxx"}
						</Text>
						<Text sx={{ lineHeight: 1 }}>
							{cardDetail ? cardDetail.setName : "xxxx"}
						</Text>
						<Text fontWeight='bold' fontSize='26px' sx={{ lineHeight: 0.8 }}>
							{fCurrency(
								cardDetail && cardDetail.prices ? cardDetail.prices.average : 0,
							)}
						</Text>
					</Stack>
					<Spacer />
					<Stack>
						<Button
							onClick={() => {
								if (cardDetail) return dispatch(setOpenLenguageModal());
							}}
							maxW={90}
							colorScheme='blue'
							bgGradient='linear(to-r, blue.400, blue.500, blue.600)'
							color='white'
							variant='solid'>
							<Icon as={MdAddShoppingCart} />
						</Button>
						<Text sx={{ lineHeight: 0.8 }}>
							En stock:{" "}
							{cardDetail ? cardDetail.English + cardDetail.Spanish : 0}
						</Text>
						<Text sx={{ lineHeight: 0.8 }}>
							Inglés: {cardDetail ? cardDetail.English : 0}
						</Text>
						<Text sx={{ lineHeight: 0.8 }}>
							Español: {cardDetail ? cardDetail.Spanish : 0}
						</Text>
					</Stack>
				</Stack>
			</Stack>

			<Stack sx={{ width: "100%", p: 5 }}>
				<Heading sx={{ lineHeight: 0.9, fontSize: "20px" }}>
					Descripción:
				</Heading>
				{cardDetail && (
					<>
						<Text>
							{cardDetail.text.slice(0, seeMore ? cardDetail.text.length : 150)}
							{!seeMore && (
								<Text
									onClick={toggleSeeMore}
									sx={{ cursor: "pointer", textDecoration: "underLine" }}>
									Ver mas...
								</Text>
							)}
						</Text>
					</>
				)}
			</Stack>
		</Box>
	);
};

export default CardDetails;
