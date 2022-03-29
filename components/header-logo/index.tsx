import { Box, Image } from "@chakra-ui/react";

const HeaderLogo = () => {
	return (
		<Box
			sx={{
				minHeight: "100px",
				backgroundColor: "#001f34",
				position: "relative",
			}}>
			<Image
				src='/Istmo Games.png'
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: "250px",
				}}
			/>
		</Box>
	);
};

export default HeaderLogo;
