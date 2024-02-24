import { Link, useSearchParams } from 'react-router-dom';
import { content } from '../assets/content';

interface IMainPageProps {
  setSearchQuery: (searchQuery: string) => void;
}

export default function MainPage({ setSearchQuery }: IMainPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={e => setSearchParams({ search: e.target.value })}
      />
      {content
        .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(item => (
          <div key={item.link}>
            <Link to={item.link}>{item.title}</Link>
          </div>
        ))}
    </>
  );
}
