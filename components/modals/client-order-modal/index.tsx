import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';
import {
	setClientOrderModal,
	setClientOrderModalData,
} from '../../../redux/slices/admin-panel';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { ClientOrderForm } from '../../forms';

const ClientOrderModal = () => {
	const dispatch = useAppDispatch();
	const clientOrderModal = useAppSelector(
		(store) => store.adminPanelSlice.clientOrderModal
	);
	const handleClose = () => {
		dispatch(setClientOrderModal(false));
		dispatch(setClientOrderModalData(null));
	};

	return (
		<Modal onClose={handleClose} size="xl" isOpen={clientOrderModal}>
			<ModalOverlay />
			<ModalContent>
				<ModalBody>
					<ClientOrderForm />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default ClientOrderModal;
