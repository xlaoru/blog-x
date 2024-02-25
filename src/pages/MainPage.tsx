import { memo, useDeferredValue } from 'react';

import useWindowWidth from '../utils/useWindowWidth';

import { Link, useSearchParams } from 'react-router-dom';

import { List } from 'react-virtualized';

import { content } from '../assets/content';
import ListItem from '../components/ListItem';

interface IRowRender {
  index: number;
  key: string;
  style: React.CSSProperties;
}

export default memo(function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const filteredContent = content.filter(
    item => item.title.toLowerCase().includes(deferredSearchQuery.toLowerCase())
  );

  const actualWindowWidth = useWindowWidth()
  const windowWidth = actualWindowWidth / 1.4

  const rowRenderer = ({ index, key, style }: IRowRender) => {
    const itemsPerRow = 3;
    const row = [];
    for (let i = 0; i < itemsPerRow; i++) {
      const dataIndex = index * itemsPerRow + i;
      if (dataIndex < filteredContent.length) {
        row.push(
          <ListItem key={filteredContent[dataIndex].title} to={filteredContent[dataIndex].link} style={{ flex: 1 }}>
            {filteredContent[dataIndex].title}
          </ListItem>
        );
      }
    }
    return (
      <div key={key} style={{ ...style, display: 'flex' }}>
        {row}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={e => setSearchParams({ search: e.target.value })}
      />
      <List
        // style={{ textAlign: 'center' }}
        width={windowWidth}
        height={700}
        rowCount={Math.ceil(filteredContent.length / 3)}
        rowHeight={30}
        rowRenderer={rowRenderer}
      />
    </div>
  );
});
