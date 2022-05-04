export type ValidationError = {
  context: { key: string; label: string; };
  message: string;
  path: string[];
  type: string;
}

