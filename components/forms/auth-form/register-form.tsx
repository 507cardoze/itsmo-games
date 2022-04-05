import { SyntheticEvent, useState } from "react";
import {
	Stack,
	Button,
	chakra,
	useColorModeValue,
	FormControl,
	FormLabel,
	Input,
	FormHelperText,
	FormErrorMessage,
	Box,
	InputRightElement,
	InputGroup,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
	createUserWithEmail,
	setAuthFormToLogin,
} from "../../../redux/slices/auth-slice";

const RegisterForm = () => {
	const [email, setEmail] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector((state) => state.AuthSlice.isAuthLoading);

	const isEmailEmpty = email.trim() === "";
	const isDisplayNameEmpty = displayName.trim() === "";
	const isPasswordEmpty = password.trim() === "";
	const isConfirmPasswordEmpty = confirmPassword.trim() === "";
	const isConfirmPasswordEqual = confirmPassword.trim() === password.trim();

	const handleRegister = (event: SyntheticEvent) => {
		event.preventDefault();
		dispatch(createUserWithEmail({ email, password, displayName }));
	};

	return (
		<chakra.form onSubmit={handleRegister} flexDirection='column' mt={4}>
			<chakra.span
				fontSize={{ base: "xl", sm: "2xl" }}
				fontWeight='extrabold'
				letterSpacing='tight'
				lineHeight='shorter'
				color={useColorModeValue("gray.900", "gray.100")}
				mb={6}>
				<chakra.span display='block'>
					Crea una cuenta con tu correo electrónico
				</chakra.span>
				<Stack flexDirection='row' alignItems='center' mt={4}>
					<chakra.span
						mr={4}
						fontSize={{ base: "md", sm: "lg" }}
						display='block'
						color={useColorModeValue("brand.600", "gray.500")}>
						¿Ya tiene cuenta?
					</chakra.span>
					<Button size='sm' onClick={() => dispatch(setAuthFormToLogin())}>
						Iniciar sesión
					</Button>
				</Stack>
				<Box flexDirection='column' alignItems='center' mt={4}>
					<FormControl isRequired>
						<FormLabel htmlFor='email_address'>Correo electrónico</FormLabel>
						<Input
							name='email_address'
							id='email_address'
							type='email'
							w='full'
							focusBorderColor='blue.500'
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
						{isEmailEmpty ? (
							<FormHelperText>Correo electrónico es requerido.</FormHelperText>
						) : (
							<FormErrorMessage>
								Escribe el correo con el cual quieres registrarte.
							</FormErrorMessage>
						)}
					</FormControl>
					<FormControl mt={5} isRequired>
						<FormLabel htmlFor='displayName'>Nombre completo</FormLabel>
						<Input
							name='displayName'
							id='displayName'
							type='text'
							focusBorderColor='blue.500'
							w='full'
							value={displayName}
							onChange={(event) => setDisplayName(event.target.value)}
						/>
						{isDisplayNameEmpty ? (
							<FormHelperText>Tu nombre es requerido.</FormHelperText>
						) : (
							<FormErrorMessage>
								Escribe el nombre para mostrar.
							</FormErrorMessage>
						)}
					</FormControl>
					<FormControl mt={5} isRequired>
						<FormLabel htmlFor='new-password'>Contraseña</FormLabel>
						<InputGroup>
							<Input
								id='new-password'
								name='new-password'
								type={show ? "text" : "password"}
								w='full'
								focusBorderColor='blue.500'
								value={password}
								onChange={(event) => setPassword(event.target.value)}
							/>
							<InputRightElement width='4.5rem'>
								<Button h='1.75rem' size='sm' mr={2} onClick={handleClick}>
									{show ? "Ocultar" : "Mostrar"}
								</Button>
							</InputRightElement>
						</InputGroup>

						{isPasswordEmpty ? (
							<FormHelperText>La contraseña es requerido.</FormHelperText>
						) : (
							<FormErrorMessage>
								Escribe tu codigo de acceso para esta cuenta.
							</FormErrorMessage>
						)}
					</FormControl>
					<FormControl mt={5} isRequired>
						<FormLabel htmlFor='confirm-password'>
							Confirmar la contraseña
						</FormLabel>
						<InputGroup>
							<Input
								id='confirm-password'
								type={show ? "text" : "password"}
								name='confirm-password'
								w='full'
								focusBorderColor='blue.500'
								value={confirmPassword}
								onChange={(event) => setConfirmPassword(event.target.value)}
							/>
							<InputRightElement width='4.5rem'>
								<Button h='1.75rem' size='sm' mr={2} onClick={handleClick}>
									{show ? "Ocultar" : "Mostrar"}
								</Button>
							</InputRightElement>
						</InputGroup>

						{isConfirmPasswordEmpty ? (
							<FormHelperText>
								Es necesario que confirmes la contraseña.
							</FormHelperText>
						) : (
							<FormErrorMessage>
								Esta contraseña debe coincidir con la contraseña anterior.
							</FormErrorMessage>
						)}
						{!isConfirmPasswordEqual ? (
							<FormErrorMessage>
								Las contraseña deben ser iguales.
							</FormErrorMessage>
						) : (
							<FormHelperText></FormHelperText>
						)}
					</FormControl>
					<Button
						mt={5}
						colorScheme='blue'
						bgGradient='linear(to-r, blue.400, blue.500, blue.600)'
						color='white'
						variant='solid'
						isFullWidth
						type='submit'
						isLoading={isLoading}>
						¡Registrarme!
					</Button>
				</Box>
			</chakra.span>
		</chakra.form>
	);
};

export default RegisterForm;
