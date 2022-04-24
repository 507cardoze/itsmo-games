import {
	Box,
	chakra,
	Container,
	Image,
	Stack,
	Text,
	useColorModeValue,
	VisuallyHidden,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { ReactNode } from "react";

const SocialButton = ({
	children,
	label,
	href,
}: {
	children: ReactNode;
	label: string;
	href: string;
}) => {
	return (
		<chakra.button
			bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
			rounded={"full"}
			w={8}
			h={8}
			cursor={"pointer"}
			as={"a"}
			href={href}
			display={"inline-flex"}
			alignItems={"center"}
			justifyContent={"center"}
			transition={"background 0.3s ease"}
			_hover={{
				bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
			}}>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</chakra.button>
	);
};

export default function Footer() {
	return (
		<Box
			as='footer'
			bg={useColorModeValue("gray.50", "gray.900")}
			color={useColorModeValue("gray.700", "gray.200")}>
			<Container
				as={Stack}
				maxW={"6xl"}
				py={4}
				direction={{ base: "column", md: "row" }}
				spacing={4}
				justify={{ base: "center", md: "space-between" }}
				align={{ base: "center", md: "center" }}>
				<NextLink href={`/`} passHref>
					<Image
						alt='card-text'
						src='/Istmo Games.png'
						sx={{
							width: 145,
							cursor: "pointer",
							transition: "all 0.3s ease-in-out",
							"&:hover": {
								transform: "scale(1.05)",
							},
						}}
					/>
				</NextLink>
				<Stack direction={"row"} spacing={6}>
					<NextLink href={"/yugioh"} passHref>
						Yu-Gi-Oh!
					</NextLink>
				</Stack>
				<Stack spacing={2} textAlign='center'>
					<Text>
						{`© ${new Date().getFullYear()} Istmo Games. Todos los derechos reservados.`}
					</Text>
					<Text fontSize='12px'>
						BID:{" "}
						{process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? "running local"}
					</Text>
				</Stack>
				<Stack direction={"row"} spacing={6}>
					<SocialButton
						label={"Facebook"}
						href={"https://www.facebook.com/IstmoGamesPTY/"}>
						<FaFacebook />
					</SocialButton>
					<SocialButton
						label={"Instagram"}
						href={"https://www.instagram.com/istmogames/"}>
						<FaInstagram />
					</SocialButton>
				</Stack>
			</Container>
		</Box>
	);
}
