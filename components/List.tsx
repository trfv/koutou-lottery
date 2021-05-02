import * as React from 'react'
import { useRecoilValue } from "recoil";
import ListItem from './ListItem'
import { lotteryListState } from "recoil/lottery";

const List = () => {
  const { listItems, selected } = useRecoilValue(lotteryListState);
  return (
    <div style={{ flexShrink: 0 }}>
      <ul>
        {listItems.map((item) => <ListItem key={item.id} item={item} selected={selected === item.id} />)}
      </ul>
    </div>
  )
}

export default React.memo(List);
