import { Box, TableCell, TableRow } from '@mui/material'
import { observer } from 'mobx-react'
import React, { FC } from 'react'
import summaryStatisticsDealersStoreInstance from '../../store/SummaryStatisticsDealersStore'
export const SumStatistics = observer(({ columns }) => {
    const { isLoading, data } = summaryStatisticsDealersStoreInstance
    return (
        <TableRow sx={{ backgroundColor: 'rgba(222, 238, 251, 1)' }}>
            {columns.map((column) => {
                const { propName, label } = column
                return propName === 'checkbox' ? (
                    <TableCell />
                ) : label === 'Исполнитель' ? (
                    <TableCell
                        sx={{
                            fontWeight: '500',
                            fontSize: '20px',
                            lineHeight: '24px',
                            color: 'rgba(0, 0, 0, 1)',
                            textAlign: 'left',
                        }}
                        key={column}
                    >
                        {'ВСЕ ДИЛЕРЫ'}
                    </TableCell>
                ) : (
                    <TableCell
                        sx={{
                            fontWeight: '500',
                            fontSize: '20px',
                            lineHeight: '24px',
                            color: 'rgba(0, 0, 0, 1)',
                            textAlign: 'center',
                        }}
                        key={column}
                    >
                        {propName === 'averageProcessingTimeHours'
                            ? (Math.round(data[propName] * 10) / 10).toFixed(1)
                            : data[propName]}
                        
                    </TableCell>
                )
            })}
        </TableRow>
    )
})
