import { Box, Image } from "@chakra-ui/react";
import React, { SyntheticEvent } from "react";
import { useAppSelector } from "../../redux/store";

const Calendar = () => {
	const calendarUrl = useAppSelector(
		(store) => store.HomePageSlice.calendarUrl,
	);

	return (
		<Box w='100%' sx={{ pb: 5, display: "flex", justifyContent: "center" }}>
			<Image
				alt='Calendar'
				fallbackSrc='/Istmo Games.png'
				onError={(e: SyntheticEvent<HTMLImageElement, Event>) =>
					(e.currentTarget.src = "/Istmo Games.png")
				}
				src={calendarUrl || ""}
				sx={{
					width: "100%",
					maxWidth: "800px",
					height: "100%",
					maxHeight: "500px",
					objectFit: "fit",
				}}
			/>
		</Box>
	);
};

export default Calendar;
