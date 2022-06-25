import { Box } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import WithSubnavigation from '../../../components/admin-panel-navbar';
import InventoryModal from '../../../components/modals/inventory-modal';
import { YugiohTable } from '../../../components/tables';
import { useAppSelector } from '../../../redux/store';

const Inventory = () => {
	const router = useRouter();

	const { tcg } = router.query;

	const currentUser = useAppSelector((store) => store.AuthSlice.currentUser);

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
