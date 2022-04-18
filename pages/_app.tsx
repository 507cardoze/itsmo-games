import type { AppProps } from "next/app";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import theme from "../theme";
//redux
import {Provider} from 'react-redux';
import { persistor, store } from "../redux/store";
import HTMLheader from "../components/html-header/html-header";
import Layout from "../layout";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ChakraProvider theme={theme}>
					<Layout>
						<CSSReset />
						<HTMLheader />
						<Component {...pageProps} />
					</Layout>
				</ChakraProvider>
			</PersistGate>
		</Provider>
	);
}

export default MyApp;
