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
	onCloseDrawerMenu,
	onCloseModalAuth,
	setAuthFormToRegister,
	signInUserWithEmail,
} from "../../../redux/slices/auth-slice";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector((state) => state.AuthSlice.isAuthLoading);

	const isEmailEmpty = email.trim() === "";
	const isPasswordEmpty = password.trim() === "";

	const handleLogin = async (event: SyntheticEvent) => {
		event.preventDefault();
		await dispatch(signInUserWithEmail({ email, password }));
		dispatch(onCloseModalAuth());
		dispatch(onCloseDrawerMenu());
	};

	return (
		<chakra.form onSubmit={handleLogin} flexDirection='column' mt={4}>
			<chakra.span
				fontSize={{ base: "xl", sm: "2xl" }}
				fontWeight='extrabold'
				letterSpacing='tight'
				lineHeight='shorter'
				color={useColorModeValue("gray.900", "gray.100")}
				mb={6}>
				<chakra.span display='block'>Iniciar sesión</chakra.span>
				<Stack flexDirection='row' alignItems='center' mt={4}>
					<chakra.span
						mr={4}
						fontSize={{ base: "md", sm: "lg" }}
						display='block'
						color={useColorModeValue("brand.600", "gray.500")}>
						¿No tienes cuenta?
					</chakra.span>
					<Button size='sm' onClick={() => dispatch(setAuthFormToRegister())}>
						Registrate
					</Button>
				</Stack>
				<Box flexDirection='column' alignItems='center' mt={4}>
					<FormControl isRequired>
						<FormLabel htmlFor='email_address'>Correo electrónico</FormLabel>
						<Input
							id='email_address'
							name='email_address'
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
						<FormLabel htmlFor='current-password'>Contraseña</FormLabel>
						<InputGroup>
							<Input
								id='current-password'
								type={show ? "text" : "password"}
								name='current-password'
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
								Escribe tu código de acceso para esta cuenta.
							</FormErrorMessage>
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
						Iniciar sesión
					</Button>
				</Box>
			</chakra.span>
		</chakra.form>
	);
};

export default LoginForm;
