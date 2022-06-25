import { QuestionOutlineIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { round } from "lodash";
import NextLink from "next/link";
import { useRouter } from 'next/router';
import { fCurrency } from "../../../common/formatNumber";
import { Order } from "../../../redux/slices/my-orders-slice";

type PropsTypes = {
	orders: Order[];
};

const MyOrderTable = ({ orders }: PropsTypes) => {
	if (orders.length === 0) return <EmptyTable />;

	return (
		<Table size="sm" variant="striped" my={5} color="gray.700">
			<Thead>
				<Tr>
					<Th>Codigo de orden</Th>
					<Th>Total a pagar</Th>
					<Th>Estado</Th>
					<Th>Fecha</Th>
					<Th></Th>
				</Tr>
			</Thead>
			<Tbody>
				{orders.map((order) => {
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
							}}>
							<Td sx={{ fontSize: '14px' }}>{order.uid}</Td>
							<Td sx={{ fontSize: '14px' }}>{fCurrency(round(total, 2))}</Td>
							<Td>
								<Button
									size="sm"
									colorScheme="teal"
									bgGradient="linear(to-r, teal.400, teal.500, teal.600)">
									{order.status}
								</Button>
							</Td>
							<Td>{new Date(order.created_at).toLocaleDateString()}</Td>
							<Td>
								<NextLink href={`./orders/${order.uid}`} passHref>
									<Button
										size="sm"
										colorScheme="blue"
										bgGradient="linear(to-r, blue.400, blue.500, blue.600)">
										Ver detalles
									</Button>
								</NextLink>
							</Td>
						</Tr>
					);
				})}
			</Tbody>
		</Table>
	);
};

export default MyOrderTable;

const EmptyTable = () => {
	const router = useRouter();

	return (
		<Box textAlign='center' py={10} px={6}>
			<QuestionOutlineIcon boxSize={"150px"} color={"yellow.500"} />
			<Heading as='h2' size='xl' mt={6} mb={2}>
				¡No tienes ordenes con nosotros.!
			</Heading>
			<Text color={"gray.500"}>Intenta agregar algun producto al carrito.</Text>
			<Text color={"gray.500"}>Estaremos felices te ayudar!</Text>
			<Button
				colorScheme='blue'
				bgGradient='linear(to-r, blue.400, blue.500, blue.600)'
				color='white'
				variant='solid'
				mt={6}
				onClick={() => router.push("/")}>
				¡Ir a la pagina de inicio!
			</Button>
		</Box>
	);
};
