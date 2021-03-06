import {
	Flex,
	Text,
	Stack,
	Collapse,
	Icon,
	Link,
	useColorModeValue,
	useDisclosure,
	Button,
} from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useAppSelector } from '../../redux/store';
import { NavItem } from '../../redux/slices/admin-panel/admin-panel.types';
import { useRouter } from 'next/router';

const MobileNav = () => {
	const navItems = useAppSelector((store) => store.adminPanelSlice.navItems);
	return (
		<Stack
			bg={useColorModeValue("white", "gray.800")}
			p={4}
			display={{ md: "none" }}>
			{navItems.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	);
};

export default MobileNav;

const MobileNavItem = ({ label, children, href }: NavItem) => {
	const { isOpen, onToggle } = useDisclosure();

	const router = useRouter();

	const handleClick = (href: string | undefined) => {
		if (href) {
			router.push(href);
		}
	};

	return (
		<Stack spacing={4} onClick={children && onToggle}>
			<Flex
				py={2}
				as={Link}
				href={href ?? '#'}
				justify={'space-between'}
				align={'center'}
				_hover={{
					textDecoration: 'none',
				}}>
				<Text
					fontWeight={600}
					color={useColorModeValue('gray.600', 'gray.200')}>
					{label}
				</Text>
				{children && (
					<Icon
						as={ChevronDownIcon}
						transition={'all .25s ease-in-out'}
						transform={isOpen ? 'rotate(180deg)' : ''}
						w={6}
						h={6}
					/>
				)}
			</Flex>

			<Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
				<Stack
					mt={2}
					pl={4}
					borderLeft={1}
					borderStyle={'solid'}
					borderColor={useColorModeValue('gray.200', 'gray.700')}
					align={'start'}>
					{children &&
						children.map((child) => (
							<Button
								key={child.label}
								py={2}
								onClick={() => handleClick(child.href)}>
								{child.label}
							</Button>
						))}
				</Stack>
			</Collapse>
		</Stack>
	);
};
