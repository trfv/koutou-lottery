import { atom, selector } from 'recoil'
import type { LotteryListItem, LotteryDetail, LotteryResponse } from 'interfaces'

export type LotteryState = {
  version: Date | undefined;
  list: LotteryDetail[];
  detail: LotteryDetail | undefined;
};

const initialState: LotteryState = {
  version: undefined,
  list: [],
  detail: undefined,
};

export const lotteryState = atom({
  key: 'lotteryState',
  default: initialState
});

export type LotteryListState = {
  listItems: LotteryListItem[];
  selected: string | undefined;
}

export const lotteryListState = selector<LotteryListState>({
  key: 'lotteryListState',
  get: ({ get }) => {
    const { list, detail } = get(lotteryState);
    return {
      listItems: list.map(({ id, building, institution }) => ({ id, building, institution })),
      selected: detail?.id,
    };
  },
})

export const convertObjectToState = (
  response: LotteryResponse
): LotteryState => {
  const { version, data } = response;

  const list = data.reduce<LotteryDetail[]>((accum, curr) => {
    const { id, building, institution, lottery } = curr;
    const index = accum.findIndex((a) => a.id === id)
    if (index >= 0) {
      accum[index] = { ...accum[index], lotteries: accum[index].lotteries.concat(lottery) };
    } else {
      accum.push({ id, building, institution, lotteries: [lottery]});
    }
    return accum;
  }, []);

  return {
    version: new Date(version),
    list,
    detail: undefined,
  };
}
