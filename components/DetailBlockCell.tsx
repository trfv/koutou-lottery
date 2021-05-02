import * as React from 'react'
import type { LotteryDetailBlockCell } from 'interfaces'
import { useRecoilState } from 'recoil'
import { lotteryDetailBlockCellState } from 'recoil/lottery'

type Props = {
  cell: LotteryDetailBlockCell;
  children: React.ReactNode;
}

const DetailBlockCell = ({ cell, children }: Props) => {
  const { rowId, colId } = cell;
  const [{ highlighedRowId, highlighedColId }, setDetailBlockCellState] = useRecoilState(lotteryDetailBlockCellState);

  const highlighted = (rowId !== highlighedRowId && colId === highlighedColId) || (rowId === highlighedRowId && colId !== highlighedColId);

  const handleClick = React.useCallback(() => {
    setDetailBlockCellState({ highlighedRowId: rowId, highlighedColId: colId });
  }, []);

  return (
    <div style={{
      width: "80px",
      textAlign: "center",
      backgroundColor: highlighted ? "lightgray" : "transparent",
      cursor: "pointer"
    }} onClick={handleClick}>
      {children}
    </div>
  )
}

export default React.memo(DetailBlockCell);
