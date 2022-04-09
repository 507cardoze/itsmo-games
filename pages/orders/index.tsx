import {
	Box,
	Button,
	Heading,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import { getOrderByUser } from "../../redux/slices/my-orders-slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import NextLink from "next/link";

const MyOrders = () => {
	const dispatch = useAppDispatch();

	const currentUser = useAppSelector((store) => store.AuthSlice.currentUser);
	const orders = useAppSelector((store) => store.MyOrderSlice.myOrders);

	const getData = useCallback(async (uid) => {
		await dispatch(
			getOrderByUser({
				userUid: uid,
			}),
		);
	}, []);

	useEffect(() => {
		if (currentUser) {
			getData(currentUser.uid);
		}
	}, [currentUser]);

	return (
		<Box px={10} sx={{ overflowY: "auto" }}>
			<Heading my={10}>Mis Ordenes</Heading>
			<Table size='sm' variant='striped' my={5} color='gray.700'>
				<Thead>
					<Tr>
						<Th>Codigo de orden</Th>
						<Th>Estado</Th>
						<Th>Fecha</Th>
						<Th></Th>
					</Tr>
				</Thead>
				<Tbody>
					{orders.map((order) => (
						<Tr
							_hover={{
								bg: "gray.100",
							}}>
							<Td sx={{ fontSize: "14px" }}>{order.uid}</Td>
							<Td>
								<Button
									size='sm'
									colorScheme='teal'
									bgGradient='linear(to-r, teal.400, teal.500, teal.600)'>
									{order.status}
								</Button>
							</Td>
							<Td>{new Date(order.created_at).toLocaleDateString()}</Td>
							<Td>
								<NextLink href={`./orders/${order.uid}`} passHref>
									<Button
										size='sm'
										colorScheme='blue'
										bgGradient='linear(to-r, blue.400, blue.500, blue.600)'>
										Ver detalles
									</Button>
								</NextLink>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</Box>
	);
};

export default MyOrders;
