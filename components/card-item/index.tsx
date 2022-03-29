import { GridItem, Image, Stack } from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/react";

const CardItem = () => {
	return (
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
			<Image
				src='https://static-3.studiobebop.net/ygo_data/card_images/Dimension_Shifter.jpg'
				sx={{ width: "100%", height: "250px", objectFit: "contain" }}
			/>
			<Stack sx={{ textAlign: "center", mt: 2 }}>
				<Heading
					as='h3'
					size='lg'
					color='black'
					sx={{ lineHeight: 0.6, fontSize: "20px" }}>
					Dimension Shifter
				</Heading>
				<Text color='black' sx={{ lineHeight: 0.6, fontSize: "14px" }}>
					TN19-EN012
				</Text>
			</Stack>
		</GridItem>
	);
};

export default CardItem;
