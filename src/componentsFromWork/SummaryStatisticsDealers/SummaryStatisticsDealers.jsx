import { observer } from 'mobx-react'
import { ToggleBlock } from './ToggleBlock/ToggleBlock'
import { CountRequestCards } from './CountRequestsCards/CountRequestCards'
import { Box } from '@mui/material'
import { TableSummaryStatisticsDealers } from './TableSummaryStatisticsDealers/TableSummaryStatisticsDealers'
import React, { useEffect } from 'react'
import { SummaryStatisticsDealersFilters } from './SummaryStatisticsDealersFilters/SummaryStatistycsDealersFilters'
import summaryStatisticsDealersStoreInstance from './store/SummaryStatisticsDealersStore'

export const SummaryStatisticsDealers = observer(() => {
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <ToggleBlock />
            <SummaryStatisticsDealersFilters />
            <CountRequestCards />
            <TableSummaryStatisticsDealers />
        </Box>
    )
})
