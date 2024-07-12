class InvalidIdentifierError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidIdentifierError";
  }
}

export {
  InvalidIdentifierError
}
