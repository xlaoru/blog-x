import { CSSProperties } from "react";

import { List as VirtualizedList } from "react-virtualized";

import ListItem from "../components/ListItem";
import { useWindowSequence } from "../utils/useWindowSequence";

interface IRowRender {
  index: number;
  key: string;
  style: CSSProperties;
}

function List({ content }: any) {
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
