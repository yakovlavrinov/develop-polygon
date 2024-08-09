import React, { useRef, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Box } from '@mui/material'
import { CountCard } from './CountCard/CountCard'

import assignedIcon from 'src/assets/images/countRequestCards/assignedIcon.svg'
import duplicateIcon from 'src/assets/images/countRequestCards/duplicateIcon.svg'
import forRevisionIcon from 'src/assets/images/countRequestCards/forRevisionIcon.svg'
import impossibleIcon from 'src/assets/images/countRequestCards/impossibleIcon.svg'
import installedIcon from 'src/assets/images/countRequestCards/installedIcon.svg'
import timeIcon from 'src/assets/images/countRequestCards/timeIcon.svg'

import summaryStatisticsDealersStoreInstance from '../store/SummaryStatisticsDealersStore'

export const CountRequestCards = observer(() => {
    const { data, monthly, activeToggleBlockItem, subpage } = summaryStatisticsDealersStoreInstance
    const { today, period, total } = subpage
    const containerRef = useRef(null)

    const cards = [
        {
            title: 'Назначены дилерам',
            propName: 'assigns',
            colorCount: 'rgba(112, 145, 183, 1)',
            icon: assignedIcon,
            detail: 'Lorem ipsum dolor sit.',
        },
        {
            title: 'Просроченные',
            propName: 'expiredAssigns',
            colorCount: 'rgba(224, 23, 23, 1)',
            icon: assignedIcon,
            detail: 'Lorem ipsum dolor sit.',
        },
        {
            title: 'Выполненные установки',
            propName: 'installs',
            colorCount: 'rgba(65, 185, 77, 1)',
            icon: installedIcon,
            detail: 'Lorem ipsum dolor sit.',
        },
        {
            title: 'Установки с просрочкой',
            propName: 'expiredInstalls',
            colorCount: 'rgba(224, 23, 23, 0.6)',
            icon: installedIcon,
            detail: 'Lorem ipsum dolor sit.',
        },
        {
            title: 'На доработку',
            propName: 'improvement',
            colorCount: 'rgba(255, 155, 41, 1)',
            icon: forRevisionIcon,
            detail: 'Lorem ipsum dolor sit.',
        },
        {
            title: 'В Невозможно',
            propName: 'impossible',
            colorCount: 'rgba(165, 165, 165, 1)',
            icon: impossibleIcon,
            detail: 'Lorem ipsum dolor sit.',
        },
        {
            title: 'В Дубликаты',
            propName: 'duplicates',
            colorCount: 'rgba(165, 165, 165, 1)',
            icon: duplicateIcon,
            detail: 'Lorem ipsum dolor sit.',
        },
        {
            title: 'Среднее время (часы)',
            propName: 'averageProcessingTimeHours',
            colorCount: 'rgba(76, 181, 117, 1)',
            icon: timeIcon,
            detail: 'Lorem ipsum dolor sit.',
        },
    ]

    useEffect(() => {
        const container = containerRef.current
        if (container) {
            const handleWheel = (event) => {
                if (event.deltaY !== 0) {
                    event.preventDefault()
                    container.scrollLeft += event.deltaY
                }
            }
            container.addEventListener('wheel', handleWheel)
            return () => {
                container.removeEventListener('wheel', handleWheel)
            }
        }
    }, [])

    return (
        <Box
            ref={containerRef}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '4px',
                borderRadius: '8px',
                boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.15)',
                padding: '16px',
                overflowX: 'auto',
                overflowY: 'hidden',
                whiteSpace: 'nowrap',
            }}
        >
            {cards.map((card) => {
                const { title, propName, colorCount, icon, detail } = card

                return (
                    <CountCard
                        key={title}
                        title={title}
                        count={
                            monthly && activeToggleBlockItem === period 
                                ? propName === 'averageProcessingTimeHours'
                                    ? monthly[propName]
                                        ? (Math.round(monthly[propName] * 10) / 10).toFixed(1)
                                        : null
                                    : monthly[propName]
                                : propName === 'averageProcessingTimeHours'
                                ? data[propName]
                                    ? (Math.round(data[propName] * 10) / 10).toFixed(1)
                                    : null
                                : data[propName]
                        }
                        colorCount={colorCount}
                        icon={icon}
                        detail={detail}
                    />
                )
            })}
        </Box>
    )
})
