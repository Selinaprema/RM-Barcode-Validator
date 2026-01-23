// Used AI to understand seperating this into a seperate file as the data shape
export type HistoryEntry = {
  id: string;
  barcode: string;
  status: "validating" | "Valid" | "Invalid";
};
