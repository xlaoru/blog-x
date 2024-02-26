import { memo } from 'react';
import { Link } from 'react-router-dom'

interface IListItemProps {
    to: string;
    children: React.ReactNode;
}

export default memo(function ListItem({
    to,
    children
}: IListItemProps) {
    return (
        <div
            style={{
                border: '1px solid black',
                padding: '10px',
                maxWidth: "300px",
                textAlign: 'center',
            }}
        >
            <Link
                to={to}
            >
                {children}
            </Link>
        </div>
    )
})