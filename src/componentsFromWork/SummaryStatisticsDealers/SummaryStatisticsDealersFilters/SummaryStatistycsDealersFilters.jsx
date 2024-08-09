import React from 'react'
import { observer } from 'mobx-react'
import { Box, Button, Typography } from '@mui/material'
import searchIcon from 'src/assets/images/common/searchIcon.svg'
import downLoad from 'src/assets/images/common/downloadWhite.svg'
import downLoadGray from 'src/assets/images/common/downloadGray.svg'
import { BlockFilters } from './BlockFilters/BlockFilters'
import summaryStatisticsDealersStoreInstance from '../store/SummaryStatisticsDealersStore'

export const SummaryStatisticsDealersFilters = observer(() => {
    const [openFilters, setOpenFilters] = React.useState(false)
    const {
        activeToggleBlockItem,
        setActiveToggleBlockItem,
        setSearchForFilter,
        subpage,
        getChips,
        dealerSelect,
        month,
        year,
        intervalType,
    } = summaryStatisticsDealersStoreInstance
    const { today, period, total } = subpage

    const monthNames = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ]

    // Предположим, что month содержит значение от 1 до 12
    const monthName = month ? monthNames[month - 1] : ''

    // Теперь используйте monthName вместо month в массиве chips
    const chips = monthName && year ? [...dealerSelect, monthName, year] : dealerSelect

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

    const handleRemoveChip = (index) => {
        const dealerSelectLength = summaryStatisticsDealersStoreInstance.dealerSelect.length

        if (index < dealerSelectLength) {
            // Удаление из dealerSelect
            summaryStatisticsDealersStoreInstance.setDealerSelect(
                summaryStatisticsDealersStoreInstance.dealerSelect.filter((_, i) => i !== index)
            )
        } else if (index === dealerSelectLength) {
            // Удаление month
            summaryStatisticsDealersStoreInstance.setMonth('')
            summaryStatisticsDealersStoreInstance.setYear('')
        } else if (index === dealerSelectLength + 1) {
            // Удаление year
            summaryStatisticsDealersStoreInstance.setYear('')
            summaryStatisticsDealersStoreInstance.setMonth('')
        }
        onSearch()
    }

    return (
        <Box position='relative'>
            {openFilters && (
                <Box
                    onClick={() => setOpenFilters(false)}
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 999,
                        transition: 'opacity 0.3s ease-in-out',
                        opacity: openFilters ? 1 : 0,
                    }}
                />
            )}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '16px',
                    position: 'relative',
                    zIndex: 1000,
                }}
            >
                <Box sx={{ width: '100%', position: 'relative' }}>
                    <Box
                        onClick={() => setOpenFilters(!openFilters)}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: '40px',
                            width: '100%',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            backgroundColor: '#fff',
                            cursor: 'pointer',
                            zIndex: 1001,
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Typography
                                sx={{ fontWeight: '500', fontSize: '15px', whiteSpace: 'nowrap', lineHeight: '18px' }}
                            >
                                {openFilters
                                    ? 'Настройка поиска'
                                    : `Результаты поиска ${summaryStatisticsDealersStoreInstance.rows.length}`}
                            </Typography>

                            {chips?.slice(0, 3).map((el, index) => {
                                return (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '4px 10px',
                                            borderRadius: '6px',
                                            backgroundColor: '#EBF4FF',
                                            maxWidth: '100px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            marginRight: '8px', // Для расстояния между чипсами
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Box sx={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'hidden' }}>{el}</Box>
                                        <Box
                                            sx={{
                                                marginLeft: '8px',
                                                cursor: 'pointer',
                                                fontSize: '12px',
                                                color: '#000', // Красный цвет для крестика
                                                '&:hover': {
                                                    color: '#CC0000',
                                                },
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation() // Останавливаем распространение события
                                                handleRemoveChip(index) // Удаляем чипс
                                            }}
                                        >
                                            ✕
                                        </Box>
                                    </Box>
                                )
                            })}

                            {chips?.length > 3 && (
                                <Box
                                    sx={{
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        backgroundColor: '#EBF4FF',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    +{chips.length - 3} ещё
                                </Box>
                            )}
                        </Box>
                        <Box
                            component='img'
                            src={searchIcon}
                            alt='searchIcon'
                            sx={{
                                '&:hover::before': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                },
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    backgroundColor: 'transparent',
                                    transition: 'background-color 0.3s ease-in-out',
                                    transform: 'translate(-50%, -50%)',
                                },
                            }}
                        />
                    </Box>
                    {openFilters && (
                        <Box
                            name='filters'
                            sx={{
                                position: 'absolute',
                                top: 'calc(100% + 8px)',
                                left: 0,
                                width: '100%',
                                backgroundColor: 'rgba(246, 246, 246, 1)',
                                // height: '300px',
                                padding: '24px 48px 48px 48px ',
                                borderRadius: '6px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                                opacity: openFilters ? 1 : 0,
                                transform: openFilters ? 'translateY(0)' : 'translateY(-10px)',
                                zIndex: 1001,
                            }}
                        >
                            <BlockFilters setOpenFilters={setOpenFilters} />
                        </Box>
                    )}
                </Box>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={'downloadRequestsListPDF'}
                    disabled={true}
                    sx={{
                        borderRadius: '4px',
                        width: '100%',
                        maxWidth: '281px',
                        zIndex: openFilters ? 1000 : 1,
                        position: openFilters ? 'relative' : 'initial',
                    }}
                    startIcon={<img src={false ? downLoad : downLoadGray} alt='Download Icon' />}
                >
                    <Box pl={1.5}>
                        <Typography variant='h6' sx={{ textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                            {'Сохранить в файл'}
                        </Typography>
                    </Box>
                </Button>
            </Box>
        </Box>
    )
})
