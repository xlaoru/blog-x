import { useDeferredValue } from 'react';

import { useSearchParams } from 'react-router-dom';

import List from '../components/List';

import { content } from '../assets/content';

export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const deferredSearchQuery = useDeferredValue(searchQuery);

  const filteredContent = content.filter(
    item => item.title.toLowerCase().includes(deferredSearchQuery.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={e => setSearchParams({ search: e.target.value })}
      />
      <List
        content={filteredContent}
      />
    </div>
  );
};