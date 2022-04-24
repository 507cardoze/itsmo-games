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
	Switch,
	FormHelperText,
} from "@chakra-ui/react";
import { ChangeEvent, SyntheticEvent } from "react";
import { validateYugiohForm } from "../../../common/validateForms";
import {
	setisSubmmiting,
	setModalInventory,
	setYugiohEditable,
	updateCardItem,
} from "../../../redux/slices/admin-panel-slice";
import { YugiohCardType } from "../../../redux/slices/yugioh-slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import SliderInput from "../../number-slider-input";

type PropsTypes = {
	editable: YugiohCardType;
};

const EditForm = ({ editable }: PropsTypes) => {
	const dispatch = useAppDispatch();

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
		await dispatch(updateCardItem(editable));
		dispatch(setisSubmmiting(false));
		dispatch(setModalInventory(false));
	};

	const handleChange = (
		event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
	) => {
		const { name, value } = event.target;

		dispatch(setYugiohEditable({ ...editable, [name]: value }));
	};

	const handleSliderChange = (value: number, name: string) => {
		dispatch(setYugiohEditable({ ...editable, [name]: value }));
	};

	//console.log(editable);

	return (
		<chakra.form onSubmit={handleSaveChanges} flexDirection='column' mt={4}>
			<chakra.span
				fontSize={{ base: "xl", sm: "2xl" }}
				fontWeight='extrabold'
				letterSpacing='tight'
				lineHeight='shorter'
				color={useColorModeValue("gray.900", "gray.100")}
				mb={6}>
				<chakra.span display='block'>
					Editar {editable.name} - {editable.uid}{" "}
				</chakra.span>
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
						value={editable.url || ""}
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
						value={editable.name || ""}
						onChange={handleChange}
					/>
					<FormHelperText>
						Este dato es importante para el funcionamiento del sistema,
						asegurarse que el tag esta bien escrito.
					</FormHelperText>
				</FormControl>
				<FormControl isRequired>
					<FormLabel htmlFor='printTag'>Print Tag</FormLabel>
					<Input
						name='printTag'
						id='printTag'
						type='text'
						w='full'
						focusBorderColor='blue.500'
						value={editable.printTag || ""}
						onChange={handleChange}
					/>

					<FormHelperText>
						Si este dato correcto no se mostrara correctamente en los detalles
						de la pagina , asegurarse que el tag esta bien escrito.
					</FormHelperText>
				</FormControl>

				<FormControl isRequired>
					<FormLabel htmlFor='setName'>Set Name</FormLabel>
					<Input
						name='setName'
						id='setName'
						type='text'
						w='full'
						focusBorderColor='blue.500'
						value={editable.setName || ""}
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
						value={editable.rarity || ""}
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
						value={editable.cardType || ""}
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
						value={editable.attribute || ""}
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
						value={editable.Spanish || 0}
						handleChange={(newValue) => handleSliderChange(newValue, "Spanish")}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Cantidad en Inglés</FormLabel>
					<SliderInput
						value={editable.English || 0}
						handleChange={(newValue) => handleSliderChange(newValue, "English")}
					/>
				</FormControl>
				<FormControl display='flex' alignItems='center'>
					<FormLabel htmlFor='isActive' mb='0'>
						Visible para la venta?
					</FormLabel>
					<Switch
						id='isActive'
						name='isActive'
						isChecked={editable.isActive}
						onChange={(e) =>
							dispatch(
								setYugiohEditable({ ...editable, isActive: e.target.checked }),
							)
						}
						colorScheme='green'
					/>
				</FormControl>
				<Button
					disabled={validateYugiohForm(editable)}
					colorScheme='blue'
					bgGradient='linear(to-r, blue.400, blue.500, blue.600)'
					color='white'
					variant='solid'
					isFullWidth
					type='submit'
					isLoading={isSubmmiting}
					loadingText='Guardando...'>
					Guardar Cambios
				</Button>
			</Box>
		</chakra.form>
	);
};;

export default EditForm;
