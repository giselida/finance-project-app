import { Toasts } from "../../components/toasts/toast";
import { formatterBRL } from "../../functions/currencyFormatter/formatter.";
import { Cliente } from "../auth/interface/client.interface";
import "./card-account.page.scss";
import { CardClient } from "./interface/card-client";

export class CardAccountPage extends HTMLElement {
  clientCardList: CardClient[];
  client: Cliente;
  clientCard: CardClient;

  $buttonAdd: HTMLButtonElement;
  $previous: HTMLButtonElement;
  $next: HTMLButtonElement;

  $carousel: HTMLElement;
  $container: HTMLElement;
  $cards: HTMLElement;
  $usedCreditValue: HTMLElement;
  $creditValue: HTMLElement;

  $inputRange: HTMLInputElement;
  scrollAmount: number = 250;

  connectedCallback() {
    this.client = JSON.parse(localStorage.getItem("client") ?? "{}");
    this.clientCardList = JSON.parse(localStorage.getItem("listOfCards") ?? "[]");
    this.clientCard = JSON.parse(localStorage.getItem("cardClient") ?? "{}");

    this.createInnerHTML();
    this.recoveryElementRef();
    this.createCardCredit();
    this.updateCreditLimit();
    this.checkBUttonVisible();
    if (this.clientCard.clientID !== this.client.id) {
      localStorage.removeItem("cardClient");
      this.clientCard = {} as CardClient;
      this.resetCreditValues();
    }
  }

  private createInnerHTML() {
    const { limitCredit, limitCreditCurrent } = this.clientCard;
    const currencyFormatter = formatterBRL();
    this.innerHTML = `
<div class="card">
  <div class="card-header">Cartões</div>
  <div class="card-body">
    <h5 class="card-title">Meus Cartões</h5>
    <div class="carousel">
      <button class="previous" hidden>
        <span class="icon-previous">&laquo;</span>
      </button>
      <div class="card-container">
        <div class="card-credit first">
          <div class="circle">
            <span class="material-symbols-outlined add-card-credit">add</span>
          </div>
        </div>
        <div class="cards"></div>
      </div>
      <button class="next" hidden>
        <span class="icon-next">&raquo;</span>
      </button>
    </div>
  </div>
</div>

<div class="card limit">
  <div class="card-header">Limite de crédito</div>
  <div class="card-body">
    <div class="limit-credit">
      <label for="customRange1" class="form-label">Defina seu limite de Crédito</label>

      <div class="credit-value">
        <span class="info">Limite de crédito:</span>
        <span class="limit-credit-value"> ${currencyFormatter.format(limitCredit ?? 0)} </span>
        <span class="info">Limite de crédito disponível:</span>
        <span class="available-credit-value"> ${currencyFormatter.format(limitCreditCurrent ?? 0)} </span>
      </div>

      <div class="range">
        <input type="range" class="form" min="0" max="10000" value="${limitCredit ?? 0}" step="50" required />
      </div>
    </div>
  </div>
</div>

`;
  }

  recoveryElementRef() {
    this.$carousel = document.querySelector(".carousel");
    this.$container = document.querySelector(".card-container");
    this.$buttonAdd = document.querySelector(".circle .add-card-credit");
    this.$cards = document.querySelector(".card-container .cards");

    this.$previous = document.querySelector(".previous");
    this.$next = document.querySelector(".next");

    this.$creditValue = document.querySelector(".limit-credit-value");
    this.$usedCreditValue = document.querySelector(".available-credit-value");
    this.$inputRange = document.querySelector("input[type='range']");

    this.sendListener();
  }

  private checkBUttonVisible() {
    if (!this.$cards?.children?.[0]) return;
    const $creditCard = this.$cards.children[0];
    const width = $creditCard.clientWidth * this.$cards.children.length;
    const isGreater = width <= this.$container.clientWidth - 225;
    this.$previous.hidden = isGreater;
    this.$next.hidden = isGreater;
  }

  private sendListener() {
    this.$buttonAdd.addEventListener("click", () => {
      if (!this.client.id) return Toasts.error("selecione uma conta");
      this.addCardClient();
      this.createCardCredit();
      this.checkBUttonVisible();
    });

    this.$next.addEventListener("click", () => this.scrollNext());
    this.$previous.addEventListener("click", () => this.scrollPrevious());
    this.rangeListener();
    this.setRangeColor();
  }

  private rangeListener() {
    this.$inputRange.addEventListener("input", () => {
      if (!this.clientCard?.id) {
        Toasts.error("Nenhum cartão selecionado. Por favor, selecione um cartão primeiro.");
        return;
      }
      const formRangeValue = +this.$inputRange.value;
      const limitCredit = +this.$inputRange.value - this.clientCard.limitCreditUsed;

      const currencyFormatter = formatterBRL();
      this.$creditValue.textContent = `${currencyFormatter.format(formRangeValue)}`;
      this.$usedCreditValue.textContent = `${currencyFormatter.format(limitCredit)}`;

      const client = this.clientCardList.find((card) => card.id == this.clientCard.id);
      client.limitCredit = formRangeValue;
      client.limitCreditCurrent = limitCredit;

      this.setRangeColor();
      this.setStorage();
    });
  }

  private setRangeColor() {
    const { value, max } = this.$inputRange;
    const $range = document.querySelector<HTMLDivElement>(".range");
    const progress = (+value / +max) * 100;
    const barColor = "#FCD3E4";
    const primaryColor = "#FE5E71";
    const secondaryColor = "#bd3647";
    const secondaryBarColor = "#d5374a42";
    const limitProgress = (+value / +this.clientCard.limitCreditUsed) * 100;

    $range.style.setProperty("--width", `${this.clientCard.limitCreditUsed / 100}%`);

    $range.style.setProperty(
      "--input-range-color",
      `linear-gradient(to right, ${primaryColor} ${progress}%, ${primaryColor} ${progress}%, ${barColor} ${progress}%, ${barColor} 100%)`
    );

    $range.style.setProperty(
      "--limit-range-color",
      `linear-gradient(to right, ${secondaryColor} ${limitProgress}%, ${secondaryColor} ${limitProgress}%, ${secondaryBarColor} ${progress}%, ${secondaryBarColor} 100%)`
    );
  }

  private scrollNext() {
    this.$container.scrollBy({ left: this.scrollAmount, behavior: "smooth" });
  }

  private scrollPrevious() {
    this.$container.scrollBy({ left: -this.scrollAmount, behavior: "smooth" });
  }

  createCardCredit() {
    this.$cards.innerHTML = "";
    const cardCredit = this.clientCardList.filter((card) => card.clientID == this.client.id);

    cardCredit.forEach((card) => {
      this.$cards.innerHTML += `

   <div class="card-credit" style="background-color: ${card.color}">
          <div class="flip">
            <span class="material-symbols-outlined">forward</span>
          </div>
          <div class="card-content front">
            <div class="chip">
              <img src="https://raw.githubusercontent.com/dasShounak/freeUseImages/main/chip.png" alt="chip" />
            </div>
            <div class="number">${card.cardNumber}</div>
            <div class="information">
              <div class="name">${this.client.name ?? "N/A"}</div>
              <div class="date-valid">
                <div class="text">Valid</div>
                <div class="date">${card.validDate}</div>
              </div>
            </div>
          </div>
          <div class="card-content back">
            <div class="information">
              <div class="signature-name">${this.client.name ?? "N/A"}</div>
              <div class="cvv-content">
                <div class="text">Cvv</div>
                <div class="cvv">${card.cvv}</div>
              </div>
            </div>
          </div>
        </div>
       
      `;
    });

    const $creditCards = document.querySelectorAll<Element>(".card-credit:not(.first)") as NodeListOf<HTMLElement>;
    $creditCards.forEach(($creditCard) => {
      const [flip, front, back] = $creditCard.children;
      const htmlFront = front as HTMLElement;
      const htmlBack = back as HTMLElement;

      flip.addEventListener("click", () => {
        this.onFlipCard($creditCard, htmlBack, htmlFront);
      });

      $creditCard.addEventListener("click", () => {
        this.onCardClick($creditCard);
      });
    });
  }

  private onFlipCard($creditCard: HTMLElement, htmlBack: HTMLElement, htmlFront: HTMLElement) {
    $creditCard.classList.toggle("rotate");
    setTimeout(() => {
      if ($creditCard.className.includes("rotate")) {
        htmlBack.style.display = "flex";
        htmlFront.style.display = "none";
      } else {
        htmlBack.style.display = "none";
        htmlFront.style.display = "flex";
      }
    }, 200);
  }

  private onCardClick($creditCard: Element) {
    const cards = [...this.$cards.children];

    cards.forEach((card) => card.classList.remove("selected"));
    const index = cards.findIndex((element) => element == $creditCard);
    $creditCard.classList.add("selected");
    this.$container.scrollTo({
      left: $creditCard.clientWidth * index,
      behavior: "smooth",
    });
    const cardCredit = this.clientCardList.filter((card) => card.clientID == this.client.id);
    this.clientCard = cardCredit[index];
    this.updateCreditLimit();
    this.setStorage();
  }

  private addCardClient() {
    const random = (min: number = 10, max: number = 100) => Math.floor(Math.random() * (max - min) + min);
    const generateCvv = () => random(100, 999);

    const generateRandomValidDate = () => {
      const currentYear = new Date().getFullYear();
      const year = currentYear + 5;
      const month = ("0" + random(1, 13)).slice(-2);
      return `${month}/${year}`;
    };

    const objectClient: CardClient = {
      id: this.clientCardList.length + 1,
      cvv: generateCvv(),
      validDate: generateRandomValidDate(),
      cardNumber: `${random()}${random()} ${random()}${random()} ${random()}${random()} ${random()}${random()}`,
      limitCredit: 0,
      limitCreditUsed: 0,
      limitCreditCurrent: 0,
      color: this.generateRandomColor(),
      clientID: this.client.id,
    };

    this.clientCardList.push(objectClient);
    this.setStorage();
  }

  private generateRandomColor(): string {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  private resetCreditValues() {
    const currencyFormatter = formatterBRL();

    this.$creditValue.textContent = `${currencyFormatter.format(0)}`;
    this.$usedCreditValue.textContent = `${currencyFormatter.format(0)}`;
    this.$inputRange.value = "0";

    this.setRangeColor();
  }

  private updateCreditLimit() {
    if (!this.clientCard.id) {
      this.resetCreditValues();
      return;
    }

    const { limitCredit, limitCreditCurrent } = this.clientCard;
    const currencyFormatter = formatterBRL();

    this.$creditValue.textContent = `${currencyFormatter.format(limitCredit)}`;
    this.$usedCreditValue.textContent = `${currencyFormatter.format(limitCreditCurrent)}`;
    this.$inputRange.value = limitCredit.toString();

    this.setRangeColor();
  }

  private setStorage() {
    localStorage.setItem("listOfCards", JSON.stringify(this.clientCardList));
    localStorage.setItem("cardClient", JSON.stringify(this.clientCard));
  }
}
