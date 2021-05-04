import * as React from "react";
import { useRecoilValue } from "recoil";
import { lotteryDetailState } from "states/lottery";
import DetailBlock from "./DetailBlock";

const Detail = () => {
  const { details } = useRecoilValue(lotteryDetailState);

  if (!details.length) {
    return null;
  }

  return (
    <div className="flex gap-10 overflow-auto">
      {details.map((detail) => (
        <DetailBlock key={detail.id} detail={detail} />
      ))}
    </div>
  );
};

export default React.memo(Detail);
