import React, { FC, ReactNode } from 'react'
import { Checkbox, TableCell } from '@mui/material'
import { observer } from 'mobx-react'

export const BodyTableCell = observer(({ column, children }) => {
    const { propName, label } = column
    return propName === 'checkbox' ? (
        <TableCell sx={{ padding: '0' }}>
            <Checkbox disabled={true} />
        </TableCell>
    ) : (
        <TableCell
            sx={{
                fontWeight: '500',
                fontSize: '16px',
                lineHeight: '19,2px',
                color: 'rgba(0, 0, 0, 1)',
                textAlign: label === 'Исполнитель' ? 'left' : 'center',
            }}
        >
            {children}
        </TableCell>
    )
})
