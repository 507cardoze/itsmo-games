import { Box } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import WithSubnavigation from '../../../components/admin-panel-navbar';
import InventoryModal from '../../../components/modals/inventory-modal';
import { YugiohTable } from '../../../components/tables';
import { loadYugiOhInventory } from '../../../redux/slices/admin-panel/admin-panel.thunk';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

const Inventory = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { tcg } = router.query;

	const currentUser = useAppSelector((store) => store.AuthSlice.currentUser);

	if (!currentUser || !currentUser.isAdmin) {
		router.push('/');
		return null;
	}

	const getData = useCallback(async () => {
		//await dispatch(loadYugiOhInventory());
	}, []);

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<WithSubnavigation />
			<Box px={10} mt={5} sx={{ overflowY: 'auto' }}>
				<YugiohTable />
			</Box>
			<InventoryModal tcg={tcg as string} />
		</>
	);
};

export default Inventory;
