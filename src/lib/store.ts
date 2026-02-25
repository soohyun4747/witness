import { randomUUID, scryptSync, timingSafeEqual } from 'crypto';
import fs from 'fs';
import path from 'path';
import { barcodeForSample } from './barcode';
import { Case, Device, Patient, Role, Sample, Station, User } from './types';

interface Db { users: User[]; patients: Patient[]; cases: Case[]; samples: Sample[]; stations: Station[]; devices: Device[]; }
const dbPath = path.join(process.cwd(), 'data.json');

function now() { return new Date().toISOString(); }
function readDb(): Db {
  if (!fs.existsSync(dbPath)) {
    const t = now();
    const seed: Db = {
      users: [{ id: randomUUID(), email: 'admin@local', passwordHash: hashPassword(process.env.SEED_ADMIN_PASSWORD || 'admin1234'), name: '관리자', role: 'ADMIN', isActive: true, createdAt: t, updatedAt: t }],
      patients: [], cases: [], samples: [],
      stations: ['접수', '채취실', '수술실', '회복실'].map((name) => ({ id: randomUUID(), name, createdAt: t, updatedAt: t })),
      devices: [],
    };
    fs.writeFileSync(dbPath, JSON.stringify(seed, null, 2));
    return seed;
  }
  return JSON.parse(fs.readFileSync(dbPath, 'utf8')) as Db;
}
function writeDb(db: Db) { fs.writeFileSync(dbPath, JSON.stringify(db, null, 2)); }

export function hashPassword(password: string) { const salt = 'witness'; return scryptSync(password, salt, 64).toString('hex'); }
export function verifyPassword(password: string, hashed: string) {
  const a = Buffer.from(hashPassword(password), 'hex');
  const b = Buffer.from(hashed, 'hex');
  return a.length === b.length && timingSafeEqual(a, b);
}

export const repo = {
  getDb: readDb,
  save: writeDb,
  findUserByEmail: (email: string) => readDb().users.find((u) => u.email === email && u.isActive),
  createPatient: (data: Partial<Patient>) => { const db = readDb(); const t = now(); const patient: Patient = { id: randomUUID(), fullName: data.fullName || '', chartNo: data.chartNo, birthDate: data.birthDate, phone: data.phone, memo: data.memo, createdAt: t, updatedAt: t }; db.patients.push(patient); writeDb(db); return patient; },
  createCase: (patientId: string) => { const db = readDb(); const t = now(); const c: Case = { id: randomUUID(), patientId, status: 'ACTIVE', createdAt: t, updatedAt: t }; db.cases.push(c); writeDb(db); return c; },
  createSamples: (caseId: string, count: number) => {
    const db = readDb();
    const current = db.samples.filter((s) => s.caseId === caseId);
    let serial = current.reduce((m, s) => Math.max(m, s.serialNo), 0) + 1;
    const created: Sample[] = [];
    for (let i = 0; i < count; i += 1) {
      const id = randomUUID();
      const sample: Sample = { id, caseId, type: 'SPERM_BOTTLE', serialNo: serial++, barcodeValue: barcodeForSample(id), createdAt: now() };
      db.samples.push(sample);
      created.push(sample);
    }
    writeDb(db);
    return created;
  },
  markSamplesPrinted: (sampleIds: string[]) => { const db = readDb(); const t = now(); db.samples = db.samples.map((s) => sampleIds.includes(s.id) ? { ...s, printedAt: t } : s); writeDb(db); },
  upsertStation: (id: string | undefined, name: string, description?: string) => { const db = readDb(); const t = now(); if (id) { db.stations = db.stations.map((s) => s.id === id ? { ...s, name, description, updatedAt: t } : s); } else { db.stations.push({ id: randomUUID(), name, description, createdAt: t, updatedAt: t }); } writeDb(db); },
  upsertDevice: (id: string | undefined, name: string, deviceCode: string, assignedStationId?: string) => { const db = readDb(); const t = now(); if (id) { db.devices = db.devices.map((d) => d.id === id ? { ...d, name, deviceCode, assignedStationId, updatedAt: t } : d); } else { db.devices.push({ id: randomUUID(), name, deviceCode, assignedStationId, createdAt: t, updatedAt: t }); } writeDb(db); },
  upsertUser: (id: string | undefined, email: string, name: string, role: Role, password?: string) => { const db = readDb(); const t = now(); if (id) { db.users = db.users.map((u) => u.id === id ? { ...u, email, name, role, ...(password ? { passwordHash: hashPassword(password) } : {}), updatedAt: t } : u); } else { db.users.push({ id: randomUUID(), email, name, role, passwordHash: hashPassword(password || 'changeme123'), isActive: true, createdAt: t, updatedAt: t }); } writeDb(db); },
  deactivateUser: (id: string) => { const db = readDb(); db.users = db.users.map((u) => u.id === id ? { ...u, isActive: false } : u); writeDb(db); },
};
