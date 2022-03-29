import { Box, Image } from "@chakra-ui/react";
import NextLink from "next/link";

const HeaderLogo = () => {
	return (
		<NextLink href={`/`} passHref>
			<Box
				sx={{
					minHeight: "100px",
					backgroundColor: "#001f34",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Image
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
		</NextLink>
	);
};

export default HeaderLogo;
