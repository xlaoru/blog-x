import { memo, useDeferredValue } from 'react';

import useWindowWidth from '../utils/useWindowWidth';

import { Link, useSearchParams } from 'react-router-dom';

import { List } from 'react-virtualized';

import { content } from '../assets/content';

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

  const rowRenderer = ({ index, key, style }: IRowRender) => (
    <div key={key} style={style}>
      <Link to={filteredContent[index].link}>{filteredContent[index].title}</Link>
    </div>
  );

  const actualWindowWidth = useWindowWidth()
  const windowWidth = actualWindowWidth / 1.4

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={e => setSearchParams({ search: e.target.value })}
      />
      <List
        width={windowWidth}
        height={1920}
        rowCount={filteredContent.length}
        rowHeight={40}
        rowRenderer={rowRenderer}
      />
    </div>
  );
});
