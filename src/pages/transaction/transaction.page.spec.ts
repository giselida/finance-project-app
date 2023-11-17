import { SpyInstance, beforeEach, describe, expect, it, vi } from "vitest";
import { renderToastContent } from "../../toasts/toast.spec";
import { TransactionPage, eFormOfPayment } from "./transaction.page";
let clientMock = {
  id: 1,
  name: "giselida",
  email: "giselidac@gmail.com",
  accountNumber: "31142-94",
  accountAmount: 1760,
  password: "21454",
  limitCredit: 4550,
};
let transactionListMock = [
  {
    id: 16,
    value: "500,00",
    formOfPayment: "Pix",
    date: "10/11/2023",
    clientName: "João - 825077-44",
    clientID: "1",
    userLoggedID: 1,
  },
];

let actuallyId = 1;
let clientsMock = [clientMock];
const mockLocalStorage = {
  getItem(key: string) {
    if (key === "actuallyId") return actuallyId;
    if (key === "client") return JSON.stringify(clientMock);
    if (key === "transactionList") return JSON.stringify(transactionListMock);
    if (key === "clients") return JSON.stringify(clientsMock);
  },
  setItem(key: string, value: any) {
    if (key === "clients") clientsMock = JSON.parse(value);
    if (key === "client") clientMock = JSON.parse(value);
    if (key === "actuallyId") actuallyId = JSON.parse(value);
    if (key === "transactionList") transactionListMock = JSON.parse(value);
  },
  removeItem() {},
};
export const localStorage = vi.stubGlobal("localStorage", mockLocalStorage);

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
  customElements.define("transaction-page", TransactionPage);
  vi.useFakeTimers();
  let chartSpy: SpyInstance;
  mockCharts();
  beforeEach(() => {
    clientMock = {
      id: 1,
      name: "giselida",
      email: "giselidac@gmail.com",
      accountNumber: "31142-94",
      accountAmount: 1760,
      password: "21454",
      limitCredit: 4550,
    };
    transactionListMock = [
      {
        id: 1,
        value: "500,00",
        formOfPayment: "Pix",
        date: "10/11/2023",
        clientName: "João - 825077-44",
        clientID: "1",
        userLoggedID: 1,
      },
    ];
    actuallyId = 1;
    clientsMock = [clientMock];
    renderToastContent();
    transactionPage = new TransactionPage();
    chartSpy = vi.spyOn(transactionPage, "onChart");

    chartSpy.mockImplementation(() => {});
    document.documentElement.firstChild.appendChild(transactionPage);
  });

  it("should addTransaction throw error when value 0 or less than", () => {
    chartSpy.mockRestore();
    const spy = vi.spyOn(mockLocalStorage, "getItem");
    spy.mockReturnValue(null);
    transactionPage.connectedCallback();

    expect(transactionPage.clientLogged).toEqual({});

    expect(() => {
      transactionPage.addTransaction();
    }).toThrowError("Selecione um valor valido!");
    spy.mockRestore();
  });

  it("should initialize correctly", () => {
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
    expect(transactionPage["getDate"](mockDate.date)).toStrictEqual(new Date("2009-09-12T03:00:00.000Z"));
  });

  it("should handle send button click", () => {});

  it("should handle modal hidden event", () => {
    transactionPage["onModalHidden"]();
    expect(transactionPage.transactionFind).toBeNull();
    expect(transactionPage.$inputValue.disabled).toBeFalsy();
    expect(transactionPage.selectedId).toBeNull();
  });

  it("should debounce events correctly", () => {});

  it("should add a transaction", () => {
    transactionPage.$inputDate.value = "24/09/2001";

    expect(() => {
      transactionPage["sendListener"]();
    }).toThrowError("Por favor preencha os campos obrigatórios!");

    transactionPage.$inputFormOfPayment.value = eFormOfPayment.CREDITO;
    transactionPage.$inputValue.value = "10.50";
    transactionPage.$clientID.value = "1";
    transactionPage["sendListener"]();
    expect(transactionPage.transactionList.length).toBe(2);
  });

  it("should not add a transaction and throw message error", () => {
    transactionPage.$inputDate.value = "24/09/2001";
    transactionPage.$inputFormOfPayment.value = "Pix";
    transactionPage.$inputValue.value = "1765";
    transactionPage.$clientID.value = "1";
    expect(() => {
      transactionPage["sendListener"]();
    }).toThrowError("Saldo insuficiente!");
  });

  it("should update a transaction", () => {
    transactionPage.editTransaction(0);

    transactionPage.editTransaction(1);

    expect(transactionPage.$inputValue.disabled).toBeTruthy();
    expect(transactionPage.$inputValue.value).toBe(transactionListMock[0].value);
    expect(transactionPage.$inputFormOfPayment.value).toBe(transactionListMock[0].formOfPayment);
    expect(transactionPage.$inputDate.value).toBe(transactionListMock[0].date);
    expect(transactionPage.$clientID.value).toBe(transactionListMock[0].clientID);

    transactionPage.$inputValue.value = "125,25";
    transactionPage.$inputDate.value = "24/09/2001";
    transactionPage["sendListener"]();

    expect(transactionPage.transactionList[0]).toEqual({
      clientID: "1",
      clientName: "giselida - 31142-94",
      date: "24/09/2001",
      formOfPayment: "Pix",
      id: 1,
      userLoggedID: 1,
      value: "125,25",
    });
  });

  it("should remove a transaction", () => {
    transactionPage.removeTransaction(1);
    expect(transactionPage.transactionList.length).toBe(0);
  });
  it("should call the callback after the specified timeout", () => {
    const callback = vi.fn();
    const debounced = transactionPage.debounceEvent(callback, 100);

    debounced();
    vi.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledOnce();
  });

  it("should not call the callback before the timeout", () => {
    const callback = vi.fn();
    const debounced = transactionPage.debounceEvent(callback, 100);

    debounced();
    vi.advanceTimersByTime(50);
    expect(callback).not.toHaveBeenCalled();
  });
  it("should only call the callback once when debounced multiple times", () => {
    const callback = vi.fn();
    const debounced = transactionPage.debounceEvent(callback, 100);
    debounced();
    vi.advanceTimersByTime(50);
    debounced();
    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledOnce();
  });
  it("should duplicate a transaction", () => {
    chartSpy.mockRestore();

    transactionPage.duplicateTransaction(1);
    expect(transactionPage.$inputValue.value).toBe(transactionListMock[0].value);
    expect(transactionPage.$inputFormOfPayment.value).toBe(transactionListMock[0].formOfPayment);
    expect(transactionPage.$inputDate.value).toBe(transactionListMock[0].date);
    expect(transactionPage.$clientID.value).toBe(transactionListMock[0].clientID);

    transactionPage["sendListener"]();

    expect(transactionPage.transactionList.length).toBe(2);
  });
});
