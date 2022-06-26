import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { fCurrency } from '../../../common/formatNumber';
import { ClientOrdersTable } from '../../../components/tables';
import { resetClientdata } from '../../../redux/slices/admin-panel';
import {
	getClientInfo,
	getClientOrdersById,
	updateClientInfo,
} from '../../../redux/slices/admin-panel/admin-panel.thunk';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

const ClientDetailsPage: NextPage = () => {
	const router = useRouter();
	const { id_client } = router.query;
	const currentUser = useAppSelector((store) => store.AuthSlice.currentUser);
	const client = useAppSelector((store) => store.adminPanelSlice.clientData);
	const isFetchingData = useAppSelector(
		(store) => store.adminPanelSlice.isFetchingData
	);

	const [credit, setCredit] = useState(0);

	const dispatch = useAppDispatch();

	const fetchClientOrders = useCallback(
		async (id_client) => {
			await dispatch(getClientOrdersById({ id_client: id_client as string }));
			await dispatch(getClientInfo({ id_client: id_client as string }));
		},
		[id_client, dispatch]
	);

	const saveCredit = async () => {
		await dispatch(
			updateClientInfo({
				id_client: id_client as string,
				updateData: { credit: credit },
			})
		);
		await dispatch(getClientInfo({ id_client: id_client as string }));
	};

	useEffect(() => {
		if (id_client) fetchClientOrders(id_client);
		if (client) setCredit(client.credit);
		return () => {
			dispatch(resetClientdata());
		};
	}, [fetchClientOrders, dispatch]);

	if (!currentUser || !currentUser.isAdmin) {
		router.push('/');
		return null;
	}

	return (
		<>
			<Stack>
				<Button
					variant="solid"
					sx={{ width: '180px', height: '45px' }}
					ml={2}
					mt={3}
					onClick={() => router.push('/panel-admin/client-panel')}>
					Volver
				</Button>
			</Stack>
			<Box px={10} sx={{ overflowY: 'auto' }}>
				{!isFetchingData ? (
					<>
						<Heading my={10}>{client?.displayName}</Heading>
						<Stack
							pb={10}
							direction="row"
							alignItems="flex-end"
							justifyContent="center"
							w="full">
							<FormControl>
								<FormLabel htmlFor="useCredit">
									Crédito actual ({fCurrency(client?.credit)} disponible)
								</FormLabel>
								<Input
									id="useCredit"
									name="useCredit"
									type="number"
									w="full"
									focusBorderColor="blue.500"
									value={!credit ? client?.credit : credit}
									onChange={(e) => setCredit(parseInt(e.target.value))}
								/>
							</FormControl>
							<FormControl>
								<Button
									disabled={credit < 0 ? true : false}
									variant="solid"
									onClick={saveCredit}>
									Guardar
								</Button>
							</FormControl>
						</Stack>
					</>
				) : (
					'cargando...'
				)}
				<ClientOrdersTable />
			</Box>
		</>
	);
};

export default ClientDetailsPage;
