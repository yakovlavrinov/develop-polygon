import { Box, Typography } from '@mui/material'
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import arrowIcon from 'src/assets/images/pageSwitch/chevron-right.svg'
import arrowInvertIcon from 'src/assets/images/pageSwitch/chevron.svg'

import summaryStatisticsDealersStoreInstance from '../../store/SummaryStatisticsDealersStore'

export const PageSwitch = observer(() => {
    const { weeksVue, weeks, getRows,dealers, dealerSelect } = summaryStatisticsDealersStoreInstance
    const [countWeek, setCountWeek] = React.useState(1)
    useEffect(() => {
        setCountWeek(1)
    },[weeks])

    useEffect(() => {
        if (weeks.length > 0) {
            const dealerIds = dealers
            .filter((el) => dealerSelect.includes(el.displayName))
            .map((el) => el.subjectId)
            getRows({
                param: { DealerIds: dealerIds, AssignedFrom: weeks[countWeek - 1].start, AssignedTo: weeks[countWeek - 1].end },
                vue: { AssignedFrom: weeksVue[countWeek - 1].start, AssignedTo: weeksVue[countWeek - 1].end },
            })
        }
    }, [countWeek])

    const weekNext = () => {
        if (countWeek < weeks.length) {
            setCountWeek(countWeek + 1)
        }
    }

    const weekPrev = () => {
        if (countWeek > 1) {
            setCountWeek(countWeek - 1)
        }
    }
    return (
        <Box sx={{ display: 'flex', marginLeft: '50px', alignItems: 'center', gap: '4px' }}>
            {countWeek !== 1 && (
                <Box
                    sx={{ cursor: 'pointer', '&:hover': { transform: 'scale(1.3)' }, transition: 'all 0.3s' }}
                    component='img'
                    src={arrowIcon}
                    onClick={weekPrev}
                    alt='Влево'
                />
            )}
            <Typography sx={{ textAlign: 'center' }}>{countWeek}</Typography>
            <Typography sx={{ textAlign: 'center' }}>из</Typography>
            <Typography sx={{ textAlign: 'center' }}>{weeks.length}</Typography>
            {countWeek !== weeks.length && (
                <Box
                    sx={{
                        cursor: 'pointer',
                        '&:hover': { transform: 'scale(1.2)' },
                        transition: 'all 0.3s',
                    }}
                    component='img'
                    src={arrowInvertIcon}
                    onClick={weekNext}
                    alt='Вправо'
                />
            )}
        </Box>
    )
})
