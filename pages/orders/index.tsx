import React, { useCallback, useEffect } from "react";
import { getOrderByUser } from "../../redux/slices/my-orders-slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const MyOrders = () => {
	const dispatch = useAppDispatch();

	const currentUser = useAppSelector((store) => store.AuthSlice.currentUser);

	const getData = useCallback(async (uid) => {
		await dispatch(
			getOrderByUser({
				userUid: uid,
			}),
		);
	}, []);

	useEffect(() => {
		if (currentUser) {
			getData(currentUser.uid);
		}
	}, [currentUser]);

	return <div>MyOrders</div>;
};

export default MyOrders;
