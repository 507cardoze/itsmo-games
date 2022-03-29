import Head from "next/head";

function HTMLheader() {
	return (
		<Head>
			<title>Istmo Games Inventario</title>
			<meta
				name='viewport'
				content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
			/>
			<meta name='description' content='Istmo Games Inventario' />
			<link rel='manifest' href='/manifest.json' />
			<link
				rel='apple-touch-icon'
				sizes='180x180'
				href='/icons/apple-touch-icon.png'
			/>
			<link
				rel='icon'
				type='image/png'
				sizes='32x32'
				href='/icons/favicon-32x32.png'
			/>
			<link
				rel='icon'
				type='image/png'
				sizes='16x16'
				href='/icons/favicon-16x16.png'
			/>

			<link
				rel='mask-icon'
				href='/icons/safari-pinned-tab.svg'
				color='#001f34'
			/>
			<meta name='apple-mobile-web-app-title' content='Istmo Games' />
			<meta name='application-name' content='Istmo Games' />
			<meta name='msapplication-TileColor' content='#001f34' />
			<meta name='theme-color' content='#001f34' />
		</Head>
	);
}

export default HTMLheader;
