import algoliasearch from 'algoliasearch/lite';
import { Order } from '../redux/slices/my-orders-slice';

const APPLICATION_ID = `${process.env.NEXT_PUBLIC_APPLICATION_ID}`;
const SEARCH_API_KEY = `${process.env.NEXT_PUBLIC_SEARCH_API_KEY_ORDERS}`;
const ALGOLIA_INDEX = 'orders';

const client = algoliasearch(APPLICATION_ID, SEARCH_API_KEY);
const index = client.initIndex(ALGOLIA_INDEX);

export const performAlgoliaSearch = async (value: string): Promise<Order[]> => {
	const { hits } = (await index
		.search(value, {
			hitsPerPage: 50,
		})
		.then((res) => {
			return res;
		})
		.catch((err) => {
			throw new Error(err);
		})) as any;

	const results: Order[] = hits.map((hit: Order) => {
		const {
			uid,
			address1,
			address2,
			city,
			userUid,
			status,
			metodoPago,
			useCredit,
			phoneNumber,
			created_at,
			items,
			clientName,
			clientEmail,
		} = hit;
		return {
			uid,
			address1,
			address2,
			city,
			userUid,
			status,
			metodoPago,
			useCredit,
			phoneNumber,
			created_at,
			items,
			clientName,
			clientEmail,
		};
	});

	return results;
};
