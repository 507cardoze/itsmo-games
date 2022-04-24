import {
	Flex,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
} from "@chakra-ui/react";

type PropsTypes = {
	value: number;
	handleChange: (newValue: number) => void;
};

const SliderInput = ({ value, handleChange, ...rest }: PropsTypes) => {
	return (
		<Flex>
			<NumberInput
				{...rest}
				maxW='100px'
				mr='2rem'
				value={value}
				onChange={(e) => handleChange(parseInt(e))}>
				<NumberInputField />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>
			<Slider
				flex='1'
				focusThumbOnChange={false}
				value={value}
				onChange={handleChange}>
				<SliderTrack>
					<SliderFilledTrack />
				</SliderTrack>
				<SliderThumb fontSize='sm' boxSize='32px'>
					{value}
				</SliderThumb>
			</Slider>
		</Flex>
	);
};

export default SliderInput;
