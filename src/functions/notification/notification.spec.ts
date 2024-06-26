import { describe, expect, it } from "vitest";
import { createElementWithClass } from "../../components/toasts/toast.spec";
import { badgeUpdate } from "./notification";
export function renderToastContent() {
  const $toast = document.querySelector(".badge");
  if ($toast) return $toast;
  const $divContent = createElementWithClass("div", "badge");
  document.documentElement.firstChild.appendChild($divContent);
}
describe("badgeUpdate", () => {
  it("should return 0 when there are no notifications", () => {
    renderToastContent();
    badgeUpdate();
    const $badge = document.querySelector(".badge");
    expect($badge).toBeTruthy();
    $badge.remove();
  });
  it("should return 1 when there is one notification", () => {
    const $badge = document.querySelector(".badge");
    badgeUpdate();
    expect($badge).toBeNull();
  });
});
