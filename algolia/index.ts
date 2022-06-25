import algoliasearch from 'algoliasearch/lite';
import { YugiohCardType } from '../redux/slices/yugioh-slice';

const APPLICATION_ID = '1C26QW8RZ1';
const SEARCH_API_KEY = '1d3e1cc590b09fac46d928f19d44aad5';
const ALGOLIA_INDEX = 'yugiohList';

const client = algoliasearch(APPLICATION_ID, SEARCH_API_KEY);
const index = client.initIndex(ALGOLIA_INDEX);

export const performAlgoliaSearch = async (value: string) => {
	const { hits } = (await index
		.search(value, {
			hitsPerPage: 5,
		})
		.then((res) => {
			return res;
		})
		.catch((err) => {
			throw new Error(err);
		})) as any;

	const results: YugiohCardType[] = hits.map((hit: YugiohCardType) => {
		const {
			dateCreated,
			attribute,
			English,
			Spanish,
			cardProperty,
			cardType,
			isActive,
			name,
			printTag,
			rarity,
			setName,
			tcgName,
			uid,
			url,
		} = hit;
		return {
			dateCreated,
			attribute,
			English,
			Spanish,
			cardProperty,
			cardType,
			isActive,
			name,
			printTag,
			rarity,
			setName,
			tcgName,
			uid,
			url,
		};
	});

	return results;
};
