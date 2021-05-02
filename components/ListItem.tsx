import * as React from 'react'
import type { LotteryDetail } from 'interfaces'
import { useRecoilState } from 'recoil'
import { lotteryListItemStateFamily } from 'recoil/lottery'

type Props = {
  item: LotteryDetail;
}

const ListItem = ({ item }: Props) => {
  const {  building, institution } = item;
  const [{  checked }, setListItemState] = useRecoilState(lotteryListItemStateFamily(item));

  const handleClick = React.useCallback(() => {
    setListItemState((prevState) => ({ ...prevState, checked: !prevState.checked }));
  }, []);

  return (
    <li>
      <div style={{ fontWeight: checked ? "bold" : "normal", cursor: "pointer" }} onClick={handleClick}>
        {building} {institution}
      </div>
    </li>
  )
}

export default React.memo(ListItem);
