export class AppError extends Error {
  status?: number;
  requestId?: string;
  constructor(message: string, opts?: { status?: number; requestId?: string }) {
    super(message);
    this.name = "AppError";
    this.status = opts?.status;
    this.requestId = opts?.requestId;
  }
}
