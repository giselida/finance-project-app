export class FormSelect extends HTMLElement {
  options: HTMLElement[];
  _value: string;
  $backdrop: HTMLElement;

  set value(value) {
    this._value = value;
    this.setAttribute("value", this._value);
    this.classList.remove("is-valid");
    this.classList.remove("is-invalid");
    if (!value) {
      if (this.getAttribute("required") != null) {
        this.classList.add("is-invalid");
        this.classList.remove("is-valid");
      }
      this.innerHTML = this.getAttribute("placeholder") ?? "Selecione ...";
    } else {
      const optionSelected = this.options.find((option) => option.getAttribute("value") === this.getAttribute("value"));
      if (optionSelected) {
        this.innerHTML = optionSelected.innerHTML;
        if (this.getAttribute("required") != null) {
          this.classList.remove("is-invalid");
          this.classList.add("is-valid");
        }
      }
    }
  }
  get value() {
    return this._value;
  }

  get hasSearch() {
    let hasSearch = false;

    try {
      hasSearch = JSON.parse(this.getAttribute("search"));
    } catch {
      hasSearch = false;
    }
    return hasSearch;
  }

  connectedCallback() {
    this.classList.add("form-select");

    this.options = [...this.children] as HTMLElement[];

    this.value = this.getAttribute("value");

    this.addEventListener("click", () => {
      this.$backdrop = document.querySelector<HTMLElement>(".backdrop");
      if (!this.$backdrop) {
        this.createBackdrop();
        return;
      }
      if (!this.hasSearch) this.$backdrop?.remove();
    });

    document.querySelector("html").addEventListener("click", (event) => {
      this.stopPropagation(event);
      const item = event.target as HTMLElement;
      if (item.tagName != "FORM-SELECT" && item.tagName != "INPUT") {
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
    if (this.hasSearch) {
      this.$backdrop.innerHTML = `
      <input class="search-input" />
      `;
    }
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
    const $searchInput = document.querySelector<HTMLInputElement>(".search-input");
    $searchInput?.addEventListener(
      "input",
      this.debounceEvent(() => {
        const inputValue = $searchInput.value?.toLowerCase();
        const options = this.$backdrop.querySelectorAll(".option");
        options.forEach((element) => element.remove());
        this.options
          .map((value) => {
            return value.cloneNode(true) as HTMLElement;
          })
          .forEach((value) => {
            const elementValue = value.getAttribute("value")?.toLowerCase();
            if (elementValue.includes(inputValue)) {
              this.changeOption(value, this.$backdrop);
              this.$backdrop.appendChild(value);
            }
          });
      }, 500)
    );
    this.$backdrop.focus();
    if (this.hasSearch) {
      $searchInput.focus();
    }
  }

  changeOption($element: HTMLElement, $backdrop: HTMLElement) {
    $element.addEventListener("click", (event) => {
      this.stopPropagation(event);

      const option = event.target as HTMLElement;
      this.innerHTML = option.innerHTML;
      this.value = option.getAttribute("value");

      this.classList.remove("is-valid");
      this.classList.remove("is-invalid");

      const method = this.getAttribute("required") != null ? "add" : "remove";
      const className = this.value ? "is-valid" : "is-invalid";
      this.classList[method](className);

      this.dispatchEvent(new Event("change"));

      $backdrop.remove();
    });
  }
  debounceEvent(callback: any, timeout: number) {
    let timer: any;

    return () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        callback();
      }, timeout);
    };
  }
}
