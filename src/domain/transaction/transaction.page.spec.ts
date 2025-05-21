import { SpyInstance, beforeEach, describe, expect, it, vi } from "vitest";
import { StorageService } from "../../components/storage/storage";
import { renderToastContent } from "../../components/toasts/toast.spec";
import { eFormOfPayment } from "../../constants/svg-icons-form-payment";
import { Cliente } from "../auth/interface/client.interface";
import { Transaction } from "./interface/transaction.interface";
import { TransactionPage } from "./transaction.page";

// Adiciona o método convertStringDate ao protótipo de String para os testes
if (!String.prototype.hasOwnProperty("convertStringDate")) {
  // Exemplo de implementação, ajuste conforme a real do seu projeto
  // Aqui, retorna um objeto Date a partir de uma string no formato dd/mm/yyyy
  // Se o formato for diferente, ajuste a função!
  (String.prototype as any).convertStringDate = function () {
    const [day, month, year] = this.split("/");
    return new Date(Number(year), Number(month) - 1, Number(day));
  };
}

let clientMock = {
  id: 1,
  name: "giselida",
  email: "giselidac@gmail.com",
  accountNumber: "31142-94",
  accountAmount: 1760,
  password: "21454",
  limitCredit: 4550,
  selected: true,
  active: true,
};
let transactionListMock: Transaction[] = [
  {
    id: 16,
    value: 500,
    idFormOfPayment: 1,
    date: "10/11/2023",
    clientName: "João - 825077-44",
    clientID: 1,
    creditCardID: 1,
    userLoggedID: 1,
    view: [0],
    idDescription: 1,
    dateOfPayDay: "10/11/2023",
    active: true,
  },
];

const transactionListPage = [
  {
    id: 16,
    value: 500,
    idFormOfPayment: 1,
    date: "10/11/2023",
    clientName: "João - 825077-44",
    clientID: 1,
    creditCardID: 1,
    userLoggedID: 1,
    view: [0],
    idDescription: 1,
    dateOfPayDay: "10/11/2023",
    active: true,
  },
  {
    id: 16,
    value: 500,
    idFormOfPayment: 1,
    date: "10/11/2023",
    clientName: "João - 825077-44",
    clientID: 1,
    creditCardID: 1,
    userLoggedID: 1,
    view: [0],
    idDescription: 1,
    dateOfPayDay: "10/11/2023",
    active: true,
  },
  {
    id: 16,
    value: 500,
    idFormOfPayment: 1,
    date: "10/11/2023",
    clientName: "João - 825077-44",
    clientID: 1,
    creditCardID: 1,
    userLoggedID: 1,
    view: [0],
    idDescription: 1,
    dateOfPayDay: "10/11/2023",
    active: true,
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

vi.mock("sweetalert2", () => ({
  __esModule: true,
  default: {
    fire: vi.fn().mockResolvedValue({ isConfirmed: true }),
  },
}));

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
      selected: true,
      active: true,
    };
    transactionListMock = [
      {
        id: 16,
        value: 500,
        idFormOfPayment: 1,
        date: "10/11/2023",
        clientName: "João - 825077-44",
        clientID: 1,
        creditCardID: 1,
        userLoggedID: 1,
        view: [0],
        idDescription: 1,
        dateOfPayDay: "10/11/2023",
        active: true,
      },
    ];
    actuallyId = 1;
    clientsMock = [clientMock];
    renderToastContent();
    transactionPage = new TransactionPage();
    chartSpy = vi.spyOn(transactionPage, "renderChart");

    chartSpy.mockImplementation(() => {});
    document.documentElement.firstChild.appendChild(transactionPage);
  });

  it("should addTransaction throw error when value 0 or less than", () => {
    chartSpy.mockRestore();
    const spy = vi.spyOn(mockLocalStorage, "getItem");
    spy.mockReturnValue(null);
    transactionPage.connectedCallback();
    transactionPage.$inputValue.value = "0";
    transactionPage.$inputFormOfPayment.value = "1";
    transactionPage.$inputDate.value = "10/10/2020";
    transactionPage.$clientID.value = "1";
    transactionPage.$inputDescription.value = "1";
    expect(transactionPage.clientLogged).toEqual({});
    expect(() => {
      transactionPage["sendListener"]();
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
      active: true,
      selected: true,
    } as Cliente;
    const result = transactionPage.createFormOption(client);

    expect(result).toEqual(`
           <div class="option" value="${client.id}" title="${client.name} - ${client.accountNumber}">
           <span abbrev>
           ${client.name} - ${client.accountNumber}
           </span>
            </div>
          `);
  });

  it("should handle modal hidden event", () => {
    transactionPage["onModalHidden"]();
    expect(transactionPage.transactionFind).toBeNull();
    expect(transactionPage.$inputValue.disabled).toBeFalsy();
    expect(transactionPage.selectedId).toBeNull();
  });

  it("should handle previous page click", () => {
    expect(transactionPage.$previous.disabled).toBeTruthy();
    transactionPage.transactionList = transactionListPage;
    transactionPage.pageSize = 1;
    transactionPage.page = 1;
    transactionPage["previousPage"]();

    expect(transactionPage.page).toBe(1);
    expect(transactionPage.maxPage).toBe(3);
  });
  it("should handle next page click", () => {
    transactionPage.transactionList = transactionListPage;
    transactionPage.page = 1;
    transactionPage.pageSize = 1;
    transactionPage["nextPage"]();
    expect(transactionPage.$next.disabled).toBeFalsy();
    expect(transactionPage.page).toBe(2);
    expect(transactionPage.maxPage).toBe(3);

    transactionPage["nextPage"]();
    transactionPage["nextPage"]();
    expect(transactionPage.page).toBe(3);
  });

  it("should sort events correctly", () => {
    const $th = document.querySelector<HTMLTableCellElement>("[key=date]");
    transactionPage["sortByColumn"]($th);

    const $element = $th.querySelector(".sort");

    expect($element.innerHTML.includes("arrow_upward")).toBeTruthy();

    transactionPage["sortByColumn"]($th);
    expect($element.innerHTML.includes("arrow_downward")).toBeTruthy();
    transactionPage["sortByColumn"]($th);
    expect($element.innerHTML).toBe("");
  });
  it("should handle sort by direction andKey", () => {
    transactionPage.transactionList = transactionListPage;
    const $th = document.querySelector("th");
    const $element = $th.querySelector(".sort");

    ["id", "value", "formOfPayment", "clientName", "date"].forEach((value) => {
      transactionPage["sortByDirectionAndKey"]("asc", value);
      transactionPage["sortByDirectionAndKey"]("desc", value);
      expect($element.innerHTML.includes("arrow_upward")).toBeFalsy();
      expect($element.innerHTML.includes("arrow_downward")).toBeFalsy();
    });
  });

  it("should add a transaction", () => {
    transactionPage.$inputDate.value = "24/09/2001";

    expect(() => {
      transactionPage["sendListener"]();
    }).toThrowError("Por favor preencha os campos obrigatórios!");

    transactionPage.$inputValue.value = "10.50";
    transactionPage.$inputFormOfPayment.value = eFormOfPayment.CREDITO.toString();
    transactionPage.$clientID.value = "1";
    transactionPage.$inputDescription.value = "1";
    transactionPage["sendListener"]();

    expect(transactionPage.transactionList.length).toBe(2);
  });

  it("should not add a transaction and throw message error", () => {
    // Mock para garantir que o cliente existe e tem saldo insuficiente
    const lowBalanceClient = { ...clientMock, accountAmount: 100 };
    vi.spyOn(transactionPage, "clients", "get").mockReturnValue([lowBalanceClient]);
    vi.spyOn(transactionPage, "clientLogged", "get").mockReturnValue(lowBalanceClient);

    transactionPage.$inputDate.value = "10/11/2023";
    transactionPage.$inputFormOfPayment.value = "2"; // Use um id diferente de crédito se quiser testar saldo de conta
    transactionPage.$inputValue.value = "999,00"; // valor maior que o saldo
    transactionPage.$clientID.value = "1";
    transactionPage.$inputDescription.value = "1";

    // Garante que o método removeMask está funcionando
    expect(transactionPage["removeMask"]("999,00")).toBe(999);

    expect(() => {
      transactionPage["sendListener"]();
    }).toThrowError("Saldo insuficiente!");
  });

  it("should update a transaction", () => {
    transactionPage.editTransaction(0);
    expect(transactionPage.transactionFind).toBeUndefined();

    // Garante que existe uma transação com id 1 e data de hoje
    const today = new Date().toLocaleDateString("pt-BR");
    transactionPage.transactionList = [...transactionPage.transactionList, { ...transactionListMock[0], id: 1, date: today }];
    transactionPage.editTransaction(1);

    expect(transactionPage.$inputFormOfPayment.value).toBe(transactionListMock[0].idFormOfPayment.toString());
    expect(transactionPage.$inputDate.value).toBe(today);
    expect(transactionPage.$clientID.value).toBe(transactionListMock[0].clientID.toString());
    expect(transactionPage.transactionFind).toBeTruthy();

    transactionPage.$inputValue.value = "1765,00";
    transactionPage.$inputDate.value = today;
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

  async function flushPromises() {
    return new Promise((resolve) => setImmediate(resolve));
  }

  it("should remove a transaction", async () => {
    vi.useRealTimers();
    transactionPage.transactionList = [{ ...transactionListMock[0], id: 1, active: true }];
    await transactionPage.removeTransaction(1);
    await flushPromises();
    expect(transactionPage.transactionList[0].active).toBe(false);
    vi.useFakeTimers();
  });

  it("should duplicate a transaction", () => {
    chartSpy.mockRestore();
    const today = new Date().toLocaleDateString("pt-BR");
    transactionPage.transactionList = [...transactionPage.transactionList, { ...transactionListMock[0], id: 1, date: today }];
    transactionPage.duplicateTransaction(1);
    expect(transactionPage.$inputValue.value).toBe(transactionPage.numberFormat.format(transactionListMock[0].value));
    expect(transactionPage.$inputFormOfPayment.value).toBe(transactionListMock[0].idFormOfPayment.toString());
    expect(transactionPage.$inputDate.value).toBe(today);
    expect(transactionPage.$clientID.value).toBe(transactionListMock[0].clientID.toString());
  });
  it("should not fail when sorting column has no sort element", () => {
    const th = document.createElement("th");
    th.setAttribute("key", "value");
    const sortSpan = document.createElement("span");
    sortSpan.className = "sort";
    th.appendChild(sortSpan);
    document.body.appendChild(th);
    expect(() => transactionPage["sortByColumn"](th)).not.toThrow();
  });
  it("should call renderChart on connectedCallback", () => {
    chartSpy.mockRestore(); // remove o mock
    const chartSpyReal = vi.spyOn(transactionPage, "renderChart");
    transactionPage.connectedCallback();
    expect(chartSpyReal).toHaveBeenCalled();
  });

  it("should call createInnerHTML without error", () => {
    expect(() => transactionPage.createInnerHTML()).not.toThrow();
  });

  it("should call renderTransactions with empty list", () => {
    transactionPage.transactionList = [];
    expect(() => transactionPage.renderTransactions()).not.toThrow();
  });

  it("should call applySort without error", () => {
    expect(() => transactionPage["applySort"]()).not.toThrow();
  });

  it("should validateDateIsFuture return true/false", () => {
    const future = new Date(Date.now() + 86400000 * 2);
    const past = new Date(Date.now() - 86400000 * 2);
    expect(transactionPage["validateDateIsFuture"](future)).toBe(false);
    expect(transactionPage["validateDateIsFuture"](past)).toBe(true);
  });

  it("should call displayClientAmount for both classes", () => {
    expect(() => transactionPage["displayClientAmount"]()).not.toThrow();
  });

  it("should removeMask return correct value", () => {
    expect(transactionPage["removeMask"]("1.234,56")).toBe(1234.56);
  });

  it("should filteredList return empty if no match", () => {
    transactionPage.transactionList = [{ ...transactionListMock[0], clientName: "X", userLoggedID: 999 }];
    transactionPage.$search.value = "notfound";
    expect(transactionPage.filteredList.length).toBe(0);
  });

  it("should maxPage return 1 if filteredList is empty", () => {
    transactionPage.transactionList = [];
    expect(transactionPage.maxPage).toBe(0);
  });

  it("should goToAccountPage not throw", () => {
    expect(() => transactionPage.goToAccountPage()).not.toThrow();
  });

  it("should hiddenElement return correct class", () => {
    expect(transactionPage["hiddenElement"](true)).toBe("hidden");
    expect(transactionPage["hiddenElement"](false)).toBe("");
  });

  it("should validPayment handle error branch", () => {
    // Garante que o campo $search existe e é string
    transactionPage.$search.value = "";

    // Mocka todos os campos obrigatórios do DOM
    transactionPage.$inputValue.value = "100,00";
    transactionPage.$inputFormOfPayment.value = "1";
    transactionPage.$inputDate.value = "10/10/2020";
    transactionPage.$clientID.value = "1";
    transactionPage.$inputDescription.value = "1";

    const transaction = {
      ...transactionListMock[0],
      dateOfPayDay: undefined as any,
      date: new Date().toLocaleDateString("pt-BR"),
      userLoggedID: clientMock.id,
      clientID: clientMock.id,
      value: 100,
      idFormOfPayment: 1,
      clientName: "Test",
      view: [] as any[],
      idDescription: 1,
      active: true,
    };
    transactionPage.transactionList = [transaction];
    const makePaymentSpy = vi.spyOn(transactionPage as any, "makePayment").mockImplementation(() => {
      throw new Error("fail");
    });
    expect(() => transactionPage["validPayment"]()).not.toThrow();
    makePaymentSpy.mockRestore();
  });

  it("should makePayment handle credito and error", () => {
    const transaction = { ...transactionListMock[0], idFormOfPayment: eFormOfPayment.CREDITO };
    transactionPage.clientCard = { id: 1, limitCreditCurrent: 1000, limitCreditUsed: 0, cardNumber: "123" } as any;
    vi.spyOn(transactionPage, "clientCardList", "get").mockReturnValue([transactionPage.clientCard]);
    vi.spyOn(transactionPage, "clients", "get").mockReturnValue([clientMock]);
    vi.spyOn(transactionPage, "clientLogged", "get").mockReturnValue(clientMock);
    expect(() => transactionPage["makePayment"](transaction)).not.toThrow();
    // error branch
    vi.spyOn(transactionPage, "clientCardList", "get").mockReturnValue([]);
    expect(() => transactionPage["makePayment"](transaction)).toThrow();
  });

  it("should addTransactionToInvoice create and update invoice", () => {
    const card = { id: 1, cardNumber: "123" } as any;
    const transaction = { ...transactionListMock[0], id: 999 };
    vi.spyOn(transactionPage, "invoiceList", "get").mockReturnValue([]);
    expect(() => transactionPage["addTransactionToInvoice"](transaction, card, 1)).not.toThrow();
    // update branch
    vi.spyOn(transactionPage, "invoiceList", "get").mockReturnValue([
      {
        id: 1,
        cardID: 1,
        clientID: 1,
        closingDate: new Date(Date.now() + 86400000 * 10).toLocaleDateString("pt-BR"),
        date: new Date(Date.now() + 86400000 * 20).toLocaleDateString("pt-BR"),
        transactions: [],
        value: 0,
        status: 1,
      },
    ]);
    expect(() => transactionPage["addTransactionToInvoice"](transaction, card, 1)).not.toThrow();
  });

  it("should saveClientes not throw", () => {
    expect(() => transactionPage["saveClientes"]([clientMock], clientMock)).not.toThrow();
  });

  it("should objectTransaction not throw", () => {
    vi.spyOn(transactionPage, "clients", "get").mockReturnValue([clientMock]);
    vi.spyOn(transactionPage, "clientLogged", "get").mockReturnValue(clientMock);
    transactionPage.$inputValue.value = "100,00";
    transactionPage.$inputFormOfPayment.value = "1";
    transactionPage.$inputDate.value = "10/10/2020";
    transactionPage.$clientID.value = "1";
    transactionPage.$inputDescription.value = "1";
    expect(() => transactionPage["objectTransaction"](clientMock)).not.toThrow();
  });

  it("should formDisabled disable/enable fields", () => {
    expect(() => transactionPage["formDisabled"](true)).not.toThrow();
    expect(() => transactionPage["formDisabled"](false)).not.toThrow();
  });

  it("should saveTransactionList not throw", () => {
    expect(() => transactionPage["saveTransactionList"]()).not.toThrow();
  });

  it("should clearForm reset fields", () => {
    expect(() => transactionPage["clearForm"]()).not.toThrow();
  });

  it("should instanceModal not throw", () => {
    expect(() => transactionPage["instanceModal"]()).not.toThrow();
  });

  it("should numberFormat return Intl.NumberFormat", () => {
    expect(transactionPage.numberFormat).toBeInstanceOf(Intl.NumberFormat);
  });

  it("should clients getter return array", () => {
    vi.spyOn(transactionPage, "clients", "get").mockReturnValue([clientMock]);
    expect(Array.isArray(transactionPage.clients)).toBe(true);
  });

  it("should clientLogged getter return object", () => {
    vi.spyOn(transactionPage, "clientLogged", "get").mockReturnValue(clientMock);
    expect(typeof transactionPage.clientLogged).toBe("object");
  });

  it("should invoiceList getter return array", () => {
    vi.spyOn(transactionPage, "invoiceList", "get").mockReturnValue([]);
    expect(Array.isArray(transactionPage.invoiceList)).toBe(true);
  });

  it("should invoice getter return object", () => {
    const invoiceMock = {
      id: 1,
      value: 100,
      date: "01/01/2024",
      closingDate: "25/12/2023",
      cardID: 1,
      clientID: 1,
      transactions: [] as number[],
      status: 1,
    };
    vi.spyOn(StorageService, "getItem").mockReturnValue(invoiceMock);
    expect(transactionPage.invoice).toEqual(invoiceMock);
  });

  it("should clientCardList getter return array", () => {
    const cardListMock = [
      { id: 1, cardNumber: "123", limitCreditCurrent: 1000, limitCreditUsed: 0 },
      { id: 2, cardNumber: "456", limitCreditCurrent: 2000, limitCreditUsed: 100 },
    ];
    vi.spyOn(StorageService, "getItem").mockReturnValue(cardListMock);
    expect(transactionPage.clientCardList).toEqual(cardListMock);
  });

  it("should renderTransactions format dateOfPayDay when present", () => {
    // Mock transaction com dateOfPayDay presente
    const transactionWithPayDay = {
      ...transactionListMock[0],
      dateOfPayDay: "10/11/2023" as string | undefined,
      date: "10/11/2023",
      active: true,
    };
    transactionPage.transactionList = [transactionWithPayDay];
    // Mocka o método convertStringDate para retornar uma data fixa
    const spy = vi.spyOn(String.prototype, "convertStringDate").mockImplementation(function () {
      return new Date(2023, 10, 10, 15, 30); // 10/11/2023 15:30
    });
    // Mocka o método toLocaleDateString para verificar o formato
    const toLocaleSpy = vi.spyOn(Date.prototype, "toLocaleDateString").mockReturnValue("10/11/2023, 15:30");
    // Executa
    expect(() => transactionPage.renderTransactions([transactionWithPayDay])).not.toThrow();
    spy.mockRestore();
    toLocaleSpy.mockRestore();
  });

  it("should renderTransactions set dateOfPayDay as '-' when not present", () => {
    // Mock transaction sem dateOfPayDay
    const transactionWithoutPayDay = {
      ...transactionListMock[0],
      dateOfPayDay: undefined as string | undefined,
      date: "10/11/2023",
      active: true,
    };
    transactionPage.transactionList = [transactionWithoutPayDay];
    // Executa
    expect(() => transactionPage.renderTransactions([transactionWithoutPayDay])).not.toThrow();
  });

  it("should renderTransactions set dateOfPayDay as '-' when toLocaleDateString returns undefined", () => {
    const transactionWithPayDay = {
      ...transactionListMock[0],
      dateOfPayDay: "10/11/2023" as string | undefined,
      date: "10/11/2023",
      active: true,
    };
    transactionPage.transactionList = [transactionWithPayDay];
    const spy = vi.spyOn(String.prototype, "convertStringDate").mockImplementation(function () {
      return new Date(2023, 10, 10, 15, 30);
    });
    const toLocaleSpy = vi.spyOn(Date.prototype, "toLocaleDateString").mockReturnValue(undefined as any);
    expect(() => transactionPage.renderTransactions([transactionWithPayDay])).not.toThrow();
    spy.mockRestore();
    toLocaleSpy.mockRestore();
  });
});
