export type HistoryEntry = {
  id: string;
  barcode: string;
  status: "validating" | "valid" | "invalid";
};
