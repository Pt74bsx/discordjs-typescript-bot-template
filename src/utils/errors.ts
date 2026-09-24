export class UserFacingError extends Error {
  public readonly userMessage: string;

  public constructor(userMessage: string, cause?: unknown) {
    super(userMessage, { cause });
    this.name = 'UserFacingError';
    this.userMessage = userMessage;
  }
}
