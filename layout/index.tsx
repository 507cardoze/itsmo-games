import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
	return <Box sx={{ backgroundColor: "red", width: "100%" }}>{children}</Box>;
};

export default Layout;
