import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useAppSelector } from "../../redux/store";
import ResetPasswordForm from "../forms/reset-password-form";

const MyAccountInfo = () => {
	const currentUser = useAppSelector((store) => store.AuthSlice.currentUser);

	return (
		<Box sx={{ p: 2.5, display: "flex", justifyContent: "center" }}>
			<Stack
				direction={["column", "column", "row"]}
				justifyContent='space-around'
				spacing={2}
				gap={2}
				sx={{
					backgroundColor: "#E2E8F0",
					px: 5,
					py: 5,
					borderRadius: "15px",
					width: "900px",
				}}>
				<Stack spacing={1} gap={1}>
					<Heading as='h3' textAlign='center' size='sm'>
						Información de la cuenta
					</Heading>
					<Text fontSize='12px'>
						Nombre completo: <strong>{currentUser?.displayName}</strong>
					</Text>
					<Text fontSize='12px'>
						Correo electrónico: <strong>{currentUser?.email}</strong>
					</Text>
					<Text fontSize='12px'>
						Número telefónico: <strong>{currentUser?.phoneNumber}</strong>
					</Text>
					<Text fontSize='12px'>
						Fecha de registro:{" "}
						<strong>
							{new Date(currentUser?.createdAt || "").toLocaleDateString()}
						</strong>
					</Text>
					{currentUser?.isAdmin && (
						<Text fontSize='12px'>
							Empleado de tienda: <strong>SI</strong>
						</Text>
					)}
				</Stack>
				<ResetPasswordForm />
			</Stack>
		</Box>
	);
};

export default MyAccountInfo;
