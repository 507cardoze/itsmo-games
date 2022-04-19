import { Box, Heading } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import { getOrderByUser } from "../../redux/slices/my-orders-slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { MyOrderTable } from "../../components/tables";
import TableSkeleton from "../../components/tables/myorders/skeleton";

const MyOrders = () => {
	const dispatch = useAppDispatch();

	const currentUser = useAppSelector((store) => store.AuthSlice.currentUser);
	const orders = useAppSelector((store) => store.MyOrderSlice.myOrders);
	const isLoading = useAppSelector(
		(store) => store.MyOrderSlice.fetchingOrders,
	);

	const getData = useCallback(
		async (uid) => {
			await dispatch(
				getOrderByUser({
					userUid: uid,
				}),
			);
		},
		[dispatch],
	);

	useEffect(() => {
		if (currentUser) {
			getData(currentUser.uid);
		}
	}, [currentUser, getData]);

	return (
		<Box px={10} sx={{ overflowY: "auto" }}>
			<Heading my={10}>Mis Ordenes</Heading>
			{isLoading ? <TableSkeleton /> : <MyOrderTable orders={orders} />}
		</Box>
	);
};

export default MyOrders;
