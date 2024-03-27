import { memo, CSSProperties } from "react";

import { List as VirtualizedList } from "react-virtualized";

import useWindowWidth from "../utils/useWindowWidth";

import { IContentItem } from "../assets/content";

import ListItem from "../components/ListItem";
import { useWindowSequence } from "../utils/useWindowSequence";

interface IListProps {
  content: IContentItem[];
}

interface IRowRender {
  index: number;
  key: string;
  style: CSSProperties;
}

function List({ content }: IListProps) {
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
          key={key}
          to={item.link}
          title={item.title}
          body={item.body}
        />
      </div>
    );
  }

  return (
    <VirtualizedList
      width={windowWidth}
      height={windowHeight * 0.94}
      rowCount={content.length}
      rowHeight={145}
      rowRenderer={rowRenderer}
    />
  );
}

export default memo(List);
