import algoliasearch from 'algoliasearch/lite';
import { YugiohCardType } from '../redux/slices/yugioh-slice';
const APPLICATION_ID = `${process.env.NEXT_PUBLIC_APPLICATION_ID}`;
const SEARCH_API_KEY = `${process.env.NEXT_PUBLIC_SEARCH_API_KEY_YUGIOH}`;
const ALGOLIA_INDEX = 'yugiohList';

const client = algoliasearch(APPLICATION_ID, SEARCH_API_KEY);
const index = client.initIndex(ALGOLIA_INDEX);

export const performAlgoliaSearch = async (
	value: string
): Promise<YugiohCardType[]> => {
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
