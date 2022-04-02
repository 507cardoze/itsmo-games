import { Box, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

type PropsTypes = {
	qty: number;
	children: ReactNode;
};

const QtyIndicator = ({ qty, children }: PropsTypes) => {
	const getLabel = (): string => {
		if (qty > 99) return "99+";
		return `${qty}`;
	};

	return (
		<Box sx={{ position: "relative" }}>
			{children}
			{qty > 0 && (
				<Text
					sx={{
						position: "absolute",
						top: -3,
						left: -1,
						fontSize: "12px",
						borderRadius: "100%",
						backgroundColor: "red.500",
						color: "white",
						fontWeight: "bold",
						py: 0.2,
						px: 1,
						textAlign: "center",
					}}>
					{getLabel()}
				</Text>
			)}
		</Box>
	);
};

export default QtyIndicator;
