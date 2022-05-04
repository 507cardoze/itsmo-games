import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import WithSubnavigation from "../../../components/admin-panel-navbar";
import ClienteTable from "../../../components/tables/cliente-table";
import { useAppSelector } from "../../../redux/store";

const ClientPanel: NextPage = () => {
	return (
		<>
			<WithSubnavigation />
			<Box px={10} sx={{ overflowY: "auto" }}>
					<ClienteTable />
			</Box>
		</>
	);
};

export default ClientPanel;
