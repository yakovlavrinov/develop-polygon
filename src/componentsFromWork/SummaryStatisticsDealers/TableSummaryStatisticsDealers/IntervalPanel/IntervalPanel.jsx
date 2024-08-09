import { Box, Typography } from '@mui/material'
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import summaryStatisticsDealersStoreInstance from '../../store/SummaryStatisticsDealersStore'
import { PageSwitch } from '../PageSwitch/PageSwitch'
import moment from 'moment'

export const IntervalPanel = observer(() => {
    const { activeToggleBlockItem, subpage, currentWeek } = summaryStatisticsDealersStoreInstance
    const [periodDate, setPeriodDate] = React.useState('')
    useEffect(() => {
        if (currentWeek?.AssignedFrom) {
            formatDateRange(currentWeek)
        }
    }, [currentWeek])
    const formatDate = (date) => {
        const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
        const dayOfWeek = daysOfWeek[date.getDay()]
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()

        return `${dayOfWeek} ${day}.${month}.${year}`
    }

    const today = new Date()
    const formattedDate = formatDate(today)

    const getRowDate = () => {
        switch (activeToggleBlockItem) {
            case subpage.today:
                return `${formattedDate} (сегодня)`
            case subpage.period:
                return false
            case subpage.total:
                return `Пн 30.01.2022 - ${formattedDate} (сегодня)`
        }
    }

    const formatDateRange = (dateRange) => {
        const startDate = moment(dateRange.AssignedFrom).utcOffset('+00:00')
        const endDate = moment(dateRange.AssignedTo).utcOffset('+00:00')

        startDate.locale('ru')
        endDate.locale('ru')

        const capitalizeFirstLetter = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1)
        }

        const startDateStr = capitalizeFirstLetter(startDate.format('ddd DD.MM.YYYY'))
        const endDateStr = capitalizeFirstLetter(endDate.format('ddd DD.MM.YYYY'))

        setPeriodDate(`${startDateStr} - ${endDateStr}`)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '0 0 25px 0',
                padding: '10px 20px 10px 20px',
                borderBottom: '1px solid rgba(165, 165, 165, 1)',
            }}
        >
            <Typography sx={{ fontWeight: '500', fontSize: '16px', lineHeight: '24px', color: 'rgba(46, 46, 46, 1)' }}>
                По выбранным дилерам
            </Typography>
            <Typography
                sx={{
                    fontWeight: '600',
                    fontSize: '16px',
                    lineHeight: '19.36px',
                    color: 'rgba(39, 39, 39, 1)',
                }}
            >
                {getRowDate() || periodDate}
            </Typography>
            {activeToggleBlockItem === subpage.period ? <PageSwitch /> : <Box sx={{ width: '150px' }} />}
        </Box>
    )
})
