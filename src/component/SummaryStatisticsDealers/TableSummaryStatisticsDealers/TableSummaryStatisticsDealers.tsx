import { FC } from "react";
import { observer } from "mobx-react";
import { Box, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { HeadTableCell } from "./HeadTableCell/HeadTableCell";
import { BodyTableCell } from "./BodyTableCell/BodyTableCell";
import { PageSwitch } from "./PageSwitch/PageSwitch";
import { SumStatistics } from "./SumStatistics/SumStatistics";
import { TablePagination } from "./TablePagination/TablePagination";

export const TableSummaryStatisticsDealers: FC = observer(() => {
    const columns = [
        "checkbox",
        "Исполнитель",
        "Назначено",
        "Из них просрочено",
        "Установленно",
        "Из них просрочено",
        "На Доработку",
        "В Дубликат",
        "В Невозможно",
        "Среднее время установки",
    ];
    const rows = [7, 6, 5, 4, 3, 2, 1];
    return (
        <Box>
            <TableContainer sx={{ padding: "12px" }} component={Paper}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "0 0 25px 0",
                        padding: "10px 20px 10px 20px",
                        borderBottom: "1px solid rgba(165, 165, 165, 1)",
                    }}
                >
                    <Typography
                        sx={{ fontWeight: "500", fontSize: "16px", lineHeight: "24px", color: "rgba(46, 46, 46, 1)" }}
                    >
                        По выбранным дилерам
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontSize: "16px",
                            lineHeight: "19,36px",
                            color: "rgba(39, 39, 39, 1)",
                        }}
                    >
                        Вт 31.07.2024 (сегодня)
                    </Typography>
                    <PageSwitch />
                </Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => {
                                return <HeadTableCell key={column}>{column}</HeadTableCell>;
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row}>
                                {columns.map((column) => {
                                    return (
                                        <BodyTableCell key={column} column={column}>
                                            {row}
                                        </BodyTableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                        <SumStatistics columns={columns} />
                    </TableBody>
                </Table>
                <TablePagination size={[10, 20, 50]} />
            </TableContainer>
        </Box>
    );
});
