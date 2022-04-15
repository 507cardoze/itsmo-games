import { Box, GridItem, Image } from "@chakra-ui/react";
import { SyntheticEvent } from "react";
import NextLink from "next/link";

type PropsTypes = {
	url?: string;
	alt: string;
	sx?: any;
	to?: string;
	comingSoon?: boolean;
};

const GameItem = ({ url, alt, sx, to, comingSoon }: PropsTypes) => {
	return (
		<NextLink href={to ? to : ""} passHref>
			<GridItem
				w='100%'
				sx={{
					transition: "all 0.3s ease-in-out",
					cursor: !comingSoon ? "pointer" : "default",
					"&:hover": {
						transform: !comingSoon ? "scale(1.05)" : "scale(1)",
					},
					backgroundColor: "#001f34",
					border: "1x solid red",
					position: "relative",
				}}>
				{comingSoon && (
					<Box
						sx={{
							width: "100%",
							height: "100%",
							zIndex: 22,
							position: "absolute",
						}}>
						<Box
							sx={{
								backgroundColor: "rgba(0,0,0,0.7)",
								widht: "100%",
								height: "100%",
								color: "white",
								fontSize: "clamp(0.8rem, 1vw, 2rem)",
								fontWeight: "bold",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}>
							Próximamente...
						</Box>
					</Box>
				)}

				<Image
					alt={alt}
					fallbackSrc='/Istmo Games.png'
					onError={(e: SyntheticEvent<HTMLImageElement, Event>) =>
						(e.currentTarget.src = "/Istmo Games.png")
					}
					src={url}
					sx={{
						width: "100%",
						height: "100%",
						maxHeight: "120px",
						objectFit: "fit",
						...sx,
					}}
				/>
			</GridItem>
		</NextLink>
	);
};

export default GameItem;
