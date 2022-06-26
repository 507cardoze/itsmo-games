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
	const yugiohInventory = useAppSelector(
		(store) => store.adminPanelSlice.yugiohInventory
	);
	const currentUser = useAppSelector((store) => store.AuthSlice.currentUser);

	

	const getData = useCallback(async () => {
		if (yugiohInventory.length < 12) await dispatch(loadYugiOhInventory());
	}, []);

	useEffect(() => {
		getData();
	}, []);

	if (!currentUser || !currentUser.isAdmin) {
		router.push('/');
		return null;
	}

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
