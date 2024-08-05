import { Box, Typography } from '@mui/material'
import { observer } from 'mobx-react'
import React from 'react'
import arrowIcon from '../../../../assets/images/pageSwitch/chevron-right.svg'
import arrowInvertIcon from '../../../../assets/images/pageSwitch/chevron.svg'

export const PageSwitch = observer(() => {
    return (
        <Box sx={{ display: 'flex', gap: '4px' }}>
            <Box
                sx={{ cursor: 'pointer', '&:hover': { transform: 'scale(1.3)' }, transition: 'all 0.3s' }}
                component='img'
                src={arrowIcon}
                alt='Влево'
            />
            <Typography>1</Typography>
            <Typography>из</Typography>
            <Typography>1</Typography>
            <Box
                sx={{
                    cursor: 'pointer',
                    '&:hover': { transform: 'scale(1.2)' },
                    transition: 'all 0.3s',
                }}
                component='img'
                src={arrowInvertIcon}
                alt='Вправо'
            />
        </Box>
    )
})
