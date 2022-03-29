import {
	Box,
	Input,
	InputGroup,
	InputLeftElement,
	Select,
	Stack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const Toolbar = () => {
	return (
		<Box>
			<Box m={5} maxW='350px'>
				<InputGroup>
					<InputLeftElement
						pointerEvents='none'
						children={<SearchIcon color='gray.300' />}
					/>
					<Input type='text' placeholder='Buscar por ...' />
				</InputGroup>
			</Box>
			<Box m={5} maxW='350px'>
				<Select placeholder='Filtrar por'>
					<option value='option1'>Option 1</option>
					<option value='option2'>Option 2</option>
					<option value='option3'>Option 3</option>
				</Select>
			</Box>
		</Box>
	);
};

export default Toolbar;
