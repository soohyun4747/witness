export type Role = 'ADMIN' | 'STAFF' | 'SCANNER' | 'AUDITOR';
export type CaseStatus = 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
export type SampleType = 'SPERM_BOTTLE';
export type PrintType = 'WRISTBAND' | 'SPERM_BOTTLE';

export interface User { id: string; email: string; passwordHash: string; name: string; role: Role; isActive: boolean; createdAt: string; updatedAt: string; }
export interface Patient { id: string; chartNo?: string; fullName: string; birthDate?: string; phone?: string; memo?: string; createdAt: string; updatedAt: string; }
export interface Case { id: string; patientId: string; status: CaseStatus; scheduledDate?: string; createdAt: string; updatedAt: string; }
export interface Sample { id: string; caseId: string; type: SampleType; serialNo: number; barcodeValue: string; printedAt?: string; createdAt: string; }
export interface Station { id: string; name: string; description?: string; createdAt: string; updatedAt: string; }
export interface Device { id: string; name: string; deviceCode: string; assignedStationId?: string; lastSeenAt?: string; createdAt: string; updatedAt: string; }
export interface PrintHistory { id: string; caseId: string; type: PrintType; printedBy: string; printedAt: string; note?: string; }
