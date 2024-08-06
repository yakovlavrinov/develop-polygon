import React from 'react'
import { Box, Typography } from '@mui/material'
import filterIcon from '../../../assets/images/common/filterIcon.svg'
export const SummaryStatisticsDealersFilters = () => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(246, 246, 246, 1', borderRadius: '8px', height: '40px' }}>
            <Typography>Результаты поиска</Typography>
            <Box component='img' src={filterIcon} alt='Иконка поиска'/>
        </Box>
    )
}
