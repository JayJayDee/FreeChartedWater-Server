import { ConfigurationRequiredError } from '../errors';

interface LoadOptions {
  mandantory: boolean;
  defaultValue?: any;
}

const defaultOption = () => ({
  mandantory: true,
});

export default (source: {[key: string]: any}) =>
  (key: string, opts?: LoadOptions) => {
    let options: LoadOptions = defaultOption();
    if (opts) {
      options = opts;
    }

    if (source[key] === undefined) {
      if (options.mandantory === true) {
        throw new ConfigurationRequiredError(key);
      }
      if (options.defaultValue !== undefined) {
        return options.defaultValue;
      }
      return null;
    }

    return source[key];
  };
