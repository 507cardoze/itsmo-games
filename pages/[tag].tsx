import { Grid } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import CardDetails from "../components/card-details";
import HeaderLogo from "../components/header-logo";
import SinglesRelated from "../components/singles-related";

const CardDetailsPage: NextPage = () => {
	const router = useRouter();
	const { tag, name } = router.query;

	return (
		<>
			<HeaderLogo />
			<Grid
				templateColumns={{
					base: "repeat(1, 1fr)",
					lg: "repeat(2, 1fr)",
				}}
				gap={2}>
				<CardDetails />
				<SinglesRelated />
			</Grid>
		</>
	);
};

export default CardDetailsPage;
