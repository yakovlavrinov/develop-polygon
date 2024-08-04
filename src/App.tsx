import { Box } from '@mui/material'
import './App.css'
import { SummaryStatisticsDealers } from './component/SummaryStatisticsDealers/SummaryStatisticsDealers'

const App = () => {
    const headerStyle = {
        height: '48px',
        background: 'linear-gradient(180deg, #023A66 -29.17%, #0871C3 377.08%)',
    }

    const containerStyle = {
        padding: '32px 72px',
        backgroundColor: '#EAEAEA',
        minHeight:' calc(100vh - 48px - 32px)'
    }

    return (
        <>
            <Box sx={headerStyle}></Box>
            <Box sx={containerStyle}>
                <SummaryStatisticsDealers />
            </Box>
        </>
    )
}

export default App
