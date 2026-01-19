import { computeCheckDigit, validateBarcode } from "@/lib/barcode";

describe("computeCheckDigit", () => {
  it("calculates the correct check digit for a known example", () => {
   
    expect(computeCheckDigit("47312482")).toBe(9);
  });
});

describe("validateBarcode", () => {
  it("accepts a valid barcode", () => {
    const result = validateBarcode("AB473124829GB");
    expect(result.ok).toBe(true);
  });

  it("Rejects incorrect length", () => {
    const result = validateBarcode("AB123GB");
    expect(result.ok).toBe(false);
  });

  it("Rejects incorrect country code", () => {
    const result = validateBarcode("AB473124829US");
    expect(result.ok).toBe(false);
  });

  it("Rejects incorrect digit", () => {
    const result = validateBarcode("AB473124820GB");
    expect(result.ok).toBe(false);
  });
});
