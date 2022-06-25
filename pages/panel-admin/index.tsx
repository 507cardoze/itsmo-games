import type { NextPage } from "next";
import { useRouter } from 'next/router';
import { useAppSelector } from '../../redux/store';

const PanelAdmin: NextPage = () => {
	const currentUser = useAppSelector((store) => store.AuthSlice.currentUser);

	const router = useRouter();

	if (!currentUser || !currentUser.isAdmin) {
		router.push('/');
		return null;
	}

	return <></>;
};

export default PanelAdmin;
