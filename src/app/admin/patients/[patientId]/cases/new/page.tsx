import { createCaseAction } from '@/app/admin/actions';

export default async function NewCaseFromPatient({ params }: { params: Promise<{ patientId: string }> }) {
  const { patientId } = await params;
  await createCaseAction(patientId);
  return null;
}
