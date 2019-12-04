
export interface Logger {
  info: (...args: any[]) => void;
  error: (...args: any[]) => void;
  debug: (message?: any, ...args: any[]) => void;
}
