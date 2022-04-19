import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { updateUserAuthPassword } from "../../../redux/slices/auth-slice";
import { useAppDispatch } from "../../../redux/store";

const ResetPasswordForm = () => {
	const dispatch = useAppDispatch();
	const [newPassword, setNewPassword] = useState<string>("");

	const handleClickChangePassword = async (e: FormEvent<HTMLDivElement>) => {
		e.preventDefault();
		await dispatch(updateUserAuthPassword({ newPassword }));
		setNewPassword("");
	};

	const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setNewPassword(e.target.value);
	};

	return (
		<Stack as='form' onSubmit={handleClickChangePassword} spacing={2} gap={2}>
			<FormControl isRequired>
				<FormLabel htmlFor='new-password'>
					Nueva contraseña (6 caracteres minimo){" "}
				</FormLabel>
				<Input
					id='new-password'
					name='new-password'
					type='password'
					w='full'
					focusBorderColor='blue.500'
					borderColor='black.100'
					value={newPassword}
					onChange={handleChangePassword}
				/>
			</FormControl>
			<Button
				type='submit'
				variant='outline'
				colorScheme='blue'
				disabled={newPassword.trim().length < 6}>
				Restablecer contraseña
			</Button>
		</Stack>
	);
};

export default ResetPasswordForm;
