import { Image } from "@chakra-ui/react";

type PropsTypes = {
	url?: string;
	alt: string;
	height?: string;
	sx?: any;
};

const Singles = ({ url, alt, height, sx }: PropsTypes) => {
	return (
		<Image
			alt={alt}
			src={url || "/dorso.jpeg"}
			sx={{
				width: "100%",
				height: height ? height : "250px",
				objectFit: "contain",
				...sx,
			}}
		/>
	);
};

export default Singles;
