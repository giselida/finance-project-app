import { beforeEach, describe, expect, it } from "vitest";
import { StorageService } from "./storage";

describe("StorageService", () => {
  const key = "testKey";
  const value = { foo: "bar" };
  const stringValue = JSON.stringify(value);

  beforeEach(() => {
    localStorage.clear();
  });

  describe("getItem", () => {
    it("should return the parsed value if the item exists", () => {
      localStorage.setItem(key, stringValue);
      const result = StorageService.getItem(key, {});
      expect(result).toEqual(value);
    });

    it("should return the default value if the item does not exist", () => {
      const defaultValue = { default: true };
      const result = StorageService.getItem("nonexistent", defaultValue);
      expect(result).toEqual(defaultValue);
    });
  });

  describe("setItem", () => {
    it("should store the stringified value in localStorage", () => {
      StorageService.setItem(key, value);
      expect(localStorage.getItem(key)).toBe(stringValue);
    });
  });

  describe("removeItem", () => {
    it("should remove the item from localStorage", () => {
      localStorage.setItem(key, stringValue);
      StorageService.removeItem(key);
      expect(localStorage.getItem(key)).toBeNull();
    });
  });
});
