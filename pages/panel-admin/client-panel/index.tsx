import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import WithSubnavigation from '../../../components/admin-panel-navbar';
import { ClienteTable } from '../../../components/tables';
import { getClientInit } from '../../../redux/slices/admin-panel/admin-panel.thunk';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

const ClientPanel: NextPage = () => {
	const currentUser = useAppSelector((store) => store.AuthSlice.currentUser);
	const dispatch = useAppDispatch();
	const clientList = useAppSelector(
		(store) => store.adminPanelSlice.clientList
	);
	const router = useRouter();

	const getData = useCallback(async () => {
		if (clientList.length < 12) await dispatch(getClientInit());
	}, []);

	useEffect(() => {
		getData();
	}, []);
	if (!currentUser || !currentUser.isAdmin) {
		router.push('/');
		return null;
	}

	return (
		<>
			<WithSubnavigation />
			<Box px={10} sx={{ overflowY: 'auto' }}>
				<ClienteTable />
			</Box>
		</>
	);
};

export default ClientPanel;
