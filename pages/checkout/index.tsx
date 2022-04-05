import { Divider, Spacer } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import CheckoutList from "../../components/checkout-list";
import CheckoutDetails from "../../components/checkout-list/checkout-details";
import CheckoutForm from "../../components/checkout-list/checkout-form";
import { useAppSelector } from "../../redux/store";

const CheckoutPage: NextPage = () => {
	const router = useRouter();
	const currentUser = useAppSelector((store) => store.AuthSlice.currentUser);
	const cartItems = useAppSelector((store) => store.cartListSlice.items);

	useLayoutEffect(() => {
		if (!currentUser || !cartItems.length) {
			router.push("/");
		}
	}, [currentUser, cartItems]);

	return (
		<>
			<CheckoutList />
			<Spacer as={Divider} />
			<CheckoutForm />
			<Spacer as={Divider} />
			<CheckoutDetails />
		</>
	);
};

export default CheckoutPage;
