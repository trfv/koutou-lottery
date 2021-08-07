import type { LotteryDetail } from "interfaces";
import * as React from "react";
import { useRecoilState } from "recoil";
import { lotteryListItemStateFamily } from "states/lottery";

type Props = {
  item: LotteryDetail;
};

const ListItem = ({ item }: Props) => {
  const { building, institution } = item;
  const [{ checked }, setListItemState] = useRecoilState(lotteryListItemStateFamily(item));

  const handleClick = React.useCallback(() => {
    setListItemState((prevState) => ({ ...prevState, checked: !prevState.checked }));
  }, []);

  return (
    <li
      className={`px-2 py-1 shadow hover:bg-gray-300 ${
        checked ? "bg-gray-300 font-bold" : "bg-transparent font-normal"
      } cursor-pointer`}
      onClick={handleClick}
    >
      {building} {institution}
    </li>
  );
};

export default React.memo(ListItem);
