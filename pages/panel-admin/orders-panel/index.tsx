import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from 'next/router';
import WithSubnavigation from "../../../components/admin-panel-navbar";
import { useAppSelector } from '../../../redux/store';

const OrdersPanel: NextPage = () => {
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
				<h1>Orders Panel</h1>
			</Box>
		</>
	);
};

export default OrdersPanel;
