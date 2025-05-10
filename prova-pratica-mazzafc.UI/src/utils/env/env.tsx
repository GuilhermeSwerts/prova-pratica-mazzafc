export class envUtil {
    static get(name: string): string | undefined {
      return import.meta.env[name as keyof ImportMetaEnv];
    }
  }
  