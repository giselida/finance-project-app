export class StorageService {
  static getItem<T>(key: string, defaultValue: T): T {
    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) : defaultValue;
  }

  static setItem<T>(key: string, value: T): void {
    const stringValue = JSON.stringify(value);

    localStorage.setItem(key, stringValue);
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
