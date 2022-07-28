import { firestoreUserType } from '../auth-slice';
import { Order } from '../my-orders-slice';
import { YugiohCardType } from '../yugioh-slice';

export type NavItem = {
	label: string;
	subLabel?: string;
	children?: Array<NavItem>;
	href?: string;
};

export type adminPanelState = {
	navItems: NavItem[];
	isFetchingData: boolean;
	isModalInventoryOpen: boolean;
	yugiohInventory: YugiohCardType[];
	yugiohEditable: YugiohCardType | null;
	yugiohCardTypes: string[];
	yugiohCardAttributes: string[];
	yugiohCardRarities: string[];
	isSubmmiting: boolean;
	clientList: firestoreUserType[];
	clientOrders: Order[];
	clientData: firestoreUserType | null;
	clientOrderModal: boolean;
	clientOrderModalData: Order | null;
};

export type YugiohCardMutableData = {
	url: string;
	name: string;
	rarity: string;
	attribute: string;
	cardType: string;
	printTag: string;
	setName: string;
	Spanish: number;
	English: number;
	isActive: boolean;
};
