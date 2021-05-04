import type { LotteryDetail } from "interfaces";
import * as React from "react";
import { useSetRecoilState } from "recoil";
import { lotteryListItemStateFamily } from "states/lottery";
import DetailLine from "./DetailBlockCell";

type Props = {
  detail: LotteryDetail;
};

const DetailBlock = ({ detail }: Props) => {
  const { building, institution, lotteries } = detail;
  const setListItem = useSetRecoilState(lotteryListItemStateFamily(detail));
  const handleTitleClick = React.useCallback(() => {
    setListItem((prevState) => ({ ...prevState, checked: !prevState.checked }));
  }, []);

  return (
    <div>
      <div className="mb-2 text-center cursor-pointer" onClick={handleTitleClick}>
        <h3 className="whitespace-pre-line">{`${building}\n${institution}`}</h3>
      </div>
      {lotteries.map((lottery, index) => (
        <div key={index} className="flex">
          <div>
            {lottery.header.map(
              (text, i) =>
                ((i === 0 && index === 0) || i > 0) && (
                  <DetailLine key={i} cell={{ rowId: `${index + 1}-${i}`, colId: "0" }}>
                    {text}
                  </DetailLine>
                )
            )}
          </div>
          {lottery.body.map((row, j) => (
            <div key={j}>
              {row.map(
                (td, k) =>
                  ((k === 0 && index === 0) || k > 0) && (
                    <DetailLine
                      key={k}
                      cell={{ rowId: `${index + 1}-${k}`, colId: (j + 1).toString() }}
                    >
                      {td.includes("img") ? "-" : td}
                    </DetailLine>
                  )
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default React.memo(DetailBlock);
