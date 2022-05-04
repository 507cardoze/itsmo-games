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
	Input,
	InputGroup,
	InputLeftElement,
	Tfoot,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import TableSkeleton from "../skeleton";
import { SearchIcon } from "@chakra-ui/icons";
import sortItBro from "../../../common/sortItBro";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { fCurrency } from "../../../common/formatNumber";
import { getClientList } from "../../../redux/slices/admin-panel-slice";
import { dateFromNow } from "../../../common/formatTime";

const ClienteTable = () => {
	const dispatch = useAppDispatch();
	const [searchTerm, setSearchTerm] = useState<string>("");
	const isLoading = useAppSelector(
		(store) => store.adminPanelSlice.isFetchingData,
	);

	const clientList = useAppSelector(
		(store) => store.adminPanelSlice.clientList,
	);

	const getData = useCallback(async () => {
		await dispatch(getClientList());
	}, []);

	useEffect(() => {
		getData();
	}, []);

	if (isLoading) return <TableSkeleton />;

	return (
		<>
			<Stack direction='row' mt={5} justifyContent='space-between'>
				<Heading
					fontSize='20px'
					sx={{
						display: {
							base: "none",
							sm: "block",
						},
					}}>
					Lista de clientes
				</Heading>
				<Stack direction='row' spacing={1} alignItems='center'>
					<InputGroup>
						<InputLeftElement pointerEvents='none'>
							<SearchIcon color='gray.300' />
						</InputLeftElement>
						<Input
							type='text'
							placeholder='Buscar...'
							value={searchTerm}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setSearchTerm(e.target.value)
							}
						/>
					</InputGroup>
				</Stack>
			</Stack>
			<Table size='sm' my={5} color='gray.900'>
				<Thead>
					<Tr>
						<Th>Nombre completo</Th>
						<Th>Correo electronico</Th>
						<Th>Credito</Th>
						<Th>Es empleado</Th>
						<Th>Estado</Th>
						<Th>Antiguedad</Th>
					</Tr>
				</Thead>
				<Tbody>
					{[...clientList]
						.sort((a, b) => sortItBro(a.displayName, b.displayName, "desc"))
						.filter((client) => {
							return client.displayName
								.toLowerCase()
								.includes(searchTerm.toLowerCase());
						})
						.map((client, index) => (
							<Tr
								//onClick={() => handleOpenEdit(card)}
								key={client.uid + index.toString()}
								_hover={{
									bg: "gray.100",
									cursor: "pointer",
								}}>
								<Td sx={{ fontSize: "14px" }}>{client.displayName}</Td>
								<Td sx={{ fontSize: "14px" }}>{client.email}</Td>
								<Td sx={{ fontSize: "14px" }}>{fCurrency(client.credit)}</Td>
								<Td>
									<Button
										size='sm'
										colorScheme={client.isAdmin ? "green" : "red"}
										bgGradient={`linear(to-r, ${
											client.isAdmin ? "green" : "red"
										}.400, ${client.isAdmin ? "green" : "red"}.500, ${
											client.isAdmin ? "green" : "red"
										}.600)`}>
										{client.isAdmin ? "Si" : "No"}
									</Button>
								</Td>
								<Td>
									<Button
										size='sm'
										colorScheme={!client.isBanned ? "green" : "red"}
										bgGradient={`linear(to-r, ${
											!client.isBanned ? "green" : "red"
										}.400, ${!client.isBanned ? "green" : "red"}.500, ${
											!client.isBanned ? "green" : "red"
										}.600)`}>
										{!client.isBanned ? "Activo" : "Inactivo"}
									</Button>
								</Td>
								<Td>{dateFromNow(client.createdAt)}</Td>
							</Tr>
						))}
				</Tbody>
				<Tfoot>
					<Tr>
						<Th></Th>
						<Th></Th>
						<Th></Th>
						<Th></Th>
						<Th></Th>
						<Th></Th>
						<Th></Th>
						<Th></Th>
						<Th></Th>
						<Th></Th>
					</Tr>
				</Tfoot>
			</Table>
		</>
	);
};

export default ClienteTable;
