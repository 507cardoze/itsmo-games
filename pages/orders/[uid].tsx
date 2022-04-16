import { useRouter } from "next/router";
import { useEffect } from "react";
import MyOrderDetailsInfo from "../../components/my-order-detail-info";
import MyOrderList from "../../components/my-order-list";
import { useAppSelector } from "../../redux/store";

const OrderDetails = () => {
	const router = useRouter();
	const { uid } = router.query;

	const orderDetails = useAppSelector((store) =>
		store.MyOrderSlice.myOrders.find((order) => order.uid === uid),
	);

	if (!orderDetails || !uid) return <></>;

	useEffect(() => {
		if (!orderDetails || !uid) {
			router.push("/");
		}
	}, []);

	return (
		<>
			<MyOrderDetailsInfo order={orderDetails} />
			<MyOrderList items={orderDetails.items} />
		</>
	);
};

export default OrderDetails;
