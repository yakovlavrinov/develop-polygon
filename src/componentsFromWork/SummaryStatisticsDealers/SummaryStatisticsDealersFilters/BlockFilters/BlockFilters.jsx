import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import lupe from 'src/assets/images/common/lupeWhite.svg'
import selectArrow from 'src/assets/images/common/selectArrow.svg'

import summaryStatisticsDealersStoreInstance from '../../store/SummaryStatisticsDealersStore'
import moment from 'moment'
import { Subject } from '@mui/icons-material'

export const BlockFilters = observer(({ setOpenFilters }) => {
    const {
        activeToggleBlockItem,
        setActiveToggleBlockItem,
        subpage,
        dealerSelect,
        setDealerSelect,
        intervalType,
        setIntervalType,
        month,
        setMonth,
        year,
        setYear,
        dealersStore,
        dealers,
        setSearchForFilter,
        clear,
    } = summaryStatisticsDealersStoreInstance
    const { today, period, total } = subpage

    // const dealers = [{displayName: 'Все дилеры', subjectId: ''},...dealersStore.collection]

    useEffect(() => {
        initStateIntervalType()
    }, [])

    // const dealers = [{ dealer: 'Иванов' }, { dealer: 'Петров' }, { dealer: 'Сидоров' }]

    const intervals = [
        { interval: 'Сегодня' },
        { interval: 'За отчётный период' },
        { interval: 'Суммарно за все время' },
    ]
    const months = [
        { month: 'Январь' },
        { month: 'Февраль' },
        { month: 'Март' },
        { month: 'Апрель' },
        { month: 'Май' },
        { month: 'Июнь' },
        { month: 'Июль' },
        { month: 'Август' },
        { month: 'Сентябрь' },
        { month: 'Октябрь' },
        { month: 'Ноябрь' },
        { month: 'Декабрь' },
    ]
    const years = [ { year: '2023' }, { year: '2024' }]

    const initStateIntervalType = () => {
        switch (activeToggleBlockItem) {
            case today:
                setIntervalType('Сегодня')
                break
            case period:
                setIntervalType('За отчётный период')
                break
            case total:
                setIntervalType('Суммарно за все время')
                break
            default:
                return
        }
    }

    const togglePage = () => {
        switch (intervalType) {
            case 'Сегодня':
                if (activeToggleBlockItem === today) return
                setActiveToggleBlockItem(today)
                break
            case 'За отчётный период':
                if (activeToggleBlockItem === period) return
                setActiveToggleBlockItem(period)
                break
            case 'Суммарно за все время':
                if (activeToggleBlockItem === total) return
                setActiveToggleBlockItem(total)
                break
            default:
                return
        }
    }
    const onSearch = () => {
        setSearchForFilter(true)
        setOpenFilters(false)

        togglePage()
    }

    const onClear = () => {
        clear()
        onSearch()
        setOpenFilters(false)
    }

    function getWeeksOfMonth(year, month) {
        let startOfMonth = moment(`${year}-${month}-01`)
        let endOfMonth = startOfMonth.clone().endOf('month')
        let weeks = []

        while (startOfMonth.isBefore(endOfMonth)) {
            let endOfWeek = startOfMonth.clone().endOf('week').add(1, 'days')
            if (endOfWeek.isAfter(endOfMonth)) {
                endOfWeek = endOfMonth.clone().add(1, 'days')
            }

            // weeks.push({
            //     start: startOfMonth.format('DD.MM.YYYY[T]HH:mm'),
            //     end: endOfWeek.format('DD.MM.YYYY[T]HH:mm'),
            // })

            weeks.push({
                start: startOfMonth.toISOString(),
                end: endOfWeek.toISOString(),
            })

            startOfMonth = endOfWeek.clone()
        }

        return weeks
    }

    const notPeriod = intervalType !== 'За отчётный период'

    const setSelectArrow = (e) => <img className={e.className} alt={''} src={selectArrow} />

   
    return (
        <Box sx={{ display: 'flex', gap: '16px' }}>
            <Box sx={{ width: '100%' }}>
                <FormControl fullWidth>
                    <InputLabel>{'Дилеры'}</InputLabel>
                    <Select
                        name={'Дилеры'}
                        value={dealerSelect}
                        label={'Дилеры'}
                        fullWidth
                        multiple
                        IconComponent={setSelectArrow}
                        onChange={(event) => {
                            const { value } = event.target
                            setDealerSelect(value)
                        }}
                        renderValue={(selected) => {
                            // if (selected.length === 0) {
                            //     return <em>Выберите дилеров</em>;
                            // }
                            if (selected.length > 2) {
                                return `${selected.length} дилеров выбрано`
                            }
                            return selected.join(', ')
                        }}
                        SelectDisplayProps={{
                            onKeyDown: (event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault()
                                    event.stopPropagation()
                                    onSearch(filter) // Убедитесь, что функция onSearch определена
                                }
                            },
                        }}
                    >
                        {dealers.map((el) => (
                            <MenuItem key={el.displayName} value={el.displayName}>
                                {el.displayName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box sx={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                    <FormControl fullWidth key={1}>
                        <InputLabel>{'Тип интервала'}</InputLabel>
                        <Select
                            name={'Тип интервала'}
                            value={intervalType}
                            label={'Тип интервала'}
                            fullWidth
                            IconComponent={setSelectArrow}
                            onChange={(event) => setIntervalType(event.target.value)}
                            // {...props}
                            // inputProps={{ ...inputProps }}
                            // multiple={multiple}
                            SelectDisplayProps={{
                                onKeyDown: (event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault()
                                        event.stopPropagation()
                                        onSearch(filter)
                                    }
                                },
                            }}
                        >
                            {intervals.map((el) => (
                                <MenuItem key={el.interval} value={el.interval}>
                                    {el.interval}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>{'Месяц'}</InputLabel>
                        <Select
                            name={'Месяц'}
                            value={month.month}
                            label={'Месяц'}
                            fullWidth
                            disabled={notPeriod}
                            IconComponent={notPeriod ? null : setSelectArrow}
                            onChange={(event) => setMonth(event.target.value)}
                            // {...props}
                            // inputProps={{ ...inputProps }}
                            // multiple={multiple}
                            SelectDisplayProps={{
                                onKeyDown: (event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault()
                                        event.stopPropagation()
                                        onSearch(filter)
                                    }
                                },
                            }}
                        >
                            {months.map((el, index) => (
                                <MenuItem key={el.month} value={index + 1}>
                                    {el.month}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth key={1}>
                        <InputLabel>{'Год'}</InputLabel>
                        <Select
                            name={'Год'}
                            value={year.year}
                            label={'Год'}
                            fullWidth
                            disabled={notPeriod}
                            IconComponent={notPeriod ? null : setSelectArrow}
                            onChange={(event) => setYear(event.target.value)}
                            // {...props}
                            // inputProps={{ ...inputProps }}
                            // multiple={multiple}
                            SelectDisplayProps={{
                                onKeyDown: (event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault()
                                        event.stopPropagation()
                                        onSearch(filter)
                                    }
                                },
                            }}
                        >
                            {years.map((el) => (
                                <MenuItem key={el.year} value={el.year}>
                                    {el.year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '323px' }}>
                <Button
                    variant={'contained'}
                    color={'primary'}
                    type='submit'
                    disabled={
                        (intervalType === 'За отчётный период' && month && !year) ||
                        (intervalType === 'За отчётный период' && !month && year)
                    }
                    fullWidth={true}
                    onClick={onSearch}
                    sx={{ width: '100%', maxWidth: '323px' }}
                >
                    <img alt={'Поиск'} src={lupe} />
                    <FormattedMessage id={'Hайти'} />
                </Button>
                <Button
                    variant={'outlined'}
                    color={'primary'}
                    onClick={onClear}
                    sx={{ width: '100%', maxWidth: '323px' }}
                    fullWidth={true}
                >
                    <FormattedMessage id={'Сбросить'} />
                </Button>
            </Box>
        </Box>
    )
})
