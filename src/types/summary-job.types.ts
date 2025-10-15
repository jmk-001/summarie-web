export type CreateSummaryJobInput = {
  documentId: string;

  model: string;

  idempotencyKey?: string | null;

  schemaVersion: number;

  paramsSnapshot: Record<string, any>;
};
