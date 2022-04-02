import Logo from "./logo";
import CartButton from "../cart-drawer";
import MenuButton from "../menu-drawer";
import { Box } from "@chakra-ui/react";

const HeaderLogo = () => {
	return (
		<Box
			sx={{
				minHeight: "100px",
				backgroundColor: "#001f34",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				width: "100%",
				px: 6,
			}}>
			<MenuButton />
			<Logo />
			<CartButton />
		</Box>
	);
};

export default HeaderLogo;
