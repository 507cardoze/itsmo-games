import { Box, Text } from "@chakra-ui/react";
import { ReactNode, useCallback } from "react";
import { useAppSelector } from "../../redux/store";

type PropsTypes = {
	children: ReactNode;
};

const QtyIndicator = ({ children }: PropsTypes) => {
	const cartItems = useAppSelector((store) => store.cartListSlice.items);

	const qty = useCallback(() => {
		return cartItems.reduce((acc, item) => {
			return acc + item.quantity;
		}, 0);
	}, [cartItems])();

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
