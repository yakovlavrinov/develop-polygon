import React from "react";
import { observer } from "mobx-react";
import { Box, Typography } from "@mui/material";
import { toggleButtonBoxStyles, toggleButtonTextStyles } from "./ToggleButtonStyles";
import newIcon from "src/assets/images/orderStatuses/new.svg";
import newGrayIcon from "src/assets/images/orderStatuses/newGray.svg";
import summaryStatisticsDealersStore from "../../store/SummaryStatisticsDealersStore";



export const ToggleButton = observer(({ label, active }) => {
    const { activeToggleBlockItem, setActiveToggleBlockItem } = summaryStatisticsDealersStore;

    

    const isActive = activeToggleBlockItem === active;
    return (
        <Box
            onClick={() => setActiveToggleBlockItem(active)}
            sx={{
                ...toggleButtonBoxStyles,
                background: isActive ? "rgba(246, 246, 246, 1)" : null,
            }}
        >
            <Box component="img" alt="" src={isActive ? newIcon : newGrayIcon} />
            <Typography
                sx={{
                    ...toggleButtonTextStyles,
                    color: isActive ? "rgba(14, 28, 44, 1)" : "rgba(95, 95, 95, 1)",
                }}
            >
                {label}
            </Typography>
        </Box>
    );
});
