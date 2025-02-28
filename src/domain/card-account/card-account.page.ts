import { Carousel } from "../../components/carousel/carousel";
import { StorageService } from "../../components/storage/storage";
import { Toasts } from "../../components/toasts/toast";
import { generatePropertyBind } from "../../functions/property-bind";
import { Cliente } from "../auth/interface/client.interface";
import html from "./card-account.page.html?raw";
import "./card-account.page.scss";
import { CardClient } from "./interface/card-client";
export class CardAccountPage extends HTMLElement {
  clientCardList: CardClient[];
  client: Cliente;
  clientCard: CardClient;

  $buttonAdd: HTMLButtonElement;
  $inputRange: HTMLInputElement;
  $cards: HTMLElement;
  $availableCreditValue: HTMLElement;
  $usedCreditValue: HTMLElement;
  $creditValue: HTMLElement;
  $menu: HTMLElement;
  $deleteNotification: HTMLElement;

  carousel: Carousel;
  connectedCallback() {
    this.client = StorageService.getItem<Cliente>("client", {} as Cliente);
    this.clientCardList = StorageService.getItem<CardClient[]>("listOfCards", []);
    this.clientCard = StorageService.getItem<CardClient>("cardClient", {} as CardClient);

    this.createInnerHTML();
    this.recoveryElementRef();
    this.createCardCredit();
    this.updateCreditLimit();

    if (this.clientCard.clientID !== this.client.id) {
      StorageService.removeItem("cardClient");
      this.clientCard = {} as CardClient;
      this.resetCreditValues();
    }
    this.carousel = new Carousel(".card-container", ".previous", ".next");
  }

  private createInnerHTML() {
    generatePropertyBind.bind(this, html)();
  }

  recoveryElementRef() {
    this.$buttonAdd = document.querySelector(".circle .add-card-credit");
    this.$cards = document.querySelector(".card-container .cards");

    this.$creditValue = document.querySelector(".limit-credit-value");
    this.$usedCreditValue = document.querySelector(".limit-credit-used");
    this.$availableCreditValue = document.querySelector(".available-credit-value");
    this.$inputRange = document.querySelector("input[type='range']");
    this.$menu = document.querySelector(".menu-notification");
    this.$deleteNotification = document.querySelector(".delete-notification");
    this.sendListener();
  }

  private sendListener() {
    this.$buttonAdd.addEventListener("click", () => {
      if (!this.client.id) return Toasts.error("selecione uma conta");
      this.addCardClient();
      this.createCardCredit();
    });

    this.rangeListener();
    this.setRangeColor();
  }

  private rangeListener() {
    this.$inputRange.addEventListener("input", () => {
      if (!this.clientCard.id) {
        Toasts.error("Nenhum cartão selecionado. Por favor, selecione um cartão primeiro.");
        return;
      }
      const formRangeValue = +this.$inputRange.value;
      const limitCredit = +this.$inputRange.value - this.clientCard.limitCreditUsed;
      const usedCreditValue = this.clientCard.limitCreditUsed;

      this.$usedCreditValue.textContent = usedCreditValue.formatToBRL();
      this.$availableCreditValue.textContent = limitCredit.formatToBRL();

      this.$creditValue.textContent = formRangeValue.formatToBRL();

      const client = this.clientCardList.find((card) => card.id === this.clientCard.id);
      this.clientCard = client;
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

  createCardCredit() {
    this.$cards.innerHTML = "";
    const cardCredit = this.clientCardList.filter((card) => card.clientID == this.client.id);

    cardCredit.forEach((card) => {
      const isActiveClass = card.selected ? "selected" : "";
      this.$cards.innerHTML += `
      <div class="card-credit ${isActiveClass}" style="background: ${card.color}">
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

  private onCardClick($creditCard: HTMLElement) {
    const cards = [...this.$cards.children];

    cards.forEach((card) => {
      card.classList.remove("selected");
    });
    const index = cards.findIndex((element) => element == $creditCard);
    $creditCard.classList.add("selected");

    const cardCredit = this.clientCardList.filter((card) => card.clientID == this.client.id);
    cardCredit.forEach((card) => (card.selected = false));
    cardCredit[index].selected = true;

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
      selected: false,
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
    this.$creditValue.textContent = (0).formatToBRL();
    this.$usedCreditValue.textContent = (0).formatToBRL();
    this.$availableCreditValue.textContent = (0).formatToBRL();
    this.$inputRange.value = "0";

    this.setRangeColor();
  }

  private updateCreditLimit() {
    if (!this.clientCard.id) {
      this.resetCreditValues();
      return;
    }

    const { limitCredit, limitCreditCurrent, limitCreditUsed } = this.clientCard;
    this.$creditValue.textContent = limitCredit.formatToBRL();
    this.$availableCreditValue.textContent = limitCreditCurrent.formatToBRL();
    this.$usedCreditValue.textContent = limitCreditUsed.formatToBRL();
    this.$inputRange.value = limitCredit.toString();

    this.setRangeColor();
  }

  private setStorage() {
    StorageService.setItem("listOfCards", this.clientCardList);
    StorageService.setItem("cardClient", this.clientCard);
  }
}
