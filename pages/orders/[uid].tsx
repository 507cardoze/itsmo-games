import { useRouter } from "next/router";

const OrderDetails = () => {
	const router = useRouter();
	const { uid } = router.query;
	return <div>{uid}</div>;
};

export default OrderDetails;
