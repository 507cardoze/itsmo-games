import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ClientOrdersTable } from "../../../components/tables";
import TableSkeleton from "../../../components/tables/skeleton";
import { useAppSelector } from "../../../redux/store";

const ClientDetailsPage: NextPage = () => {
	const router = useRouter();
	const { id_client } = router.query;

	return (
		<>
			<Stack>
				<Button
					variant='solid'
					sx={{ width: "180px", height: "45px" }}
					ml={2}
					mt={3}
					onClick={() => router.push("/panel-admin/client-panel")}>
					Volver
				</Button>
			</Stack>
			<Box px={10} sx={{ overflowY: "auto" }}>
				<Heading my={10}></Heading>
				{false ? <TableSkeleton /> : <ClientOrdersTable />}
			</Box>
		</>
	);
};

export default ClientDetailsPage;
