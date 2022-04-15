import { Box, Image } from "@chakra-ui/react";
import React, { SyntheticEvent } from "react";

const Calendar = () => {
	return (
		<Box w='100%' sx={{ pb: 5, display: "flex", justifyContent: "center" }}>
			<Image
				alt='Calendar'
				fallbackSrc='/Istmo Games.png'
				onError={(e: SyntheticEvent<HTMLImageElement, Event>) =>
					(e.currentTarget.src = "/Istmo Games.png")
				}
				src='https://binaries.templates.cdn.office.net/support/templates/en-us/lt04014209_quantized.png'
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
