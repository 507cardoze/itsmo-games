import {
	Box,
	Button,
	Divider,
	FormControl,
	FormLabel,
	Input,
	Select,
	Spacer,
	Stack,
	Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { fCurrency } from "../../../common/formatNumber";
import {
	onOpenModalAuth,
	setAuthFormToLogin,
} from "../../../redux/slices/auth-slice";
import { setOrder } from "../../../redux/slices/checkout-slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

const CheckoutForm = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const cartItems = useAppSelector((store) => store.cartListSlice.items);
	const subtotal = useCallback(
		() =>
			cartItems.reduce((acc, item) => {
				const cantES = item.quantitySpanish ? item.quantitySpanish : 0;
				const cantEN = item.quantityEnglish ? item.quantityEnglish : 0;
				const qty = cantES + cantEN;
				return acc + item.price * qty;
			}, 0),
		[cartItems],
	)();
	const itbms = subtotal * 0.07;

	const currentUser = useAppSelector((store) => store.AuthSlice.currentUser);

	const initialState = {
		metodoPago: "",
		phoneNumber: "",
		address1: "",
		address2: "",
		city: "",
		useCredit: 0,
	};

	const [formData, setFormData] = useState<{
		metodoPago: string;
		phoneNumber: string;
		address1: string;
		address2: string;
		city: string;
		useCredit: number;
	}>(initialState);

	const handleOnChange = (
		event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const METODOPAGO = [
		"Pago por Yappy",
		"Efectivo en tienda",
		"Pago con crédito",
	];

	const handleOrdenar = async () => {
		if (!currentUser) {
			dispatch(setAuthFormToLogin());
			dispatch(onOpenModalAuth());
		} else if (cartItems.length) {
			await dispatch(setOrder(formData));
		}
	};

	useEffect(() => {
		if (currentUser) {
			setFormData((prev) => ({
				...prev,
				phoneNumber: currentUser.phoneNumber,
			}));
		}
	}, [currentUser]);

	return (
		<>
			<Box w='100%' p={5}>
				<Stack direction={{ base: "column", md: "row" }}>
					<Stack sx={{ flexGrow: 1, px: 5 }}>
						<Stack
							spacing={4}
							flexDirection='column'
							alignItems='center'
							mt={4}>
							<FormControl isRequired>
								<FormLabel htmlFor='displayName'>Nombre Completo</FormLabel>
								<Input
									id='displayName'
									name='displayName'
									type='text'
									w='full'
									focusBorderColor='blue.500'
									value={currentUser?.displayName || ""}
									disabled
								/>
							</FormControl>
							<FormControl isRequired>
								<FormLabel htmlFor='email_address'>
									Correo electrónico
								</FormLabel>
								<Input
									id='email_address'
									name='email_address'
									type='email'
									w='full'
									disabled
									focusBorderColor='blue.500'
									value={currentUser?.email || ""}
								/>
							</FormControl>
							<FormControl isRequired>
								<FormLabel htmlFor='phoneNumber'>Número de Teléfono</FormLabel>
								<Input
									id='phoneNumber'
									name='phoneNumber'
									type='tel'
									w='full'
									focusBorderColor='blue.500'
									value={formData.phoneNumber}
									onChange={handleOnChange}
								/>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor='useCredit'>
									Usar crédito ({fCurrency(currentUser?.credit || 0)}{" "}
									disponible)
								</FormLabel>
								<Input
									id='useCredit'
									name='useCredit'
									type='number'
									disabled={
										currentUser && currentUser.credit <= 0 ? true : false
									}
									min={0}
									max={currentUser?.credit || 0}
									w='full'
									focusBorderColor='blue.500'
									value={formData.useCredit || currentUser?.credit}
									onChange={handleOnChange}
								/>
							</FormControl>
						</Stack>
					</Stack>
					<Stack sx={{ flexGrow: 1, px: 5 }}>
						<Stack
							spacing={4}
							flexDirection='column'
							alignItems='center'
							mt={4}>
							<FormControl isRequired>
								<FormLabel htmlFor='address1'>Dirección 1</FormLabel>
								<Input
									id='address1'
									name='address1'
									type='text'
									w='full'
									focusBorderColor='blue.500'
									value={formData.address1}
									onChange={handleOnChange}
								/>
							</FormControl>
							<FormControl isRequired>
								<FormLabel htmlFor='address2'>Dirección 2</FormLabel>
								<Input
									id='address2'
									name='address2'
									type='text'
									w='full'
									focusBorderColor='blue.500'
									value={formData.address2}
									onChange={handleOnChange}
								/>
							</FormControl>
							<FormControl isRequired>
								<FormLabel htmlFor='city'>Ciudad</FormLabel>
								<Input
									id='city'
									name='city'
									type='text'
									w='full'
									focusBorderColor='blue.500'
									value={formData.city}
									onChange={handleOnChange}
								/>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor='metodoPago'>Método de pago</FormLabel>
								<Select
									id='metodoPago'
									name='metodoPago'
									value={formData.metodoPago}
									onChange={handleOnChange}
									placeholder='Seleccionar opción'>
									{METODOPAGO.map((metodoPago, index) => (
										<option
											key={metodoPago + index.toString()}
											value={metodoPago}>
											{metodoPago}
										</option>
									))}
								</Select>
							</FormControl>
						</Stack>
					</Stack>
				</Stack>
			</Box>

			<Spacer as={Divider} />

			<Box w='100%' p={10}>
				<Stack
					spacing={6}
					justifyContent={{ base: "space-around", md: "flex-start" }}
					alignItems='center'
					direction='row'>
					<Stack>
						<Text sx={{ lineHeight: 1, fontSize: "0.8rem" }}>
							Subtotal: {fCurrency(subtotal)}
						</Text>
						<Text sx={{ lineHeight: 1, fontSize: "0.8rem" }}>
							ITBMS: {fCurrency(itbms)}
						</Text>
						<Text sx={{ lineHeight: 1, fontSize: "1rem", fontWeight: "bold" }}>
							TOTAL: {fCurrency(subtotal + itbms)}
						</Text>
					</Stack>
					<Button
						sx={{ maxWidth: "250px" }}
						disabled={
							!(
								cartItems.length > 0 &&
								formData.address1.trim().length > 0 &&
								formData.address2.trim().length > 0 &&
								formData.city.trim().length > 0 &&
								formData.metodoPago.trim().length > 0 &&
								formData.phoneNumber.trim().length > 0
							)
						}
						onClick={handleOrdenar}
						colorScheme='blue'
						bgGradient='linear(to-r, blue.400, blue.500, blue.600)'
						color='white'
						variant='solid'
						isFullWidth>
						Completar Orden
					</Button>
				</Stack>
			</Box>
		</>
	);
};

export default CheckoutForm;
