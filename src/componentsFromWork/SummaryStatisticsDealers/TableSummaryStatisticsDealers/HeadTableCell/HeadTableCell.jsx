import React, { FC, ReactNode } from 'react'
import { observer } from 'mobx-react'
import { Checkbox, TableCell } from '@mui/material'



export const HeadTableCell = observer(({ children }) => {
    return children === 'checkbox' ? (
        <TableCell sx={{  padding: '0' }}>
            <Checkbox disabled={true} />
        </TableCell>
    ) : (
        <TableCell
            sx={{
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '16.8px',
                color: 'rgba(95, 95, 95, 1)',
                textAlign: children === 'Исполнитель' ? 'left' : 'center',
            //    height: '30px',
                padding: '0',
                paddingLeft: children === 'Исполнитель' ? '16px': '0',
                position: 'relative',
                '&:not(:last-child)::after': {
                    content: '""',
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    height: '50%',
                    borderRight: '1px solid rgba(224, 224, 224, 1)',
                    transform: 'translateY(-50%)',
                },
            }}
        >
            {children}
        </TableCell>
    )
})
