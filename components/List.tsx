import * as React from 'react'
import { useRecoilValue } from "recoil";
import ListItem from './ListItem'
import { lotteryState } from "recoil/lottery";

const List = () => {
  const { version, list } = useRecoilValue(lotteryState);
  return (
    <div style={{ flexShrink: 0 }}>
      {version && <h3>{`更新日時：${new Date(version).toLocaleString("ja-JP")}`}</h3>}
      <ul>
        {list.map((item) => <ListItem key={item.id} item={item} />)}
      </ul>
    </div>
  )
}

export default React.memo(List);
