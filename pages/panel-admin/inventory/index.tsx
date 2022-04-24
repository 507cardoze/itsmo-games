import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import WithSubnavigation from "../../../components/admin-panel-navbar";
import InventoryModal from "../../../components/modals/inventory-modal";
import { YugiohTable } from "../../../components/tables";
import { loadYugiOhInventory } from "../../../redux/slices/admin-panel-slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

const Inventory = () => {
	const router = useRouter();

	const dispatch = useAppDispatch();

	const { tcg } = router.query;

	const GetTable = (tcg: string) => {
		switch (tcg) {
			case "yugioh":
				return <YugiohTable />;
			default:
				return null;
		}
	};

	const currentUser = useAppSelector((store) => store.AuthSlice.currentUser);

	const loadYugiOhInventoryEffect = useCallback(async () => {
		await dispatch(loadYugiOhInventory());
	}, [dispatch]);

	useEffect(() => {
		const loadData = (tcg: string) => {
			switch (tcg) {
				case "yugioh":
					return loadYugiOhInventoryEffect();
				default:
					return null;
			}
		};
		if (tcg) loadData(tcg as string);
	}, [tcg, loadYugiOhInventoryEffect]);

	if (!currentUser || !currentUser.isAdmin) {
		router.push("/");
		return null;
	}

	return (
		<>
			<WithSubnavigation />
			<Box px={10} sx={{ overflowY: "auto" }}>
				{GetTable(tcg as string)}
			</Box>
			<InventoryModal tcg={tcg as string} />
		</>
	);
};

export default Inventory;
