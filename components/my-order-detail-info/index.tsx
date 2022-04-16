import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { fCurrency, fPercent } from "../../common/formatNumber";
import { Order } from "../../redux/slices/my-orders-slice";

type PropsTypes = {
	order: Order;
};

const MyOrderDetailsInfo = ({ order }: PropsTypes) => {
	const router = useRouter();

	const subtotal = useCallback(
		() =>
			order.items.reduce((acc, item) => {
				const cantES = item.quantitySpanish ? item.quantitySpanish : 0;
				const cantEN = item.quantityEnglish ? item.quantityEnglish : 0;
				const qty = cantES + cantEN;
				return acc + item.price * qty;
			}, 0),
		[order.items],
	)();
	const itbms = subtotal * 0.07;

	const total = subtotal + itbms - order.useCredit;

	return (
		<Box w='100%'>
			<Stack>
				<Button
					variant='solid'
					sx={{ width: "180px", height: "45px" }}
					ml={2}
					mt={3}
					onClick={() => router.push("/orders")}>
					Volver
				</Button>
			</Stack>
			<Box sx={{ p: 2.5, display: "flex", justifyContent: "center" }}>
				<Stack
					direction={["column", "column", "row"]}
					justifyContent='center'
					spacing={2}
					gap={2}
					sx={{
						backgroundColor: "#E2E8F0",
						px: 2.5,
						py: 5,
						borderRadius: "15px",
						width: "900px",
					}}>
					<Stack spacing={1} gap={1}>
						<Heading as='h3' size='sm'>
							Información de la orden
						</Heading>
						<Text fontSize='12px'>
							Código de orden: <strong>{order.uid}</strong>
						</Text>
						<Text fontSize='12px'>Estado: {order.status}</Text>
						<Text fontSize='12px'>
							Fecha:{" "}
							<strong>{new Date(order.created_at).toLocaleDateString()}</strong>
						</Text>
					</Stack>
					<Stack spacing={1} gap={1}>
						<Heading as='h3' size='sm'>
							Información de contacto
						</Heading>
						<Text fontSize='12px'>
							A nombre de : <strong>{order.clientName}</strong>
						</Text>
						<Text fontSize='12px'>
							Correo electrónico: <strong>{order.clientEmail}</strong>
						</Text>
						<Text fontSize='12px'>
							Número telefónico: <strong>{order.phoneNumber}</strong>
						</Text>
					</Stack>
					<Stack spacing={1} gap={1}>
						<Heading as='h3' size='sm'>
							Información de pago
						</Heading>
						<Text fontSize='12px'>Dirección 1: {order.address1}</Text>
						<Text fontSize='12px'>Dirección 2: {order.address2}</Text>
						<Text fontSize='12px'>Ciudad: {order.city}</Text>
					</Stack>
					<Stack spacing={1} gap={1}>
						<Heading as='h3' size='sm'>
							Información adicional
						</Heading>
						<Text fontSize='12px'>
							Método de pago preferido: <strong>{order.metodoPago}</strong>
						</Text>
						<Text fontSize='12px'>
							Sub-total: <strong>{fCurrency(subtotal)}</strong>
						</Text>
						<Text fontSize='12px'>
							ITBMS: <strong>{fCurrency(itbms)}</strong>
						</Text>
						<Text fontSize='12px'>
							Descuentos:{" "}
							<strong style={{ color: "red" }}>
								- {fCurrency(order.useCredit)}
							</strong>
						</Text>
						<Text fontSize='12px'>
							Total a pagar: <strong>{fCurrency(total)}</strong>
						</Text>
					</Stack>
				</Stack>
			</Box>
		</Box>
	);
};

export default MyOrderDetailsInfo;
