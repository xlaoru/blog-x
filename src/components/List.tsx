import { memo, CSSProperties } from 'react'

import { List as VirtualizedList } from 'react-virtualized';

import useWindowWidth from '../utils/useWindowWidth';

import { IContentItem } from '../assets/content';

import ListItem from '../components/ListItem';

interface IListProps {
    content: IContentItem[]
}

interface IRowRender {
    index: number;
    key: string;
    style: CSSProperties;
}

function List({ content }: IListProps) {
    const windowWidth = useWindowWidth();

    function rowRenderer({ index, key, style }: IRowRender) {
        const item = content[index];
        return (
            <div
                key={key}
                style={style}
            >
                <ListItem 
                    key={key}
                    to={item.link}
                >
                    {item.title}
                </ListItem>
            </div>
        )
    } 
 
    return (
        <VirtualizedList 
            width={windowWidth / 1.5}
            height={685}
            rowCount={content.length}
            rowHeight={150}
            rowRenderer={rowRenderer}
        />
    )
}

export default memo(List)
