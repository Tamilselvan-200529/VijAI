'use client';

export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  requestResourceData?: any;
};

export class FirestorePermissionError extends Error {
  readonly context: SecurityRuleContext;
  readonly cause: any;

  constructor(context: SecurityRuleContext, options: { cause?: any } = {}) {
    const message = `FirestoreError: Missing or insufficient permissions: The following request was denied by Firestore Security Rules:\n${JSON.stringify(context, null, 2)}`;
    super(message);
    this.name = 'FirestorePermissionError';
    this.context = context;
    this.cause = options.cause;

    // This is to make the error message more readable in the console.
    Object.setPrototypeOf(this, FirestorePermissionError.prototype);
  }
}
