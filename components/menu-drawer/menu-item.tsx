import { Button } from "@chakra-ui/react";

type PropsTypes = {
	label: string;
	Icono?: any;
	handleOnClick?: () => void;
};

const MenuItem = ({ label, Icono, handleOnClick }: PropsTypes) => {
	return (
		<Button
			bg='#003e69'
			color='white'
			_hover={{
				bg: "#005d9c",
				color: "white",
			}}
			borderRadius={0}
			variant='solid'
			onClick={handleOnClick}
			isFullWidth
			leftIcon={Icono ? Icono : null}>
			{label}
		</Button>
	);
};

export default MenuItem;
