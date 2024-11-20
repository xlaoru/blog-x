import { CSSProperties } from "react";

import { List as VirtualizedList } from "react-virtualized";

import ListItem from "../components/ListItem";
import { useWindowSequence } from "../utils/useWindowSequence";
import { IBlog } from "../store/BlogSlice";

interface IListProps {
  content: IBlog[];
  isProfile?: true
}

interface IRowRender {
  index: number;
  key: string;
  style: CSSProperties;
}

function List({ content, isProfile }: IListProps) {
  const windowWidth = useWindowSequence("innerWidth");
  const windowHeight = useWindowSequence("innerHeight");

  function rowRenderer({ index, key, style }: IRowRender) {
    const item = content[index];
    return (
      <div
        key={key}
        style={{
          ...style,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ListItem
          key={item._id}
          to={item.link}
          title={item.title}
          body={item.body}
          id={item._id}
          isSaved={item.isSaved}
          isProfile={isProfile}
          upVotes={item.upVotes}
          downVotes={item.downVotes}
          tags={item.tags}
        />
      </div>
    );
  }

  return (
    <VirtualizedList
      width={windowWidth - 200}
      height={windowHeight * 0.9}
      rowCount={content.length}
      rowHeight={165}
      rowRenderer={rowRenderer}
    />
  );
}

export default List
