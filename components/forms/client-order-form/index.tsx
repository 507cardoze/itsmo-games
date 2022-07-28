import {
	Stack,
	Button,
	chakra,
	useColorModeValue,
	FormControl,
	FormLabel,
	Input,
	Box,
	Select,
	Switch,
	FormHelperText,
	Heading,
	Text,
	Image,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from '@chakra-ui/react';
import { SyntheticEvent } from 'react';
import { fCurrency } from '../../../common/formatNumber';
import { useAppSelector } from '../../../redux/store';
import SliderInput from '../../number-slider-input';
import Singles from '../../singles';

const ClientOrderForm = () => {
	const clientOrder = useAppSelector(
		(store) => store.adminPanelSlice.clientOrderModalData
	);
	const isSubmitting = useAppSelector(
		(store) => store.adminPanelSlice.isSubmmiting
	);

	const METODOPAGO = [
		'Pago por Yappy',
		'Efectivo en tienda',
		'Pago con crédito',
	];

	if (!clientOrder) return null;

	return (
		<chakra.form onSubmit={() => {}} flexDirection="column" mt={4}>
			<chakra.span
				fontSize={{ base: 'xl', sm: '2xl' }}
				fontWeight="extrabold"
				letterSpacing="tight"
				lineHeight="shorter"
				color={useColorModeValue('gray.900', 'gray.100')}
				mb={6}>
				<chakra.span display="block">
					Editar orden {clientOrder.uid}
				</chakra.span>
			</chakra.span>
			<Box
				as={Stack}
				spacing={4}
				gap={4}
				flexDirection="column"
				alignItems="center"
				my={6}>
				<FormControl isRequired>
					<FormLabel htmlFor="clientName">Orden a nombre de</FormLabel>
					<Input
						name="clientName"
						id="clientName"
						type="text"
						w="full"
						focusBorderColor="blue.500"
						value={clientOrder.clientName}
						onChange={() => {}}
					/>
					<FormHelperText>
						Este dato es importante para el funcionamiento del sistema,
						asegurarse que el tag esta bien escrito.
					</FormHelperText>
				</FormControl>
				<FormControl isRequired>
					<FormLabel htmlFor="email_address">Correo electrónico</FormLabel>
					<Input
						id="email_address"
						name="email_address"
						type="email"
						w="full"
						disabled
						focusBorderColor="blue.500"
						value={clientOrder.clientEmail}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel htmlFor="phoneNumber">Número de Teléfono</FormLabel>
					<Input
						id="phoneNumber"
						name="phoneNumber"
						type="tel"
						w="full"
						focusBorderColor="blue.500"
						value={clientOrder.phoneNumber}
					/>
				</FormControl>

				<FormControl>
					<FormLabel htmlFor="useCredit">
						Usar crédito ({fCurrency(clientOrder.useCredit || 0)} disponible)
					</FormLabel>
					<Input
						id="useCredit"
						name="useCredit"
						type="number"
						disabled={clientOrder.useCredit > 0 ? false : true}
						w="full"
						focusBorderColor="blue.500"
						value={clientOrder.useCredit}
						onChange={() => {}}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel htmlFor="address1">Dirección 1</FormLabel>
					<Input
						id="address1"
						name="address1"
						type="text"
						w="full"
						focusBorderColor="blue.500"
						value={clientOrder.address1}
						onChange={() => {}}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel htmlFor="address2">Dirección 2</FormLabel>
					<Input
						id="address2"
						name="address2"
						type="text"
						w="full"
						focusBorderColor="blue.500"
						value={clientOrder.address2}
						onChange={() => {}}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel htmlFor="city">Ciudad</FormLabel>
					<Input
						id="city"
						name="city"
						type="text"
						w="full"
						focusBorderColor="blue.500"
						value={clientOrder.city}
						onChange={() => {}}
					/>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor="metodoPago">Método de pago</FormLabel>
					<Select
						id="metodoPago"
						name="metodoPago"
						value={clientOrder.metodoPago}
						onChange={() => {}}
						placeholder="Seleccionar opción">
						{METODOPAGO.map((metodoPago, index) => (
							<option key={metodoPago + index.toString()} value={metodoPago}>
								{metodoPago}
							</option>
						))}
					</Select>
				</FormControl>
				<Stack direction="row" w="full" spacing={1}>
					<Box w="10%" alignItems="center" justifyContent="center">
						<Image
							src=""
							fallbackSrc="/dorso.jpeg"
							loading="lazy"
							onError={(e: SyntheticEvent<HTMLImageElement, Event>) =>
								(e.currentTarget.src = '/dorso.jpeg')
							}
							alt="image"
							sx={{
								width: '100%',
								height: '100%',
								objectFit: 'contain',
							}}
						/>
					</Box>
					<Stack
						bg="green"
						spacing={2}
						gap="10px"
						w="40%"
						justifyContent="center"
						alignItems="center">
						<Text noOfLines={3} sx={{ lineHeight: 1, fontSize: '1rem' }}>
							nombre nombre nombre nombre nombre nombre nombre
						</Text>
						<Text sx={{ lineHeight: 0.6, fontSize: '0.7rem' }}>printag</Text>
						<Text
							sx={{ lineHeight: 0.6, fontSize: '0.9rem', fontWeight: 'bold' }}>
							{fCurrency(150) + ' x ' + 250}
						</Text>
					</Stack>
					<Stack bg="yellow" w="50%" direction="column">
						<Stack direction="row">
							<FormControl>
								<FormLabel>Cantidad en Español</FormLabel>
								<NumberInput step={1} defaultValue={15} min={10} max={20}>
									<NumberInputField />
									<NumberInputStepper>
										<NumberIncrementStepper />
										<NumberDecrementStepper />
									</NumberInputStepper>
								</NumberInput>
							</FormControl>
						</Stack>
						<Stack direction="row">
							<FormControl>
								<FormLabel>Cantidad en Inglés</FormLabel>
								<NumberInput step={1} defaultValue={15} min={10} max={20}>
									<NumberInputField />
									<NumberInputStepper>
										<NumberIncrementStepper />
										<NumberDecrementStepper />
									</NumberInputStepper>
								</NumberInput>
							</FormControl>
						</Stack>
					</Stack>
				</Stack>
				<Button
					disabled={false}
					colorScheme="blue"
					bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
					color="white"
					variant="solid"
					isFullWidth
					type="submit"
					isLoading={isSubmitting}
					loadingText="Guardando...">
					Guardar Cambios
				</Button>
				<Stack direction="row" w="full">
					<Button
						disabled={false}
						colorScheme="green"
						bgGradient="linear(to-r, green.400, green.500, green.600)"
						color="white"
						variant="solid"
						isFullWidth
						isLoading={isSubmitting}
						loadingText="Completando...">
						Completar Orden
					</Button>
					<Button
						disabled={false}
						colorScheme="red"
						bgGradient="linear(to-r, red.400, red.500, red.600)"
						color="white"
						variant="solid"
						isFullWidth
						isLoading={isSubmitting}
						loadingText="Cancelando...">
						Cancelar Orden
					</Button>
				</Stack>
			</Box>
		</chakra.form>
	);
};

export default ClientOrderForm;
