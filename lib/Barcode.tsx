// Weights used to calculate the Royal Mail check digit
const WEIGHTS = [8, 6, 4, 2, 3, 5, 9, 7];

// Calculates the check digit based on the 8-digit serial number (used AI to help with this bit as unfamiliar with typescript )
export function computeCheckDigit(digits: string): number {
  let sum = 0;

  for (let i = 0; i < 8; i++) {
    sum += Number(digits[i]) * WEIGHTS[i];
  }

  const result = 11 - (sum % 11);

  if (result === 10) return 0;
  if (result === 11) return 5;
  return result;
}
// used AI to help with this function

export function validateBarcode(inputResult: string) {
  const input = (inputResult || "").trim().toUpperCase();


  const prefix = input.slice(0, 2);
  const serialNumber = input.slice(2, 10);
  const checkDigit = input[10];
  const countryCode = input.slice(11, 13);


  
  // Check  length is 13
  if (input.length !== 13) 
    { return { ok: false, error: "LENGTH", message: "Validation failed - Barcode is not the correct length (must be 13 characters)", };
 }

  
  // Check  prefix is  2 letters from A–Z
  for (let i = 0; i < prefix.length; i++) {
    const char = prefix[i];
    if (char < "A" || char > "Z") {
      return { ok: false, message: "Validation failed - Prefix must be two letters between A-Z" };
    }
  }

  // Check serial number is 8 digits
  for (let i = 0; i < serialNumber.length; i++) {
    const char = serialNumber[i];
    if (char < "0" || char > "9") {
      return { ok: false, message: "Validation failed - Serial Number must be 8 digits" };
    }
  }

  // Check digit is 0–9
  if (checkDigit < "0" || checkDigit > "9") {
    return { ok: false, message: "Validation failed - Check digit must be a digit (0-9)" };
  }

  //Check  country code is GB
  if (countryCode !== "GB") {
    return { ok: false, message: "Validation failed - Country code must be GB" };
  }

  // Check digit validation
  const expected = computeCheckDigit(serialNumber);
  const actual = Number(checkDigit);

  if (actual !== expected) {
    return { ok: false, message: "Validation failed - Check digit is not correct" };
  }

  return { ok: true, capitalised: input };
}
