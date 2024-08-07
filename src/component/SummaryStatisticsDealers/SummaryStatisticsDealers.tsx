import { FC } from "react";
import { observer } from "mobx-react";
import { ToggleBlock } from "./ToggleBlock/ToggleBlock";
import { CountRequestCards } from "./CountRequestsCards/CountRequestCards";
import { Box, Button } from "@mui/material";
import { TableSummaryStatisticsDealers } from "./TableSummaryStatisticsDealers/TableSummaryStatisticsDealers";
import moment from "moment";

// import summaryStatisticsDealersStore from './store/SummaryStatisticsDealersStore'

export const SummaryStatisticsDealers: FC = observer(() => {
    function getWeeksOfMonth(year, month) {
        // Начало месяца
        let startOfMonth = moment(`${year}-${month}-01`).startOf('day');
        // Конец месяца
        let endOfMonth = startOfMonth.clone().endOf('month').endOf('day');
        let weeks = [];
        
        // Начало первой недели (с 1 числа месяца)
        let firstWeekStart = startOfMonth.clone();
        let firstWeekEnd = firstWeekStart.clone().endOf('week').endOf('day');
        
        // Если первая неделя выходит за пределы месяца, корректируем конец недели
        if (firstWeekEnd.isAfter(endOfMonth)) {
            firstWeekEnd = endOfMonth.clone();
        }
    
        weeks.push({
            start: firstWeekStart.toISOString(),
            end: firstWeekEnd.toISOString(),
        });
    
        // Начало следующей недели
        let currentStart = firstWeekEnd.clone().add(1, 'day').startOf('day');
        
        while (currentStart.isBefore(endOfMonth)) {
            let currentEnd = currentStart.clone().endOf('week').endOf('day');
            
            // Если конец недели превышает конец месяца, корректируем его
            if (currentEnd.isAfter(endOfMonth)) {
                currentEnd = endOfMonth.clone();
            }
    
            weeks.push({
                start: currentStart.toISOString(),
                end: currentEnd.toISOString(),
            });
    
            // Переход к следующей неделе
            currentStart = currentEnd.clone().add(1, 'day').startOf('day');
        }
    
        return weeks;
    }
    
    // Пример использования
    console.log(getWeeksOfMonth(2024, 8));
    
    
    

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Button onClick={() => console.log(getWeeksOfMonth(2024, 8))}>Получить недели</Button>
            <ToggleBlock />
            <CountRequestCards />
            <TableSummaryStatisticsDealers />
        </Box>
    );
});
