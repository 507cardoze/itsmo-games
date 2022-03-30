import type { AppProps } from "next/app";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import theme from "../theme";
//redux
import {Provider} from 'react-redux';
import { store } from "../redux/store";
import HTMLheader from "../components/html-header/html-header";
import Layout from "../layout";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<Layout>
					<CSSReset />
					<HTMLheader />
					<Component {...pageProps} />
				</Layout>
			</ChakraProvider>
		</Provider>
	);
}

export default MyApp;
