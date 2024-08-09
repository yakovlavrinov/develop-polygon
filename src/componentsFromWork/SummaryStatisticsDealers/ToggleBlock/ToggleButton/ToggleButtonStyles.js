export const toggleButtonBoxStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '4px',
    height: '40px',
    padding: '8px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    '&:hover': {
        background: 'rgba(0, 0, 0, 0.10)',
    },
}

export const toggleButtonTextStyles = {
    fontWeight: '700',
    fontSize: '15px',
    lineHeight: '18px',
    color: 'rgba(95, 95, 95, 1)',
    whiteSpace: 'pre',
    transition: 'color 0.3s ease',
}
