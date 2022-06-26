import {
	Box,
	Button,
	FormControl,
	Input,
	InputGroup,
	InputLeftElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useAppDispatch } from '../../redux/store';
import { getCardBySearchName } from '../../redux/slices/yugioh-slice';
import { ChangeEvent, FormEvent, useState } from 'react';

const Toolbar = () => {
	const dispatch = useAppDispatch();
	const [searchTerm, setSearchTerm] = useState<string>('');

	const handleChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
		setSearchTerm(e.target.value);
	};

	const handleOnEnter = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const trimmedSearch = searchTerm.trim();

		if (trimmedSearch.length === 0) return;

		//dispatch(getCardBySearchName({ searchTerm }));
	};

	return (
		<form onSubmit={handleOnEnter}>
			<FormControl
				m={5}
				sx={{
					width: {
						base: '90%',
						md: '450px',
					},
				}}>
				<InputGroup>
					<InputLeftElement pointerEvents="none">
						<SearchIcon color="gray.300" />
					</InputLeftElement>
					<Input
						type="text"
						placeholder="Buscar..."
						value={searchTerm}
						onChange={handleChangeInput}
					/>
				</InputGroup>
			</FormControl>
			<FormControl
				m={5}
				sx={{
					width: {
						base: '90%',
						md: '450px',
					},
				}}>
				<Button type="submit" variant="solid" w="full">
					Buscar
				</Button>
			</FormControl>
		</form>
	);
};

export default Toolbar;
