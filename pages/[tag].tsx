import { Grid } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import CardDetails from "../components/card-details";
import HeaderLogo from "../components/header-logo";
import SinglesRelated from "../components/singles-related";

const CardDetailsPage: NextPage = () => {
	const router = useRouter();
	const { tag, name } = router.query;

	return (
		<>
			<Head>
				<title>Istmo games inventario</title>
			</Head>
			<HeaderLogo />
			<Grid
				templateColumns={{
					base: "repeat(1, 1fr)",
					// md: "repeat(1, 1fr)",
					lg: "repeat(2, 1fr)",
					// xl: "repeat(8, 1fr)",
				}}
				gap={2}>
				<CardDetails />
				<SinglesRelated />
			</Grid>
		</>
	);
};

export default CardDetailsPage;
