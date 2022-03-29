import type { AppProps } from "next/app";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import theme from "../theme";
//redux
import {Provider} from 'react-redux';
import {store} from '../redux/store';
import HTMLheader from "../components/html-header/html-header";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<CSSReset />
				<HTMLheader />
				<Component {...pageProps} />
			</ChakraProvider>
		</Provider>
	);
}

export default MyApp;
