import { Image } from "@chakra-ui/react";
import { SyntheticEvent } from "react";

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
			fallbackSrc='/dorso.jpeg'
			loading='lazy'
			onError={(e: SyntheticEvent<HTMLImageElement, Event>) =>
				(e.currentTarget.src = "/dorso.jpeg")
			}
			src={url}
			sx={{
				width: "100%",
				height: height,
				objectFit: "contain",
				...sx,
			}}
		/>
	);
};

export default Singles;
