export class FormSelect extends HTMLElement {
  options: HTMLElement[];
  _value: string;
  $backdrop: HTMLElement;
  _disabled: boolean;

  set disabled(value) {
    this._disabled = value;
    this.setAttribute("disabled", `${this._disabled}`);
  }
  get disabled() {
    return this._disabled;
  }
  set value(value) {
    this.classList.remove("is-valid");
    this.classList.remove("is-invalid");

    const isInvalidMethod = !value ? "add" : "remove";
    const isValidMethod = !value ? "remove" : "add";

    if (this.getAttribute("required") != null) {
      this.classList[isInvalidMethod]("is-invalid");
      this.classList[isValidMethod]("is-valid");
    }

    this._value = value;
    this.setAttribute("value", this._value);

    if (!value) {
      this.innerHTML = this.getAttribute("placeholder") ?? "Selecione ...";
    } else {
      const optionSelected = this.options.find((option) => option.getAttribute("value") === this.getAttribute("value"));
      if (optionSelected) {
        this.innerHTML = `
            <span abbrev class="selected-value">
            ${optionSelected.innerHTML}
           </span>
       `;
      }
      this.querySelector(".selected-value")?.addEventListener("click", (event) => {
        this.stopPropagation(event as MouseEvent);
        this.onclick();
      });
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

    document.documentElement.addEventListener("click", (event) => {
      this.stopPropagation(event);
      setTimeout(() => {
        this.$backdrop = document.querySelector<HTMLElement>(".backdrop");
        const item = event.target as HTMLElement;
        const isBackdrop = item.className?.includes && item.className.includes("backdrop");
        if (item.tagName != "FORM-SELECT" && item.tagName != "INPUT" && !isBackdrop) {
          this.$backdrop?.remove();
        }
      }, 50);
    });
    this.addEventListener("click", this.onclick);
  }

  onclick = () => {
    this.$backdrop = document.querySelector<HTMLElement>(".backdrop");
    if (this.disabled) return;

    if (!this.$backdrop) {
      this.createBackdrop();
      return;
    }
    if (!this.hasSearch) this.$backdrop?.remove();
  };

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
      this.innerHTML = $element.innerHTML;
      this.value = $element.getAttribute("value");
      this.classList.remove("is-valid");
      this.classList.remove("is-invalid");

      const method = this.getAttribute("required") != null ? "add" : "remove";
      const className = this.value ? "is-valid" : "is-invalid";
      this.classList[method](className);

      this.dispatchEvent(new Event("change"));

      $backdrop.remove();
    });
  }
  debounceEvent(callback: () => void, timeout: number) {
    let timer: NodeJS.Timeout;

    return () => {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        callback();
      }, timeout);
    };
  }
}
