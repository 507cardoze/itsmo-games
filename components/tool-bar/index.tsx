import {
	Box,
	Input,
	InputGroup,
	InputLeftElement,
	Select,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setSearchTerm } from "../../redux/slices/yugioh-slice";

const Toolbar = () => {
	const dispatch = useAppDispatch();
	const searchTerm = useAppSelector(
		(store) => store.YugiohCardListSlice.searchTerm,
	);
	const filterBy = useAppSelector(
		(store) => store.YugiohCardListSlice.filterBy,
	);

	return (
		<Box sx={{ width: "100%" }}>
			<Box
				m={5}
				sx={{
					width: {
						base: "80%",
						md: "450px",
					},
				}}>
				<InputGroup>
					<InputLeftElement pointerEvents='none'>
						<SearchIcon color='gray.300' />
					</InputLeftElement>
					<Input
						type='text'
						placeholder='Buscar...'
						value={searchTerm}
						onChange={(e) => dispatch(setSearchTerm(e.target.value))}
					/>
				</InputGroup>
			</Box>
			{/* <Box
				m={5}
				sx={{
					width: {
						base: "80%",
						md: "450px",
					},
				}}>
				<Select placeholder='Filtrar por'>
					<option value='option1'>Option 1</option>
					<option value='option2'>Option 2</option>
					<option value='option3'>Option 3</option>
				</Select>
			</Box> */}
		</Box>
	);
};

export default Toolbar;
