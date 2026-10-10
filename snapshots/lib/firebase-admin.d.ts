/** 型別快照：宿主 @/lib/firebase-admin（Firestore 以寬鬆型別表示；僅伺服器端可用） */

export interface FirestoreDoc {
  id: string;
  exists: boolean;
  data(): Record<string, unknown> | undefined;
  get(): Promise<FirestoreDoc>;
  set(data: Record<string, unknown>, options?: { merge?: boolean }): Promise<unknown>;
  update(data: Record<string, unknown>): Promise<unknown>;
  delete(): Promise<unknown>;
  ref: FirestoreRef;
}

export interface FirestoreRef {
  id: string;
  path: string;
  collection(name: string): FirestoreCollection;
  get(): Promise<FirestoreDoc>;
  set(data: Record<string, unknown>, options?: { merge?: boolean }): Promise<unknown>;
  update(data: Record<string, unknown>): Promise<unknown>;
  delete(): Promise<unknown>;
}

export interface FirestoreQuery {
  where(field: string, op: string, value: unknown): FirestoreQuery;
  orderBy(field: string, direction?: "asc" | "desc"): FirestoreQuery;
  limit(n: number): FirestoreQuery;
  offset(n: number): FirestoreQuery;
  get(): Promise<{ docs: FirestoreDoc[]; size: number; empty: boolean }>;
}

export interface FirestoreCollection {
  doc(id?: string): FirestoreRef;
  add(data: Record<string, unknown>): Promise<FirestoreRef>;
  where(field: string, op: string, value: unknown): FirestoreQuery;
  orderBy(field: string, direction?: "asc" | "desc"): FirestoreQuery;
  limit(n: number): FirestoreQuery;
  get(): Promise<{ docs: FirestoreDoc[]; size: number; empty: boolean }>;
}

export interface Firestore {
  collection(name: string): FirestoreCollection;
  batch(): {
    set(ref: FirestoreRef, data: Record<string, unknown>, options?: { merge?: boolean }): void;
    update(ref: FirestoreRef, data: Record<string, unknown>): void;
    delete(ref: FirestoreRef): void;
    commit(): Promise<unknown>;
  };
  runTransaction<T>(fn: (tx: FirestoreTransaction) => Promise<T>): Promise<T>;
}

export interface FirestoreTransaction {
  get(ref: FirestoreRef): Promise<FirestoreDoc>;
  getCollection(collection: FirestoreQuery): Promise<{ docs: FirestoreDoc[] }>;
  set(ref: FirestoreRef, data: Record<string, unknown>, options?: { merge?: boolean }): FirestoreTransaction;
  update(ref: FirestoreRef, data: Record<string, unknown>): FirestoreTransaction;
  delete(ref: FirestoreRef): FirestoreTransaction;
}

export function getAdminDb(): Firestore;
export const FieldValue: {
  serverTimestamp(): unknown;
  increment(n: number): unknown;
  arrayUnion(...values: unknown[]): unknown;
  arrayRemove(...values: unknown[]): unknown;
};
