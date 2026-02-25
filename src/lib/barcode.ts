export const barcodeForCase = (caseId: string) => `WIT-CASE-${caseId}`;
export const barcodeForSample = (sampleId: string) => `WIT-SAMPLE-${sampleId}`;
// Future extension: add check digit/signature for RAW printer workflows.
export function generateBarcodeValue(kind: 'CASE' | 'SAMPLE', id: string) {
  return kind === 'CASE' ? barcodeForCase(id) : barcodeForSample(id);
}
