import { Box, Image } from "@chakra-ui/react";

const LogoBox = () => {
	return (
		<Box
			w='100%'
			sx={{
				backgroundColor: "#003e69",
				height: "100px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
				pr: 15,
				pt: 15,
			}}>
			<Image
				alt='card-text'
				src='/Istmo Games.png'
				sx={{
					width: "250px",
					cursor: "pointer",
					transition: "all 0.3s ease-in-out",
					"&:hover": {
						transform: "scale(1.05)",
					},
				}}
			/>
		</Box>
	);
};

export default LogoBox;
