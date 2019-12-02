
export class ConfigurationRequiredError extends Error {
  constructor(keyName: string) {
    super(`configuration not supplied: ${keyName}`);
  }
}
