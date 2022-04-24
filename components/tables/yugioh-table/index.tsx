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
import {
	setModalInventory,
	setYugiohEditable,
} from "../../../redux/slices/admin-panel-slice";
import { YugiohCardType } from "../../../redux/slices/yugioh-slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import Singles from "../../singles";
import TableSkeleton from "../skeleton";
import { SearchIcon } from "@chakra-ui/icons";
import { useMemo, useState } from "react";
import sortItBro from "../../../common/sortItBro";

const YugiohTable = () => {
	const dispatch = useAppDispatch();
	const [searchTerm, setSearchTerm] = useState<string>("");

	const isFetchingData = useAppSelector(
		(store) => store.adminPanelSlice.isFetchingData,
	);
	const inventory = useAppSelector(
		(store) => store.adminPanelSlice.yugiohInventory,
	);

	const handleOpenNew = () => {
		dispatch(setModalInventory(true));
	};

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

	const sortAlgo = (a: YugiohCardType, b: YugiohCardType) =>
		sortItBro(a.name, b.name, "desc");

	const total = useMemo(
		() => inventory.reduce((acc, curr) => acc + curr.English + curr.Spanish, 0),
		[inventory],
	);

	const qtySpanish = useMemo(
		() => inventory.reduce((acc, curr) => acc + curr.Spanish, 0),
		[inventory],
	);

	const qtyEnglish = useMemo(
		() => inventory.reduce((acc, curr) => acc + curr.English, 0),
		[inventory],
	);

	if (isFetchingData) return <TableSkeleton />;

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
					Inventario de Yu-Gi-Oh!
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
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</InputGroup>
					<Button
						onClick={handleOpenNew}
						size='sm'
						colorScheme='blue'
						bgGradient='linear(to-r, blue.400, blue.500, blue.600)'>
						Agregar
					</Button>
				</Stack>
			</Stack>
			<Table size='sm' my={5} color='gray.900'>
				<Thead>
					<Tr>
						<Th>ID</Th>
						<Th>Imagen</Th>
						<Th>Nombre</Th>
						<Th>Print Tag</Th>
						<Th>Rarity</Th>
						<Th>Type</Th>
						<Th>Attribute</Th>
						<Th isNumeric>Spanish (Unit)</Th>
						<Th isNumeric>English (Unit)</Th>
					</Tr>
				</Thead>
				<Tbody>
					{[...inventory]
						.sort(sortAlgo)
						.filter(filterAlgo)
						.map((card, index) => (
							<Tr
								onClick={() => handleOpenEdit(card)}
								key={card.uid + index.toString()}
								_hover={{
									bg: "gray.100",
									cursor: "pointer",
								}}>
								<Td sx={{ fontSize: "14px" }}>{card.uid}</Td>
								<Td align='center'>
									<Singles url={card.url} alt={card.name} height='75px' />
								</Td>
								<Td sx={{ fontSize: "14px" }}>{card.name}</Td>
								<Td sx={{ fontSize: "14px" }}>{card.printTag}</Td>
								<Td sx={{ fontSize: "14px" }}>{card.rarity}</Td>
								<Td sx={{ fontSize: "14px" }}>{card.cardType}</Td>
								<Td sx={{ fontSize: "14px" }}>{card.attribute}</Td>
								<Td isNumeric>{card.Spanish}</Td>
								<Td isNumeric>{card.English}</Td>
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
						<Th isNumeric>Total: {total}</Th>
						<Th isNumeric>{qtySpanish}</Th>
						<Th isNumeric>{qtyEnglish}</Th>
					</Tr>
				</Tfoot>
			</Table>
		</>
	);
};

export default YugiohTable;
