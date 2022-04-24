import {
	Box,
	Stack,
	Link,
	Popover,
	PopoverTrigger,
	PopoverContent,
	useColorModeValue,
	Text,
	Flex,
	Icon,
	Button,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useAppSelector } from "../../redux/store";
import { NavItem } from "../../redux/slices/admin-panel-slice";
import { useRouter } from "next/router";

const DesktopNav = () => {
	const linkColor = "gray.600";
	const linkHoverColor = "gray.800";
	const popoverContentBgColor = "white";

	const router = useRouter();

	const navItems = useAppSelector((store) => store.adminPanelSlice.navItems);

	return (
		<Stack direction={"row"} spacing={4}>
			{navItems.map((navItem) => (
				<Box key={navItem.label}>
					<Popover trigger={"hover"} placement={"bottom-start"}>
						<PopoverTrigger>
							<Button
								onClick={() => router.push(navItem.href ?? "#")}
								variant='ghost'
								p={2}
								fontSize={"sm"}
								fontWeight={500}
								color={linkColor}
								_hover={{
									textDecoration: "none",
									color: linkHoverColor,
								}}>
								{navItem.label}
							</Button>
						</PopoverTrigger>

						{navItem.children && (
							<PopoverContent
								border={0}
								boxShadow={"xl"}
								bg={popoverContentBgColor}
								p={4}
								rounded={"xl"}
								minW={"sm"}>
								<Stack>
									{navItem.children.map((child) => (
										<DesktopSubNav key={child.label} {...child} />
									))}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

export default DesktopNav;

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
	const router = useRouter();
	return (
		<Button
			variant='ghost'
			onClick={() => router.push(href ?? "#")}
			role={"group"}
			display={"block"}
			p={2}
			rounded={"md"}
			_hover={{ bg: "blue.50" }}>
			<Stack direction={"row"} align={"center"}>
				<Box>
					<Text
						transition={"all .3s ease"}
						_groupHover={{ color: "blue.400" }}
						fontWeight={500}>
						{label}
					</Text>
					<Text fontSize={"sm"} fontWeight='normal'>
						{subLabel}
					</Text>
				</Box>
				<Flex
					transition={"all .3s ease"}
					transform={"translateX(-10px)"}
					opacity={0}
					_groupHover={{ opacity: "100%", transform: "translateX(0)" }}
					justify={"flex-end"}
					align={"center"}
					flex={1}>
					<Icon color={"blue.400"} w={5} h={5} as={ChevronRightIcon} />
				</Flex>
			</Stack>
		</Button>
	);
};
