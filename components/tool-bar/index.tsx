import {
	Box,
	Input,
	InputGroup,
	InputLeftElement,
	Select,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const Toolbar = () => {
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
					<Input type='text' placeholder='Buscar por ...' />
				</InputGroup>
			</Box>
			<Box
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
			</Box>
		</Box>
	);
};

export default Toolbar;
