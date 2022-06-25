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
	Box,
	TableContainer,
	useControllableState,
} from '@chakra-ui/react';
import { YugiohCardType } from '../../../redux/slices/yugioh-slice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import Singles from '../../singles';
import TableSkeleton from '../skeleton';
import { SearchIcon } from '@chakra-ui/icons';
import { useMemo, useState } from 'react';
import sortItBro from '../../../common/sortItBro';
import {
	setModalInventory,
	setYugiohEditable,
} from '../../../redux/slices/admin-panel';

const YugiohTable = () => {
	const dispatch = useAppDispatch();
	const [limit, setLimit] = useControllableState({ defaultValue: 10 });
	const [searchTerm, setSearchTerm] = useState<string>('');

	const isFetchingData = useAppSelector(
		(store) => store.adminPanelSlice.isFetchingData
	);
	const inventory = useAppSelector(
		(store) => store.adminPanelSlice.yugiohInventory
	);

	const handleOpenNew = () => dispatch(setModalInventory(true));

	const handleOpenEdit = (card: YugiohCardType) => {
		dispatch(setModalInventory(true));
		dispatch(setYugiohEditable(card));
	};

	const filterAlgo = (card: YugiohCardType) => {
		return (
			card.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			card.printTag?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			card.rarity?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			card.cardType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			card.attribute?.toLowerCase().includes(searchTerm.toLowerCase())
		);
	};

	const total = useMemo(
		() =>
			inventory.reduce(
				(acc, curr) =>
					acc +
					parseInt(curr.English.toString()) +
					parseInt(curr.Spanish.toString()),
				0
			),
		[inventory]
	);

	const qtySpanish = useMemo(
		() =>
			inventory.reduce(
				(acc, curr) => acc + parseInt(curr.Spanish.toString()),
				0
			),
		[inventory]
	);

	const qtyEnglish = useMemo(
		() =>
			inventory.reduce(
				(acc, curr) => acc + parseInt(curr.English.toString()),
				0
			),
		[inventory]
	);

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
			<Stack direction="row" mt={5} justifyContent="space-between">
				<Heading
					fontSize="20px"
					sx={{
						display: {
							base: 'none',
							sm: 'block',
						},
					}}>
					Inventario de Yu-Gi-Oh!
				</Heading>
				<Stack direction="row" spacing={1} alignItems="center">
					<InputGroup>
						<InputLeftElement pointerEvents="none">
							<SearchIcon color="gray.300" />
						</InputLeftElement>
						<Input
							type="text"
							placeholder="Buscar..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</InputGroup>
					<Button
						onClick={handleOpenNew}
						size="sm"
						colorScheme="blue"
						bgGradient="linear(to-r, blue.400, blue.500, blue.600)">
						Agregar
					</Button>
				</Stack>
			</Stack>
			<TableContainer w="full">
				<Table size="sm" my={5} color="gray.900">
					<Thead>
						<Tr>
							<Th>ID</Th>
							<Th>Imagen</Th>
							<Th>Nombre</Th>
							<Th>Print Tag</Th>
							<Th>Rarity</Th>
							<Th>Type</Th>
							<Th>Attribute</Th>
							<Th>En venta</Th>
							<Th>Spanish (Unit)</Th>
							<Th>English (Unit)</Th>
						</Tr>
					</Thead>
					<Tbody>
						{[...inventory]
							.filter(filterAlgo)
							.slice(0, limit)
							.map((card, index) => (
								<Tr
									onClick={() => handleOpenEdit(card)}
									key={card.uid + index.toString()}
									_hover={{
										bg: 'gray.100',
										cursor: 'pointer',
									}}>
									<Td sx={{ fontSize: '14px' }}>{card.uid}</Td>
									<Td>
										<Singles url={card.url} alt={card.name} height="50px" />
									</Td>
									<Td sx={{ fontSize: '14px' }}>{card.name}</Td>
									<Td sx={{ fontSize: '14px' }}>{card.printTag}</Td>
									<Td sx={{ fontSize: '14px' }}>{card.rarity}</Td>
									<Td sx={{ fontSize: '14px' }}>{card.cardType}</Td>
									<Td sx={{ fontSize: '14px' }}>{card.attribute}</Td>
									<Td>
										{card.isActive ? (
											<Button
												size="sm"
												colorScheme="green"
												bgGradient="linear(to-r, green.400, green.500, green.600)">
												Si
											</Button>
										) : (
											<Button
												size="sm"
												colorScheme="red"
												bgGradient="linear(to-r, red.400, red.500, red.600)">
												No
											</Button>
										)}
									</Td>
									<Td>{card.Spanish}</Td>
									<Td>{card.English}</Td>
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
							<Th>Total: {total}</Th>
							<Th>{qtySpanish}</Th>
							<Th>{qtyEnglish}</Th>
						</Tr>
					</Tfoot>
				</Table>
				{limit < inventory.length && (
					<Box sx={{ width: '100%', p: 2 }}>
						<Button
							variant="ghost"
							size="sm"
							rounded="lg"
							shadow="lg"
							onClick={() => setLimit(limit + 15)}
							w="100%"
							alignSelf="center"
							sx={{
								mt: 5,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								minH: '50px',
							}}>
							Ver más
						</Button>
					</Box>
				)}
			</TableContainer>
		</Box>
	);
};

export default YugiohTable;
