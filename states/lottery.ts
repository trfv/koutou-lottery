import type { LotteryDetail, LotteryResponse } from "interfaces";
import { atom, atomFamily, selector } from "recoil";

type LotteryState = {
  version: string | undefined;
  list: LotteryDetail[];
};

export const lotteryState = atom<LotteryState>({
  key: "lotteryState",
  default: {
    version: undefined,
    list: [],
  },
});

type LotteryListItemState = {
  checked: boolean;
};

export const lotteryListItemStateFamily = atomFamily<LotteryListItemState, LotteryDetail>({
  key: "lotteryListItem",
  default: { checked: true },
});

type LotteryDetailBlockCellState = {
  highlighedRowId: string | undefined;
  highlighedColId: string | undefined;
};

export const lotteryDetailBlockCellState = atom<LotteryDetailBlockCellState>({
  key: "lotteryDetailBlockCell",
  default: {
    highlighedRowId: undefined,
    highlighedColId: undefined,
  },
});

type LotteryDetailState = {
  details: LotteryDetail[];
};

export const lotteryDetailState = selector<LotteryDetailState>({
  key: "lotteryDetail",
  get: ({ get }) => {
    const { list } = get(lotteryState);
    const details = list.filter((detail) => get(lotteryListItemStateFamily(detail)).checked);
    return { details };
  },
});

export const convertObject = (response: LotteryResponse): LotteryState => {
  const { version, data } = response;
  const list = data.reduce<LotteryDetail[]>((accum, curr) => {
    const { id, building, institution, lottery } = curr;
    const index = accum.findIndex((a) => a.id === id);
    if (index >= 0) {
      accum[index] = { ...accum[index], lotteries: accum[index].lotteries.concat(lottery) };
    } else {
      accum.push({ id, building, institution, lotteries: [lottery] });
    }
    return accum;
  }, []);

  return { version, list };
};
