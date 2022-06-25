import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from 'next/router';
import WithSubnavigation from "../../../components/admin-panel-navbar";
import { ClienteTable } from "../../../components/tables";
import { useAppSelector } from '../../../redux/store';

const ClientPanel: NextPage = () => {
	const currentUser = useAppSelector((store) => store.AuthSlice.currentUser);

	const router = useRouter();

	if (!currentUser || !currentUser.isAdmin) {
		router.push('/');
		return null;
	}
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
