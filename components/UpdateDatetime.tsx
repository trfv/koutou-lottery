import * as React from 'react'
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil'
import { lotteryState } from 'recoil/lottery'

const UpdateDatetime = () => {
  const router = useRouter();
  const { version } = useRecoilValue(lotteryState);

  React.useEffect(() => {
    if (!version) {
      router.push("./");
    }
  }, [version]);

  if (!version) {
    return null;
  }

  return (
    <h3>{`更新日時：${version.toLocaleString("ja-JP")}`}</h3>
  )
}

export default React.memo(UpdateDatetime);
