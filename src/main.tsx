
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
    typography: {
        fontFamily: 'PT Root UI,  ',
        
    },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
)
