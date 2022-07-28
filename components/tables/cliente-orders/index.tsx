import {
	Button,
	Heading,
	Stack,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Box,
	TableContainer,
} from '@chakra-ui/react';
import { round } from 'lodash';
import { fCurrency } from '../../../common/formatNumber';
import {
	setClientOrderModal,
	setClientOrderModalData,
} from '../../../redux/slices/admin-panel';
import { Order } from '../../../redux/slices/my-orders-slice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import TableSkeleton from '../skeleton';

const ClientOrdersTable = () => {
	const dispatch = useAppDispatch();

	const isFetchingData = useAppSelector(
		(store) => store.adminPanelSlice.isFetchingData
	);

	const clientOrders = useAppSelector(
		(store) => store.adminPanelSlice.clientOrders
	);

	const handleOpenModal = (order: Order) => {
		dispatch(setClientOrderModalData(order));
		dispatch(setClientOrderModal(true));
	};

	if (isFetchingData) return <TableSkeleton />;

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignContent: 'center',
				flexDirection: 'column',
			}}>
			<Stack direction="column" mt={5} justifyContent="space-between" w="full">
				<Heading
					fontSize="20px"
					sx={{
						display: {
							base: 'none',
							sm: 'block',
						},
					}}>
					Listado de ordenes
				</Heading>
			</Stack>
			<TableContainer w="full">
				<Table size="sm" my={5} color="gray.900">
					<Thead>
						<Tr>
							<Th>Codigo de orden</Th>
							<Th>Total a pagar</Th>
							<Th>Estado</Th>
							<Th>Fecha</Th>
						</Tr>
					</Thead>
					<Tbody>
						{clientOrders.map((order) => {
							const subtotal = order.items.reduce((acc, item) => {
								const cantES = item.quantitySpanish ? item.quantitySpanish : 0;
								const cantEN = item.quantityEnglish ? item.quantityEnglish : 0;
								const qty = cantES + cantEN;
								return acc + item.price * qty;
							}, 0);
							const itbms = subtotal * 0.07;

							const total = subtotal + itbms - order.useCredit;

							return (
								<Tr
									key={order.uid}
									_hover={{
										bg: 'gray.100',
										cursor: 'pointer',
									}}
									onClick={() => handleOpenModal(order)}>
									<Td sx={{ fontSize: '14px' }}>{order.uid}</Td>
									<Td sx={{ fontSize: '14px' }}>
										{fCurrency(round(total, 2))}
									</Td>
									<Td sx={{ fontSize: '14px' }}>
										<Button
											size="sm"
											colorScheme="teal"
											bgGradient="linear(to-r, teal.400, teal.500, teal.600)">
											{order.status}
										</Button>
									</Td>
									<Td sx={{ fontSize: '14px' }}>
										{new Date(order.created_at).toLocaleDateString()}
									</Td>
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default ClientOrdersTable;
