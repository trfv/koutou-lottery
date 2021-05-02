import * as React from 'react'
import { useRecoilValue } from 'recoil'
import { lotteryState } from 'recoil/lottery';

const Detail = () => {
  const { detail } = useRecoilValue(lotteryState);

  if (!detail) {
    return null;
  }

  return (
    <div>
      {detail.lotteries.map((lottery, index) => (
        <div key={index}>
          <hr />
          <div style={{ display: "flex" }}>
            {lottery.header.map((th, i) => 
              <div key={i} style={{ width: "100px", textAlign: "center" }}>{th}</div>
            )}
          </div>
          <hr />
          {lottery.body.map((row, i) => 
            <div key={i} style={{ display: "flex" }}>
              {row.map((td, j) => 
                <div key={j} style={{ width: "100px", textAlign: "center" }}>
                  {td.includes("img") ? "-" : td}
                </div>
              )}
            </div>)}
        </div>
      ))}
    </div>
  )
}

export default React.memo(Detail);
