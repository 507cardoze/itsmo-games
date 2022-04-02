import { Box, Heading, Text } from "@chakra-ui/react";

type PropsTypes = {
	title: string;
	subTitle: string;
};

const AccountDisplay = ({ title, subTitle }: PropsTypes) => {
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
			<Heading sx={{ fontSize: "22px", color: "white" }}>{title}</Heading>
			<Text sx={{ fontSize: "14px", color: "white" }}>{subTitle}</Text>
		</Box>
	);
};

export default AccountDisplay;
