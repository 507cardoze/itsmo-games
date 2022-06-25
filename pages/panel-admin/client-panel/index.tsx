import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import WithSubnavigation from '../../../components/admin-panel-navbar';
import { ClienteTable } from '../../../components/tables';
import { getClientList } from '../../../redux/slices/admin-panel/admin-panel.thunk';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

const ClientPanel: NextPage = () => {
	const currentUser = useAppSelector((store) => store.AuthSlice.currentUser);
	const dispatch = useAppDispatch();

	const router = useRouter();

	if (!currentUser || !currentUser.isAdmin) {
		router.push('/');
		return null;
	}

	const getData = useCallback(async () => {
		await dispatch(getClientList());
	}, []);

	useEffect(() => {
		getData();
	}, []);

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
