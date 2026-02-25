'use server';

import { redirect } from 'next/navigation';
import { createSession, requireSession } from '@/lib/auth';
import { barcodeForCase } from '@/lib/barcode';
import { repo } from '@/lib/store';
import { Role } from '@/lib/types';

export async function loginAction(formData: FormData) {
  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');
  const user = repo.findUserByEmail(email);
  const { verifyPassword } = await import('@/lib/store');
  if (!user || !verifyPassword(password, user.passwordHash)) {
    redirect('/login?error=1');
  }
  await createSession(user.id, user.email, user.role);
  redirect('/admin');
}

export async function createPatientAction(formData: FormData) {
  await requireSession(['ADMIN', 'STAFF']);
  const patient = repo.createPatient({
    fullName: String(formData.get('fullName') || ''),
    chartNo: String(formData.get('chartNo') || '') || undefined,
    birthDate: String(formData.get('birthDate') || '') || undefined,
    phone: String(formData.get('phone') || '') || undefined,
    memo: String(formData.get('memo') || '') || undefined,
  });
  redirect(`/admin/patients/${patient.id}`);
}

export async function createCaseAction(patientId: string) {
  await requireSession(['ADMIN', 'STAFF']);
  const c = repo.createCase(patientId);
  redirect(`/admin/cases/${c.id}`);
}

export async function createSpermBottleSamples(caseId: string, count: number) {
  await requireSession(['ADMIN', 'STAFF']);
  return repo.createSamples(caseId, Math.max(1, Math.min(10, count))).map((s) => s.id);
}

export async function createSamplesAndRedirect(formData: FormData) {
  const caseId = String(formData.get('caseId'));
  const count = Number(formData.get('count') || 1);
  await createSpermBottleSamples(caseId, count);
  redirect(`/admin/cases/${caseId}/print/sperm-bottle?count=${count}`);
}

export async function markSamplesPrinted(sampleIds: string[]) {
  await requireSession(['ADMIN', 'STAFF']);
  repo.markSamplesPrinted(sampleIds);
}

export async function saveStation(formData: FormData) {
  await requireSession(['ADMIN']);
  repo.upsertStation(String(formData.get('id') || '') || undefined, String(formData.get('name') || ''), String(formData.get('description') || '') || undefined);
  redirect('/admin/stations');
}
export async function saveDevice(formData: FormData) {
  await requireSession(['ADMIN']);
  repo.upsertDevice(String(formData.get('id') || '') || undefined, String(formData.get('name') || ''), String(formData.get('deviceCode') || ''), String(formData.get('assignedStationId') || '') || undefined);
  redirect('/admin/devices');
}
export async function saveUser(formData: FormData) {
  await requireSession(['ADMIN']);
  repo.upsertUser(String(formData.get('id') || '') || undefined, String(formData.get('email') || ''), String(formData.get('name') || ''), String(formData.get('role') || 'STAFF') as Role, String(formData.get('password') || '') || undefined);
  redirect('/admin/users');
}
export async function deactivateUser(formData: FormData) {
  await requireSession(['ADMIN']);
  repo.deactivateUser(String(formData.get('id') || ''));
  redirect('/admin/users');
}

export async function wristbandValue(caseId: string) {
  return barcodeForCase(caseId);
}
