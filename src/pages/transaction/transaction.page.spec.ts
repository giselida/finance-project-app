import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderToastContent } from "../../toasts/toast.spec";
import { TransactionPage } from "./transaction.page";

export function mockCharts() {
  Object.defineProperty(window, "ResizeObserver", {
    writable: true,
    value:
      window.ResizeObserver ||
      vi.fn().mockImplementation(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      })),
  });

  Object.defineProperty(global.Node.prototype, "getScreenCTM", {
    writable: true,
    value: vi.fn(),
  });

  Object.defineProperty(global.SVGElement.prototype, "getBBox", {
    writable: true,
    value: vi.fn().mockReturnValue({
      x: 0,
      y: 0,
    }),
  });

  Object.defineProperty(global.SVGElement.prototype, "getComputedTextLength", {
    writable: true,
    value: vi.fn().mockReturnValue(0),
  });

  Object.defineProperty(global.SVGElement.prototype, "createSVGMatrix", {
    writable: true,
    value: vi.fn().mockReturnValue({
      x: 10,
      y: 10,
      inverse: () => {},
      multiply: () => {},
    }),
  });
}

describe("TransactionPage", () => {
  let transactionPage: TransactionPage;
  mockCharts();
  customElements.define("transaction-page", TransactionPage);

  afterEach(() => {});

  beforeEach(() => {
    renderToastContent();
    transactionPage = new TransactionPage();
    document.documentElement.firstChild.appendChild(transactionPage);
  });

  it("should addTransaction throw error when value 0 or less than", () => {
    expect(() => {
      transactionPage.addTransaction();
    }).toThrowError("Selecione um valor valido!");
  });

  it("should initialize correctly", () => {
    vi.stubGlobal("localStorage", {
      getItem(key: string) {
        const mock = {
          id: 1,
          name: "giselida",
          email: "giselidac@gmail.com",
          accountNumber: "31142-94",
          accountAmount: 1760,
          password: "21454",
          limitCredit: 4550,
        };
        if (key === "actuallyId") return 1;
        if (key === "client") return JSON.stringify(mock);
        if (key === "transactionList")
          return JSON.stringify([
            {
              id: 16,
              value: "500,00",
              formOfPayment: "Pix",
              date: "10/11/2023",
              clientName: "João - 825077-44",
              clientID: "2",
              userLoggedID: 1,
            },
          ]);
        if (key === "clients") return JSON.stringify([mock]);
      },
    });
    const client = {
      id: 2,
      name: "João",
      accountAmount: 0,
      accountNumber: "1231",
      email: "teste@teste",
      limitCredit: 500,
      password: "123",
    };
    const result = transactionPage.createFormOption(client);

    expect(result).toEqual(`
           <div class="option" value="${client.id}">
            ${client.name} - ${client.accountNumber}
            </div>
          `);
  });

  it("should format date correctly", () => {
    const mockDate = {
      date: "12/09/2009",
    };
    expect(transactionPage.getDate(mockDate.date));
  });
  it("should handle send button click", () => {});

  it("should handle modal hidden event", () => {});

  it("should debounce events correctly", () => {});

  it("should add a transaction", () => {});

  it("should update a transaction", () => {});

  it("should remove a transaction", () => {});

  it("should duplicate a transaction", () => {});
});
