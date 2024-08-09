import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { ToggleButton } from './ToggleButton/ToggleButton'
import summaryStatisticsDealersStoreInstance from '../store/SummaryStatisticsDealersStore'
import { Search } from '@mui/icons-material'

export const ToggleBlock = observer(() => {
    const {
        activeToggleBlockItem,
        getRows,
        subpage,
        getWeeksOfMonth,
        getWeeksOfMonthVue,
        getDealers,
        dealersStore,
        dealerSelect,
        month,
        year,
        weeks,
        dealers,
        searchForFilter,
        setSearchForFilter,
    } = summaryStatisticsDealersStoreInstance
    const { today, period, total } = subpage

    useEffect(() => {
        getRowsForSubPage()
    }, [activeToggleBlockItem])

    useEffect(() => {
        if (searchForFilter) {
            getRowsForSubPage()
        }
    }, [dealerSelect, month, year, searchForFilter])

    useEffect(() => {
        getDealers()
    }, [dealersStore.collection])
    const getDate = new Date()

    const currentMonth = getDate.getMonth() + 1
    const currentYear = getDate.getFullYear()
    const getDateToday = (daysToAdd = 1) => {
        const now = new Date()
        now.setHours(0, 0, 0, 0)

        const futureDate = new Date(now)
        futureDate.setDate(now.getDate() + daysToAdd)

        const startDate = now.toISOString()
        const endDate = futureDate.toISOString()

        return {
            start: startDate,
            end: endDate,
        }
    }

    const getRowsForSubPage = () => {
        setSearchForFilter(false)
        switch (activeToggleBlockItem) {
            case today:
                if (dealerSelect.length) {
                    const date = getDateToday()
                    

                    const dealerIds = dealers
                        .filter((el) => dealerSelect.includes(el.displayName))
                        .map((el) => el.subjectId)
                    
                    getRows({
                        param: { DealerIds: dealerIds,  },
                       
                    })
                } else {
                    const date = getDateToday()
                    getRows({
                        param: { DealerIds: [dealerSelect], AssignedFrom: date.start, AssignedTo: date.end },
                        vue: { AssignedFrom: date.start, AssignedTo: date.end },
                    })
                }

                break

            case period:
                if (dealerSelect.length || month || year) {

                    
                    
                    const vue = month || year? getWeeksOfMonthVue(+year, month):getWeeksOfMonthVue(currentYear, currentMonth)
                    const week = month || year? getWeeksOfMonth(+year, month) : getWeeksOfMonth(currentYear, currentMonth)

                    const dealerIds = dealers
                        .filter((el) => dealerSelect.includes(el.displayName))
                        .map((el) => el.subjectId)

                    getRows({
                        param: { DealerIds: dealerIds, AssignedFrom: week[0].start, AssignedTo: week[0].end },
                        vue: { AssignedFrom: vue[0].start, AssignedTo: vue[0].end },
                    })
                } else {
                    const vue = getWeeksOfMonthVue(currentYear, currentMonth)
                    const week = getWeeksOfMonth(currentYear, currentMonth)

                    getRows({
                        param: { AssignedFrom: week[0].start, AssignedTo: week[0].end },
                        vue: { AssignedFrom: vue[0].start, AssignedTo: vue[0].end },
                    })
                }

                break

            default:
                if (dealerSelect.length) {
                    const dealerIds = dealers
                    .filter((el) => dealerSelect.includes(el.displayName))
                    .map((el) => el.subjectId)
                    getRows({param:{ DealerIds: dealerIds }})
                } else {
                    getRows({})
                }
                break
        }
    }

    const buttons = [
        { key: today, label: 'НА СЕГОДНЯ' },
        { key: period, label: 'ЗА ОТЧЕТНЫЙ ПЕРИОД' },
        { key: total, label: 'СУММАРНО ЗА ВСЁ ВРЕМЯ' },
    ]

    return (
        <Box>
            <Box sx={{ display: 'flex', gap: '4px' }}>
                {buttons.map(({ key, label }) => (
                    <ToggleButton key={key} active={key} label={label} />
                ))}
            </Box>
        </Box>
    )
})
