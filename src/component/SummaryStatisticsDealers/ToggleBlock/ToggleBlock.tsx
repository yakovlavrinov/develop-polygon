import { FC } from "react";
import { observer } from "mobx-react";
import { Box } from "@mui/material";
import { ToggleButton } from "./ToggleButton/ToggleButton";
import summaryStatisticsDealersStore from "../store/SummaryStatisticsDealersStore";

export type Buttons = {
    key: string;
    label: string;
};

export const ToggleBlock: FC = observer(() => {
    const { subpage } = summaryStatisticsDealersStore;

    const { today, period, total } = subpage;

    const buttons: Buttons[] = [
        { key: today, label: "НА СЕГОДНЯ" },
        { key: period, label: "ЗА ОТЧЕТНЫЙ ПЕРИОД" },
        { key: total, label: "СУММАРНО ЗА ВСЁ ВРЕМЯ" },
    ];

    return (
        <Box>
            <Box sx={{ display: "flex", gap: "4px" }}>
                {buttons.map(({ key, label }) => (
                    <ToggleButton key={key} active={key} label={label} />
                ))}
            </Box>
        </Box>
    );
});
