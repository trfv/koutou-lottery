import * as React from "react";
import { useRecoilValue } from "recoil";
import { lotteryState } from "states/lottery";
import ListItem from "./ListItem";

const List = () => {
  const { version, list } = useRecoilValue(lotteryState);
  return (
    <div className="flex-shrink-0">
      {version && <h3>{`取得日時：${new Date(version).toLocaleString("ja-JP")}`}</h3>}
      <ul className="mt-4 list-none">
        {list.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default React.memo(List);
