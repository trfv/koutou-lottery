import * as React from 'react'
import type { LotteryListItem } from 'interfaces'
import { useSetRecoilState } from 'recoil'
import { lotteryState } from 'recoil/lottery'

type Props = {
  item: LotteryListItem;
  selected: boolean;
}

const ListItem = ({ selected, item }: Props) => {
  const setLottery = useSetRecoilState(lotteryState);
  const handleClick = React.useCallback(() => {
    setLottery((prevState) => ({ ...prevState, detail: prevState.list.find((d) => d.id === item.id) }));
  }, []);

  return (
    <li>
      <div style={{ fontWeight: selected ? "bold" : "normal", cursor: "pointer" }} onClick={handleClick}>
        {item.building} {item.institution}
      </div>
    </li>
  )
}

export default React.memo(ListItem);
