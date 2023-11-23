import { beforeEach, describe, expect, it, vi } from "vitest";
import { Toasts } from "./toast";

export function createElementWithClass(elementName: string, ...classList: string[]) {
  const $element = document.createElement(elementName);
  $element.classList.add(...classList);
  return $element;
}
export function createElementWithID(elementName: string, id: string) {
  const $element = document.createElement(elementName);
  $element.id = id;
  return $element;
}

export function renderToastContent() {
  const $toast = document.querySelector("#toast-content");
  if ($toast) return $toast;
  const $divContent = createElementWithID("div", "toast-content");
  document.documentElement.firstChild.appendChild($divContent);
}

describe("Toasts", () => {
  beforeEach(() => {
    renderToastContent();
    vi.useFakeTimers();
  });

  it("should create toast", () => {
    const mock = {
      className: "test-toast",
      description: "teste",
      icon: "iconTeste",
    };

    Toasts.createToast(mock.className, mock.description, mock.icon);

    const $toastContainer = document.querySelector<HTMLDivElement>("#toast-content");
    const $icon = document.querySelector<HTMLDivElement>(".toast-body .material-symbols-outlined");
    const $toastText = document.querySelector<HTMLDivElement>(".toast-text");

    expect($toastContainer.children.length).toBe(1);
    expect($icon.innerHTML.trim()).toEqual(mock.icon);
    expect($toastText.innerHTML.trim()).toEqual(mock.description);
    expect($toastContainer.children[0].className).toBe(`toast align-items-center ${mock.className} fade show showing`);
    vi.runAllTimers();
  });

  it("should create success toast", () => {
    const mock = {
      description: "teste",
      icon: "iconTeste",
    };

    Toasts.success(mock.description, mock.icon);

    const $toastContainer = document.querySelector<HTMLDivElement>("#toast-content");
    const $icon = document.querySelector<HTMLDivElement>(".toast-body .material-symbols-outlined");
    const $toastText = document.querySelector<HTMLDivElement>(".toast-text");

    expect($toastContainer.children.length).toBe(1);
    expect($icon.innerHTML.trim()).toBe(mock.icon);
    expect($toastText.innerHTML.trim()).toBe(mock.description);
    expect($toastContainer.children[0].className).toBe("toast align-items-center text-bg-success fade show showing");
    vi.runAllTimers();
  });
  it("should create error toast", () => {
    const mock = {
      description: "teste",
      icon: "iconTeste",
    };

    Toasts.error(mock.description, mock.icon);

    const $toastContainer = document.querySelector<HTMLDivElement>("#toast-content");
    const $icon = document.querySelector<HTMLDivElement>(".toast-body .material-symbols-outlined");
    const $toastText = document.querySelector<HTMLDivElement>(".toast-text");

    expect($toastContainer.children.length).toBe(1);
    expect($icon.innerHTML.trim()).toBe(mock.icon);
    expect($toastText.innerHTML.trim()).toBe(mock.description);
    expect($toastContainer.children[0].className).toBe("toast align-items-center text-bg-danger fade show showing");
  });
});
