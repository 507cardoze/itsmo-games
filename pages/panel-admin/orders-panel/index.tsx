import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import WithSubnavigation from "../../../components/admin-panel-navbar";

const OrdersPanel: NextPage = () => {
	return (
		<>
			<WithSubnavigation />
			<Box px={10} sx={{ overflowY: "auto" }}>
				<h1>Orders Panel</h1>
			</Box>
		</>
	);
};

export default OrdersPanel;
