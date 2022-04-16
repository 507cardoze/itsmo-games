import { useRouter } from "next/router";
import { useAppSelector } from "../../redux/store";

const OrderDetails = () => {
	const router = useRouter();
	const { uid } = router.query;

	const orderDetails = useAppSelector((store) =>
		store.MyOrderSlice.myOrders.find((order) => order.uid === uid),
	);

	if (!orderDetails) return router.push("/");

	return <div>{orderDetails?.address1}</div>;
};

export default OrderDetails;
