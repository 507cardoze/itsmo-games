import { Box, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { fCurrency } from "../../common/formatNumber";
import { useAppSelector } from "../../redux/store";
import Singles from "../singles";

const CardDetails = () => {
	const cardDetail = useAppSelector((store) => store.CardListSlice.cardDetail);
	return (
		<Box
			mt={10}
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}>
			<Singles
				url={cardDetail ? cardDetail.url : ""}
				sx={{
					width: "50%",
					height: "400px",
					objectFit: "contain",
					ml: 5,
					cursor: "pointer",
					transition: "all 0.3s ease-in-out",
					"&:hover": {
						transform: "scale(1.02)",
					},
				}}
				alt='card-text'
			/>
			<Stack sx={{ width: "50%", m: 6 }}>
				<Heading sx={{ lineHeight: 0.9 }}>
					{cardDetail ? cardDetail.name : ""}
				</Heading>
				<Text fontStyle='italic' fontWeight='bold'>
					{cardDetail ? cardDetail.cardType : ""}
				</Text>
				<Text sx={{ lineHeight: 0.6 }}>
					{cardDetail ? cardDetail.printTag : ""}
				</Text>
				<Text sx={{ lineHeight: 0.6, fontWeight: "bold" }}>
					ATK: {cardDetail ? cardDetail.atk : ""}
				</Text>
				<Text sx={{ lineHeight: 0.6, fontWeight: "bold" }}>
					DEF: {cardDetail ? cardDetail.def : ""}
				</Text>
				<Text sx={{ lineHeight: 0.6, fontWeight: "bold" }}>
					LV: {cardDetail ? cardDetail.level : ""}
				</Text>
				<Text sx={{ lineHeight: 1 }}>Descripción:</Text>
				<Text sx={{ lineHeight: 1.1 }}>
					{cardDetail ? cardDetail.text : ""}
				</Text>
				<Text fontWeight='bold' fontSize='26px' sx={{ lineHeight: 0.8 }}>
					{fCurrency(
						cardDetail && cardDetail.prices ? cardDetail.prices.average : 0,
					)}
				</Text>
			</Stack>
		</Box>
	);
};

export default CardDetails;
