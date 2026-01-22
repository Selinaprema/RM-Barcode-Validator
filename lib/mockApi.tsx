// Used AI to help write Api
export function mockValidateBarcodeApi(barcode: string): Promise<void> {
  const delayMs = 1000 + Math.floor(Math.random() * 30000); 
  const shouldSucceed = Math.random() >= 0.5;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) resolve();
      else reject(new Error("Mock API validation failed"));
    }, delayMs);
  });
}
