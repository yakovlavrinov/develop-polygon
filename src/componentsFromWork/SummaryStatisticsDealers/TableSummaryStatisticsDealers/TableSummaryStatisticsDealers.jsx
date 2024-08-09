import React from 'react'
import { observer } from 'mobx-react'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { HeadTableCell } from './HeadTableCell/HeadTableCell'
import { BodyTableCell } from './BodyTableCell/BodyTableCell'
import { PageSwitch } from './PageSwitch/PageSwitch'
import { SumStatistics } from './SumStatistics/SumStatistics'
import { TablePagination } from './TablePagination/TablePagination'
import summaryStatisticsDealersStoreInstance from '../store/SummaryStatisticsDealersStore'
import { getComp } from '../../../utils/utils/DI'
import { FormattedMessage } from 'react-intl'
import { IntervalPanel } from './IntervalPanel/IntervalPanel'

export const TableSummaryStatisticsDealers = observer(() => {
    const dealersStore = getComp('DealersStore')
    const { isLoading, rows, activeToggleBlockItem, subpage } = summaryStatisticsDealersStoreInstance
    const columns = [
        { propName: 'checkbox', label: 'checkbox' },
        { propName: 'dealerId', label: 'Исполнитель' },
        { propName: 'assigns', label: 'Назначено' },
        { propName: 'expiredAssigns', label: 'Из них просрочено' },
        { propName: 'installs', label: 'Установлено' },
        { propName: 'expiredInstalls', label: 'Из них просрочено' },
        { propName: 'improvement', label: 'На Доработку' },
        { propName: 'duplicates', label: 'В Дубликат' },
        { propName: 'impossible', label: 'В Невозможно' },
        { propName: 'averageProcessingTimeHours', label: 'Среднее время установки' },
    ]

    
    return (
        <Box>
            <TableContainer sx={{ padding: '12px' }} component={Paper}>
               <IntervalPanel/>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => {
                                const { propName, label } = column
                                return <HeadTableCell key={propName}>{label}</HeadTableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                sx={{
                                    backgroundColor:
                                        index % 2 === 0 ? 'rgba(217, 217, 217, 0.2)' : 'rgba(254, 254, 254, 1)',
                                }}
                                key={row}
                            >
                                {columns.map((column) => {
                                    const { propName } = column
                                    return (
                                        <BodyTableCell key={column} column={column}>
                                            {propName === 'dealerId'
                                                ? dealersStore.getDealer(row[propName])?.displayName
                                                : propName === 'averageProcessingTimeHours'
                                                ? (Math.round(row[propName] * 10) / 10).toFixed(1)
                                                : row[propName]}
                                        </BodyTableCell>
                                    )
                                })}
                            </TableRow>
                        ))}
                        {!!rows.length  && <SumStatistics columns={columns} />}
                    </TableBody>
                </Table>
                {false && <TablePagination size={[10, 20, 50]} />}

                {isLoading && (
                    <Box className={'jst-center'} width={1} p={4.5} sx={{ background: 'rgba(217, 217, 217, 0.20)' }}>
                        <Typography sx={{ fontWeight: '500', color: '#A9A9A9', fontSize: '13px' }}>
                            {rows.length ||
                                (isLoading ? (
                                    <FormattedMessage id={'загрузка..'} />
                                ) : (
                                    <FormattedMessage id={'нет данных для отображения'} />
                                ))}
                        </Typography>
                    </Box>
                )}
            </TableContainer>
        </Box>
    )
})
