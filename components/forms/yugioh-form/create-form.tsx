import {
	Stack,
	Button,
	chakra,
	useColorModeValue,
	FormControl,
	FormLabel,
	Input,
	Box,
	Select,
} from "@chakra-ui/react";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { validateYugiohForm } from "../../../common/validateForms";
import {
	saveNewCard,
	setisSubmmiting,
	setModalInventory,
	YugiohCardMutableData,
} from "../../../redux/slices/admin-panel-slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import SliderInput from "../../number-slider-input";

const CreateForm = () => {
	const dispatch = useAppDispatch();

	const [formData, setFormData] = useState<YugiohCardMutableData>({
		url: "",
		name: "",
		rarity: "",
		attribute: "",
		cardType: "",
		printTag: "",
		setName: "",
		Spanish: 0,
		English: 0,
		isActive: true,
	});

	const isSubmmiting = useAppSelector(
		(state) => state.adminPanelSlice.isSubmmiting,
	);

	const yugiohCardRarities = useAppSelector(
		(store) => store.adminPanelSlice.yugiohCardRarities,
	);

	const yugiohCardTypes = useAppSelector(
		(store) => store.adminPanelSlice.yugiohCardTypes,
	);

	const yugiohCardAttributes = useAppSelector(
		(store) => store.adminPanelSlice.yugiohCardAttributes,
	);

	const handleSaveChanges = async (event: SyntheticEvent) => {
		event.preventDefault();
		dispatch(setisSubmmiting(true));
		await dispatch(saveNewCard(formData));
		dispatch(setisSubmmiting(false));
		dispatch(setModalInventory(false));
	};

	const handleChange = (
		event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
	) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSliderChange = (value: number, name: string) => {
		setFormData({ ...formData, [name]: value });
	};

	return (
		<chakra.form onSubmit={handleSaveChanges} flexDirection='column' mt={4}>
			<chakra.span
				fontSize={{ base: "xl", sm: "2xl" }}
				fontWeight='extrabold'
				letterSpacing='tight'
				lineHeight='shorter'
				color={useColorModeValue("gray.900", "gray.100")}
				mb={6}>
				<chakra.span display='block'>Nueva carta</chakra.span>
			</chakra.span>
			<Box
				as={Stack}
				spacing={4}
				gap={4}
				flexDirection='column'
				alignItems='center'
				my={6}>
				<FormControl isRequired>
					<FormLabel htmlFor='url'>Image URL</FormLabel>
					<Input
						name='url'
						id='url'
						type='text'
						w='full'
						focusBorderColor='blue.500'
						value={formData.url}
						onChange={handleChange}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel htmlFor='name'>Nombre</FormLabel>
					<Input
						name='name'
						id='name'
						type='text'
						w='full'
						focusBorderColor='blue.500'
						value={formData.name}
						onChange={handleChange}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel htmlFor='printTag'>Print Tag</FormLabel>
					<Input
						name='printTag'
						id='printTag'
						type='text'
						w='full'
						focusBorderColor='blue.500'
						value={formData.printTag}
						onChange={handleChange}
					/>
				</FormControl>

				<FormControl isRequired>
					<FormLabel htmlFor='setName'>Set Name</FormLabel>
					<Input
						name='setName'
						id='setName'
						type='text'
						w='full'
						focusBorderColor='blue.500'
						value={formData.setName}
						onChange={handleChange}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel htmlFor='rarity'>Rarity</FormLabel>
					<Select
						name='rarity'
						id='rarity'
						w='full'
						focusBorderColor='blue.500'
						value={formData.rarity}
						onChange={handleChange}
						placeholder='Selecciona un rarity'>
						{yugiohCardRarities.map((rarity) => (
							<option key={rarity} value={rarity}>
								{rarity}
							</option>
						))}
					</Select>
				</FormControl>
				<FormControl isRequired>
					<FormLabel htmlFor='cardType'>Card Type</FormLabel>
					<Select
						name='cardType'
						id='cardType'
						w='full'
						focusBorderColor='blue.500'
						value={formData.cardType}
						onChange={handleChange}
						placeholder='Selecciona un cart type'>
						{yugiohCardTypes.map((cardType) => (
							<option key={cardType} value={cardType}>
								{cardType}
							</option>
						))}
					</Select>
				</FormControl>
				<FormControl isRequired>
					<FormLabel htmlFor='attribute'>Attribute</FormLabel>
					<Select
						name='attribute'
						id='attribute'
						w='full'
						focusBorderColor='blue.500'
						value={formData.attribute}
						onChange={handleChange}
						placeholder='Selecciona un Attribute'>
						{yugiohCardAttributes.map((attribute) => (
							<option key={attribute} value={attribute}>
								{attribute}
							</option>
						))}
					</Select>
				</FormControl>
				<FormControl>
					<FormLabel>Cantidad en Español</FormLabel>
					<SliderInput
						value={formData.Spanish}
						handleChange={(newValue) => handleSliderChange(newValue, "Spanish")}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Cantidad en Inglés</FormLabel>
					<SliderInput
						value={formData.English}
						handleChange={(newValue) => handleSliderChange(newValue, "English")}
					/>
				</FormControl>
				<Button
					disabled={validateYugiohForm(formData)}
					colorScheme='blue'
					bgGradient='linear(to-r, blue.400, blue.500, blue.600)'
					color='white'
					variant='solid'
					isFullWidth
					type='submit'
					isLoading={isSubmmiting}
					loadingText='Guardando...'>
					Guardar
				</Button>
			</Box>
		</chakra.form>
	);
};

export default CreateForm;
