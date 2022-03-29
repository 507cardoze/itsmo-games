import { Box, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { fCurrency } from "../../common/formatNumber";

const CardDetails = () => {
	return (
		<Box
			mt={10}
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}>
			<Image
				src='https://static-3.studiobebop.net/ygo_data/card_images/Dimension_Shifter.jpg'
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
				<Heading sx={{ lineHeight: 0.9 }}>Dark Magician</Heading>
				<Text fontStyle='italic' fontWeight='bold'>
					Spellcaster / Normal
				</Text>
				<Text sx={{ lineHeight: 0.6 }}>25TH-EN001</Text>
				<Text sx={{ lineHeight: 0.6, fontWeight: "bold" }}>ATK: 2500</Text>
				<Text sx={{ lineHeight: 0.6, fontWeight: "bold" }}>DEF: 2100</Text>
				<Text sx={{ lineHeight: 0.6, fontWeight: "bold" }}>LV: 7</Text>
				<Text sx={{ lineHeight: 1 }}>Descripcion:</Text>
				<Text sx={{ lineHeight: 1.1 }}>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
					dolorum, optio laudantium Lorem ipsum dolor sit amet consectetur,
					adipisicing elit. Provident minus error, possimus quisquam,
				</Text>
				<Text fontWeight='bold' fontSize='26px' sx={{ lineHeight: 0.8 }}>
					{fCurrency(1.54)}
				</Text>
			</Stack>
		</Box>
	);
};

export default CardDetails;
