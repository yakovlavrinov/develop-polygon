import { Box, TableCell, TableRow } from '@mui/material'
import { observer } from 'mobx-react'
import React, { FC } from 'react'

interface SumStatisticsProps {
    columns: string[]
}

export const SumStatistics: FC<SumStatisticsProps> = observer(({ columns }) => {
    return (
        <TableRow>
            {columns.map((column: string) => {
                return column === 'checkbox' ? <TableCell/> : column === 'Исполнитель' ? (
                    <TableCell sx={{
                        fontWeight: '500',
                        fontSize: '20px',
                        lineHeight: '24px',
                        color: 'rgba(0, 0, 0, 1)',
                        textAlign: 'left',
                    }} key={column}>{'ВСЕ ДИЛЕРЫ'}</TableCell>
                ) : (
                    <TableCell sx={{
                        fontWeight: '500',
                        fontSize: '20px',
                        lineHeight: '24px',
                        color: 'rgba(0, 0, 0, 1)',
                        textAlign: 'center',
                    }} key={column}>{'data'}</TableCell>
                )
            })}
        </TableRow>
    )
})
