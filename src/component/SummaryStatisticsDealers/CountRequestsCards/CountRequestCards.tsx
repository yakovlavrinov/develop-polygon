import { Box } from '@mui/material'
import { CountCard } from './CountCard/CountCard'

import assignedIcon from '../../../assets/images/countRequestCards/assignedIcon.svg'
import duplicateIcon from '../../../assets/images/countRequestCards/duplicateIcon.svg'
import forRevisionIcon from '../../../assets/images/countRequestCards/forRevisionIcon.svg'
import impossibleIcon from '../../../assets/images/countRequestCards/impossibleIcon.svg'
import installedIcon from '../../../assets/images/countRequestCards/installedIcon.svg'
import timeIcon from '../../../assets/images/countRequestCards/timeIcon.svg'

export const CountRequestCards = () => {
    const cards = [
        { title: 'Назначены дилерам', count: '12380', colorCount: 'rgba(112, 145, 183, 1)', icon: assignedIcon, detail: 'Lorem ipsum dolor sit.' },
        { title: 'Просроченные', count: '167637', colorCount: 'gba(224, 23, 23, 1)',  icon: assignedIcon, detail: 'Lorem ipsum dolor sit.' },
        { title: 'Выполненные установки', count: '302011', colorCount: 'rgba(65, 185, 77, 1)', icon: installedIcon, detail: 'Lorem ipsum dolor sit.' },
        { title: 'Установки с просрочкой', count: '0', colorCount: 'rgba(224, 23, 23, 0.6)', icon: installedIcon, detail: 'Lorem ipsum dolor sit.' },
        { title: 'На доработку', count: '321111', colorCount: 'rgba(255, 155, 41, 1)', icon: forRevisionIcon, detail: 'Lorem ipsum dolor sit.' },
        { title: 'В Невозможно', count: '142231', colorCount: 'rgba(165, 165, 165, 1)', icon: impossibleIcon, detail: 'Lorem ipsum dolor sit.' },
        { title: 'В Дубликаты', count: '7828', colorCount: 'rgba(165, 165, 165, 1)', icon: duplicateIcon, detail: 'Lorem ipsum dolor sit.' },
        { title: 'Среднее время (дней)', count: '29,2', colorCount: 'rgba(76, 181, 117, 1)', icon: timeIcon, detail: 'Lorem ipsum dolor sit.' },
    ]
    return (
        <Box
            sx={{
                display: 'flex',
                gap: '4px',
               
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                padding: '16px',
                // backgroundColor: 'rgba(246, 246, 246, 1)',
            }}
        >
            {cards.map((card) => {
                const { title, count, colorCount, icon, detail } = card
                return <CountCard title={title} count={count} colorCount={colorCount} icon={icon} detail={detail} />
            })}
        </Box>
    )
}
