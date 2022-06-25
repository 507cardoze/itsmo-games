import type { NextPage } from "next";
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import WithSubnavigation from '../../components/admin-panel-navbar';
import {
	getClientList,
	loadYugiOhInventory,
} from '../../redux/slices/admin-panel-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

const PanelAdmin: NextPage = () => {
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector((store) => store.AuthSlice.currentUser);

	const router = useRouter();

	if (!currentUser || !currentUser.isAdmin) {
		router.push('/');
		return null;
	}

	const getData = useCallback(async () => {
		await dispatch(getClientList());
		await dispatch(loadYugiOhInventory());
	}, []);

	useEffect(() => {
		getData();
	}, []);

	return <></>;
};

export default PanelAdmin;
