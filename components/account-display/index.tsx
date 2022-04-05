import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { fCurrency } from "../../common/formatNumber";
import { useAppSelector } from "../../redux/store";

const AccountDisplay = () => {
	const currentUser = useAppSelector((store) => store.AuthSlice.currentUser);
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
			{currentUser ? (
				<>
					<Heading sx={{ fontSize: "22px", color: "white" }}>
						{currentUser?.displayName}
					</Heading>
					<Text
						sx={{ fontSize: "14px", color: "white" }}>{`Credito: ${fCurrency(
						currentUser?.credit,
					)}`}</Text>
				</>
			) : (
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
			)}
		</Box>
	);
};

export default AccountDisplay;
