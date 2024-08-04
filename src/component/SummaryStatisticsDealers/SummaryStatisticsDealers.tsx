import { FC } from 'react'
import { observer } from 'mobx-react'
import { ToggleBlock } from './ToggleBlock/ToggleBlock'
import { CountRequestCards } from './CountRequestsCards/CountRequestCards'
import { Box } from '@mui/material'

// import summaryStatisticsDealersStore from './store/SummaryStatisticsDealersStore'

export const SummaryStatisticsDealers: FC = observer(() => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <ToggleBlock />
            <CountRequestCards />
        </Box>
    )
})
