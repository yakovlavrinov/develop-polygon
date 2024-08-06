import React, { FC } from "react";
import { observer } from "mobx-react";
import { Box, Input, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { PageSwitch } from "../PageSwitch/PageSwitch";

interface TablePaginationProps {
    size: number[];
}

export const TablePagination: FC<TablePaginationProps> = observer(({ size }) => {
    const [age, setAge] = React.useState(size[0].toString());
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    return (
        <Box
            sx={{
                display: "flex",
                gap: "30px",
                justifyContent: "end",
                alignItems: "center",
                height: "60px",
                marginTop: "15px",
            }}
        >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Typography>Размер</Typography>
                <Select
                    sx={{
                        padding: "0",
                        border: "none",
                        "& .MuiOutlinedInput-root": {
                            padding: "0",
                            "& .MuiOutlinedInput-input": {
                                padding: "0",
                            },
                        },
                        "& .MuiSelect-select": {
                            padding: "0",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                        },
                    }}
                    value={age}
                    label="Age"
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                >
                    {size.map((value: number) => (
                        <MenuItem key={value} value={value}>
                            {value}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Typography>Страница</Typography>
                <Input sx={{ width: "20px" }} />
            </Box>
            <Box sx={{ marginRight: "20px" }}>
                <PageSwitch />
            </Box>
        </Box>
    );
});
