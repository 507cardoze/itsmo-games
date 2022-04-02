import NextLink from "next/link";
import { Image } from "@chakra-ui/react";

const Logo = () => {
	return (
		<NextLink href={`/`} passHref>
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
		</NextLink>
	);
};

export default Logo;
