import { Box, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const CheckoutForm = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const currentUser = useAppSelector((store) => store.AuthSlice.currentUser);

	return (
		<Box w='100%' p={5}>
			<Stack direction={{ base: "column", md: "row" }}>
				<Stack sx={{ flexGrow: 1, px: 5 }}>
					<Box flexDirection='column' alignItems='center' mt={4}>
						<FormControl isRequired>
							<FormLabel htmlFor='adress1'>Dirección 1</FormLabel>
							<Input
								id='adress1'
								name='adress1'
								type='text'
								w='full'
								focusBorderColor='blue.500'
								//value={email}
								//onChange={(event) => setEmail(event.target.value)}
							/>
						</FormControl>
						<FormControl isRequired>
							<FormLabel htmlFor='adress2'>Dirección 2</FormLabel>
							<Input
								id='adress2'
								name='adress2'
								type='text'
								w='full'
								focusBorderColor='blue.500'
								//value={email}
								//onChange={(event) => setEmail(event.target.value)}
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
								//value={email}
								//onChange={(event) => setEmail(event.target.value)}
							/>
						</FormControl>
						<FormControl isRequired>
							<FormLabel htmlFor='state'>Provincia</FormLabel>
							<Input
								id='state'
								name='state'
								type='text'
								w='full'
								focusBorderColor='blue.500'
								//value={email}
								//onChange={(event) => setEmail(event.target.value)}
							/>
						</FormControl>
						<FormControl isRequired>
							<FormLabel htmlFor='country'>Pais</FormLabel>
							<Input
								id='country'
								name='country'
								type='text'
								w='full'
								focusBorderColor='blue.500'
								//value={email}
								//onChange={(event) => setEmail(event.target.value)}
							/>
						</FormControl>
					</Box>
				</Stack>
				<Stack sx={{ flexGrow: 1, px: 5 }}>
					<Box flexDirection='column' alignItems='center' mt={4}>
						<FormControl isRequired>
							<FormLabel htmlFor='displayName'>Nombre Completo</FormLabel>
							<Input
								id='displayName'
								name='displayName'
								type='text'
								w='full'
								focusBorderColor='blue.500'
								//value={email}
								//onChange={(event) => setEmail(event.target.value)}
							/>
						</FormControl>
						<FormControl isRequired>
							<FormLabel htmlFor='email_address'>Correo electrónico</FormLabel>
							<Input
								id='email_address'
								name='email_address'
								type='email'
								w='full'
								focusBorderColor='blue.500'
								//value={email}
								//onChange={(event) => setEmail(event.target.value)}
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
								//value={email}
								//onChange={(event) => setEmail(event.target.value)}
							/>
						</FormControl>
						<FormControl>
							<FormLabel htmlFor='useCredit'>Usar crédito</FormLabel>
							<Input
								id='useCredit'
								name='useCredit'
								type='number'
								w='full'
								focusBorderColor='blue.500'
								//value={email}
								//onChange={(event) => setEmail(event.target.value)}
							/>
						</FormControl>
					</Box>
				</Stack>
			</Stack>
		</Box>
	);
};

export default CheckoutForm;
