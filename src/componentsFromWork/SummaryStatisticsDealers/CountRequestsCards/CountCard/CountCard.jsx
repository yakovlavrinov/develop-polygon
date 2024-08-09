
import React from 'react'
import { observer } from 'mobx-react'
import { Box, Typography } from '@mui/material'
import questionIcon from 'src/assets/images/countRequestCards/questionIcon.svg'

export const CountCard = observer(({ icon, title, count, /*detail,*/ colorCount }) => {
    return (
        <Box
            sx={{
                width: '100%',
                alignItems: 'center',
                padding: '8px 24px 8px 24px',
                borderRadius: '6px',
                backgroundColor: 'rgba(255, 255, 255, 1)',
            }}
        >
            <Box sx={{ display: 'flex', gap: '4px' ,marginBottom: '8px' }}>
                <Box component='img' src={icon} alt='Иконка счётчика' />
                <Typography sx={{ fontWeight: '400', fontSize: '12px', whiteSpace: 'pre' }}>{title}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '4px', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: '500', fontSize: '36px', color: colorCount }}>{count}</Typography>
                <Box sx={{ cursor: 'pointer' }} component='img' src={questionIcon} alt='Знак вопроса' />
            </Box>
        </Box>
    )
})
