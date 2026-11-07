/** 影子 tsc 樁：firebase／firebase-admin（只讓快照的 import 可解析；型別刻意寬鬆） */
declare module "firebase-admin" {
  const admin: any;
  export default admin;
}

declare module "firebase-admin/app" {
  export type App = any;
  export interface ServiceAccount {
    projectId?: string;
    clientEmail?: string;
    privateKey?: string;
    [key: string]: unknown;
  }
  export function initializeApp(...args: any[]): App;
  export function getApps(): App[];
  export function getApp(name?: string): App;
  export function cert(...args: any[]): any;
}

declare module "firebase-admin/auth" {
  export interface Auth {
    verifyIdToken(token: string, checkRevoked?: boolean): Promise<any>;
    createUser(properties: any): Promise<any>;
    updateUser(uid: string, properties: any): Promise<any>;
    deleteUser(uid: string): Promise<void>;
    getUser(uid: string): Promise<any>;
    getUserByEmail(email: string): Promise<any>;
    listUsers(maxResults?: number, pageToken?: string): Promise<any>;
    setCustomUserClaims(uid: string, claims: Record<string, unknown> | null): Promise<void>;
    revokeRefreshTokens(uid: string): Promise<void>;
    generatePasswordResetLink(email: string, settings?: any): Promise<string>;
    [key: string]: any;
  }
  export function getAuth(app?: any): Auth;
}

declare module "firebase-admin/firestore" {
  export interface DocumentData {
    [field: string]: any;
  }

  export interface DocumentSnapshot<T = DocumentData> {
    id: string;
    exists: boolean;
    ref: DocumentReference<T>;
    data(): T | undefined;
    get(field: string): any;
  }

  export interface QueryDocumentSnapshot<T = DocumentData> extends DocumentSnapshot<T> {
    exists: true;
    data(): T;
  }


  export interface QuerySnapshot<T = DocumentData> {
    docs: QueryDocumentSnapshot<T>[];
    empty: boolean;
    size: number;
    forEach(callback: (doc: QueryDocumentSnapshot<T>) => void): void;
  }

  export interface DocumentReference<T = DocumentData> {
    id: string;
    path: string;
    get(): Promise<DocumentSnapshot<T>>;
    set(data: Partial<T> | T, options?: { merge?: boolean }): Promise<unknown>;
    update(data: Record<string, unknown>): Promise<unknown>;
    delete(): Promise<unknown>;
    collection(name: string): CollectionReference;
  }

  export interface Query<T = DocumentData> {
    where(field: string | Record<string, unknown>, op?: string, value?: unknown): Query<T>;
    orderBy(field: string, direction?: "asc" | "desc"): Query<T>;
    limit(limit: number): Query<T>;
    limitToLast(limit: number): Query<T>;
    startAt(...args: any[]): Query<T>;
    startAfter(...args: any[]): Query<T>;
    endAt(...args: any[]): Query<T>;
    endBefore(...args: any[]): Query<T>;
    offset(offset: number): Query<T>;
    select(...fields: string[]): Query<T>;
    get(): Promise<QuerySnapshot<T>>;
    count(): { get(): Promise<{ data(): { count: number } }> };
  }

  export interface CollectionReference<T = DocumentData> extends Query<T> {
    id: string;
    path: string;
    doc(id?: string): DocumentReference<T>;
    add(data: T): Promise<DocumentReference<T>>;
  }

  export interface WriteBatch {
    set(ref: DocumentReference, data: any, options?: any): WriteBatch;
    update(ref: DocumentReference, data: any): WriteBatch;
    delete(ref: DocumentReference): WriteBatch;
    commit(): Promise<unknown>;
  }

  export interface Transaction {
    get(ref: DocumentReference): Promise<DocumentSnapshot>;
    get(query: Query): Promise<QuerySnapshot>;
    set(ref: DocumentReference, data: any, options?: any): Transaction;
    update(ref: DocumentReference, data: any): Transaction;
    delete(ref: DocumentReference): Transaction;
  }

  export interface Firestore {
    collection<T = DocumentData>(name: string): CollectionReference<T>;
    doc(path: string): DocumentReference;
    getAll(...refs: Array<DocumentReference | string>): Promise<DocumentSnapshot[]>;
    runTransaction<R>(fn: (transaction: Transaction) => Promise<R>): Promise<R>;
    batch(): WriteBatch;
    settings(settings: Record<string, unknown>): void;
  }

  export type Timestamp = any;

  export const FieldValue: {
    serverTimestamp(): any;
    increment(value: number): any;
    arrayUnion(...items: any[]): any;
    arrayRemove(...items: any[]): any;
    delete(): any;
  };

  export function getFirestore(app?: any): Firestore;
}

declare module "@google-cloud/storage" {
  export interface Bucket {
    name: string;
    file(path: string): any;
    upload(...args: any[]): Promise<any>;
    deleteFiles(options?: any): Promise<any>;
    getFiles(options?: any): Promise<any[]>;
    exists(): Promise<[boolean]>;
    create(options?: any): Promise<any>;
    [key: string]: any;
  }
  export class Storage {
    constructor(options?: any);
    bucket(name?: string): Bucket;
  }
}

declare module "firebase/app" {
  export function initializeApp(config: Record<string, unknown>, name?: string): any;
  export function getApps(): any[];
}

declare module "firebase/auth" {
  export type Auth = any;
  export type UserCredential = any;
  export function getAuth(app?: any): Auth;
  export function signOut(auth: Auth): Promise<void>;
  export function signInWithPopup(auth: Auth, provider: any): Promise<UserCredential>;
  export function signInWithCredential(auth: Auth, credential: any): Promise<UserCredential>;
  export class GoogleAuthProvider {
    static credential(idToken: string, accessToken?: string): any;
    constructor();
  }
}
