import type { LotteryDetailBlockCell } from "interfaces";
import * as React from "react";
import { useRecoilState } from "recoil";
import { lotteryDetailBlockCellState } from "states/lottery";

type Props = {
  cell: LotteryDetailBlockCell;
  children: React.ReactNode;
};

const DetailBlockCell = ({ cell, children }: Props) => {
  const { rowId, colId } = cell;
  const [{ highlighedRowId, highlighedColId }, setDetailBlockCellState] = useRecoilState(
    lotteryDetailBlockCellState
  );

  const highlighted =
    (rowId !== highlighedRowId && colId === highlighedColId) ||
    (rowId === highlighedRowId && colId !== highlighedColId);

  const handleClick = React.useCallback(() => {
    setDetailBlockCellState({ highlighedRowId: rowId, highlighedColId: colId });
  }, []);

  return (
    <div
      className={`w-16 text-center border-2 border-transparent hover:border-gray-300 ${
        highlighted ? "bg-gray-300" : "bg-transparent"
      } cursor-pointer`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default React.memo(DetailBlockCell);
