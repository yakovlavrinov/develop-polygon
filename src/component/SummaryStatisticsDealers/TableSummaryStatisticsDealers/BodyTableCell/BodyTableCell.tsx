import { FC, ReactNode } from "react";
import { Checkbox, TableCell } from "@mui/material";
import { observer } from "mobx-react";

interface BodyTableCellProps {
    children: ReactNode;
    column: string;
}
export const BodyTableCell: FC<BodyTableCellProps> = observer(({ column, children }) => {
    return column === "checkbox" ? (
        <TableCell sx={{ padding: "0" }}>
            <Checkbox />
        </TableCell>
    ) : (
        <TableCell
            sx={{
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "19,2px",
                color: "rgba(0, 0, 0, 1)",
                textAlign: column === "Исполнитель" ? "left" : "center",
            }}
        >
            {children}
        </TableCell>
    );
});
