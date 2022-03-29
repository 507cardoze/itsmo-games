import { Box, Heading, Text, Button } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import type { NextPage } from "next";

const Custom404: NextPage = () => {
	return (
		<Box
			textAlign='center'
			py={10}
			alignItems='center'
			justifyContent='center'
			flexDirection='column'
			display='flex'
			px={6}
			minH={"100vh"}>
			<Head>
				<title>404 Página no encontrada</title>
			</Head>
			<Heading
				display='inline-block'
				as='h2'
				size='2xl'
				bgGradient='linear(to-r, red.400, red.500, red.600)'
				backgroundClip='text'>
				404
			</Heading>
			<Text fontSize='18px' mt={3} mb={2}>
				Página no encontrada
			</Text>
			<Text color={"gray.500"} mb={6}>
				La página que estás buscando no parece existir
			</Text>

			<NextLink href={"/"} passHref>
				<Button
					colorScheme='red'
					bgGradient='linear(to-r, red.400, red.500, red.600)'
					color='white'
					variant='solid'>
					Volver a inicio
				</Button>
			</NextLink>
		</Box>
	);
};

export default Custom404;
