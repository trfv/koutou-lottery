import * as React from 'react'
import { useRecoilValue } from 'recoil'
import { lotteryDetailState } from 'recoil/lottery';
import DetailBlock from './DetailBlock';

const Detail = () => {
  const { details } = useRecoilValue(lotteryDetailState);

  if (!details.length) {
    return null;
  }

  return (
    <div style={{ display: "flex", gap: "40px", overflow: "auto" }}>
      {details.map((detail) => <DetailBlock key={detail.id} detail={detail} /> )}
    </div>
  )
}

export default React.memo(Detail);

