import { Toast } from "bootstrap";
export class Toasts {
  static successToast(description: string, icon = "check_circle") {
    return Toasts.createToast("text-bg-success", description, icon);
  }
  static createToast(className: string, description: string, icon: string) {
    const $div = document.createElement("div");
    $div.classList.add("toast", "align-items-center", className);
    $div.innerHTML = `
        <div class="d-flex">
        <div class="toast-body">
        <span class="material-symbols-outlined">
         ${icon}
         </span>
    ${description}
      </div>
    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  `;
    const $toasts = document.querySelector("#toast-content");
    $toasts.append($div);
    const instanceBootstrap = Toast.getOrCreateInstance($div);
    instanceBootstrap.show();
  }
}
