import { Box, Typography } from '@mui/material'
import { FC } from 'react'

import questionIcon from 'src/assets/images/countRequestCards/questionIcon.svg'

interface CountCardProps {
    icon: string
    title: string
    count: string
    detail: string
    colorCount: string
}

export const CountCard: FC<CountCardProps> = ({ icon, title, count, detail, colorCount }) => {
    return (
        <Box
            sx={{
                padding: '8px 24px 8px 24px',
                borderRadius: '6px',
                backgroundColor: 'rgba(255, 255, 255, 1)',
            }}
        >
            <Box sx={{ display: 'flex', gap: '4px' }}>
                <Box component='img' src={icon} alt='Иконка счётчика' />
                <Typography sx={{ fontWeight: '400', fontSize: '12px', whiteSpace: 'pre', }}>{title}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '4px' }}>
                <Typography sx={{ fontWeight: '500', fontSize: '36px', color: colorCount }}>{count}</Typography>
                <Box component='img' src={questionIcon} alt='Знак вопроса' />
            </Box>
        </Box>
    )
}
