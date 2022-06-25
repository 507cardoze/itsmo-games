import React, { useEffect } from "react";
import { setYugiohEditable } from '../../../redux/slices/admin-panel';
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import CreateForm from "./create-form";
import EditForm from "./edit-form";

const YugiohForm = () => {
	const dispatch = useAppDispatch();

	const yugiohEditable = useAppSelector(
		(store) => store.adminPanelSlice.yugiohEditable,
	);

	useEffect(() => {
		return () => {
			dispatch(setYugiohEditable(null));
		};
	}, [dispatch]);

	return yugiohEditable ? (
		<EditForm editable={yugiohEditable} />
	) : (
		<CreateForm />
	);
};

export default YugiohForm;
