export type LotteryResponse = {
  version: string;
  data: LotteryData[];
};

export type LotteryData = {
  id: string;
  building: string;
  institution: string;
  lottery: Lottery;
};

export type Lottery = {
  header: string[];
  body: string[][];
};

export type LotteryDetail = {
  id: string;
  building: string;
  institution: string;
  lotteries: Lottery[];
};

export type LotteryDetailBlockCell = {
  rowId: string;
  colId: string;
};

export type PageStatus = "prepare" | "generating" | "generated" | "error";

export type FormValues = {
  userId: string;
  password: string;
  purposeType: string;
  purpose: string;
};
