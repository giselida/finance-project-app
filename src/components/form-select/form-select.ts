export class FormSelect extends HTMLElement {
  options: HTMLElement[];
  _value: string;
  $backdrop: HTMLElement;

  set value(value) {
    this._value = value;
    this.setAttribute("value", this._value);
  }

  get value() {
    return this._value;
  }

  connectedCallback() {
    this.classList.add("form-select");

    this.options = [...this.children] as HTMLElement[];

    this.innerHTML = this.getAttribute("placeholder") ?? "Selecione ...";

    this.addEventListener("click", () => {
      this.$backdrop = document.querySelector<HTMLElement>(".backdrop");
      if (!this.$backdrop) {
        this.createBackdrop();
        return;
      }
      this.$backdrop?.remove();
    });

    document.querySelector("html").addEventListener("click", (event) => {
      this.stopPropagation(event);
      const item = event.target as HTMLElement;
      if (item.tagName != "FORM-SELECT") {
        this.$backdrop?.remove();
      }
    });
  }

  private stopPropagation(event: MouseEvent) {
    event.stopPropagation();
    event.stopImmediatePropagation();
  }

  createBackdrop() {
    this.$backdrop = document.createElement("div");
    this.$backdrop.classList.add("backdrop");
    this.options
      .map((value) => {
        return value.cloneNode(true) as HTMLElement;
      })
      .forEach((value) => {
        this.changeOption(value, this.$backdrop);
        this.$backdrop.appendChild(value);
      });

    this.append(this.$backdrop);
    this.$backdrop.focus();
  }

  changeOption($element: HTMLElement, $backdrop: HTMLElement) {
    $element.addEventListener("click", (event) => {
      this.stopPropagation(event);

      const option = event.target as HTMLElement;
      this.innerHTML = option.innerHTML;
      this.value = option.getAttribute("value");

      this.dispatchEvent(new Event("change"));

      $backdrop.remove();
    });
  }
}
