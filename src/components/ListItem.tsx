import React from 'react'

import { Link } from 'react-router-dom'

type IListItemProps = {
    key: string;
    to: string;
    style: React.CSSProperties;
    children?: React.ReactNode;
}

export default function ListItem({
    key,
    to,
    style,
    children
}: IListItemProps) {
  return (
    <div
        key={key}
        style={style}
    >
        <Link
            to={to}
        >
            {children}
        </Link>
    </div>
  )
}