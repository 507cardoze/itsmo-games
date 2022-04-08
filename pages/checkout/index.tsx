import { Divider, Spacer } from "@chakra-ui/react";
import type { NextPage } from "next";
import CheckoutList from "../../components/checkout-list";
import { CheckoutForm } from "../../components/forms";

const CheckoutPage: NextPage = () => {
	return (
		<>
			<CheckoutList />
			<Spacer as={Divider} />
			<CheckoutForm />
		</>
	);
};

export default CheckoutPage;
