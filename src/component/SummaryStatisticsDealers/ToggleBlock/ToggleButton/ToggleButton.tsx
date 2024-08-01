import { FC } from "react";
import { observer } from "mobx-react";
import { Box, Typography } from "@mui/material";
import { toggleButtonBoxStyles, toggleButtonTextStyles } from "./ToggleButtonStyles";
// import newIcon from 'src/assets/images/orderStatuses/new.svg'
// import newGrayIcon from 'src/assets/images/orderStatuses/newGray.svg'

interface ToggleButtonProps {
    isActive: boolean;
    onClick: () => void;
    label: string;
}

export const ToggleButton: FC<ToggleButtonProps> = observer(({ isActive, onClick, label }) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                ...toggleButtonBoxStyles,
                background: isActive ? "rgba(0, 0, 0, 0.15)" : null,
            }}
        >
            <Box component="img" alt="" src={isActive ? "X" : "x"} />
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
