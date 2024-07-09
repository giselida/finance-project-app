import { Toasts } from "../../components/toasts/toast";
import { Cliente } from "../account/account.page";
import "./card-account.page.scss";
import { CardClient } from "./interface/card-client";

const template = `
<div class="card">
  <div class="card-header">Cartões</div>
  <div class="card-body">
    <h5 class="card-title">Meus Cartões</h5>
    <div class="carousel">
      <button class="previous" hidden  >
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
`;

export class CardAccountPage extends HTMLElement {
  clientCardList: CardClient[];
  client: Cliente;
  clientCard: CardClient;

  $buttonAdd: HTMLButtonElement;
  $carousel: HTMLElement;
  $container: HTMLElement;
  $cards: HTMLElement;
  $previous: HTMLButtonElement;
  $next: HTMLButtonElement;
  scrollAmount: number = 250;

  connectedCallback() {
    this.client = JSON.parse(localStorage.getItem("client") ?? "{}");
    this.clientCardList = JSON.parse(localStorage.getItem("cardClients") ?? "[]");
    this.innerHTML = template;
    this.recoveryElementRef();
    this.createCardCredit();
    this.checkBUttonVisible();
  }

  private checkBUttonVisible() {
    if (!this.$cards?.children || !this.$cards.children[0]) return;
    const $creditCard = this.$cards.children[0];
    const width = $creditCard.clientWidth * this.$cards.children.length;
    const isGreater = width <= this.$container.clientWidth - 225;
    this.$previous.hidden = isGreater;
    this.$next.hidden = isGreater;
  }

  recoveryElementRef() {
    this.$carousel = document.querySelector(".carousel");
    this.$container = document.querySelector(".card-container");
    this.$cards = document.querySelector(".card-container .cards");
    this.$previous = document.querySelector(".previous");
    this.$next = document.querySelector(".next");
    this.$buttonAdd = document.querySelector(".circle .add-card-credit");

    this.sendListener();
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
  }

  private scrollNext() {
    this.$container.scrollBy({ left: this.scrollAmount, behavior: "smooth" });
  }

  private scrollPrevious() {
    this.$container.scrollBy({ left: -this.scrollAmount, behavior: "smooth" });
  }

  createCardCredit() {
    this.$cards.innerHTML = "";
    this.clientCardList.forEach((card) => {
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
    console.log($creditCards);
    $creditCards.forEach(($creditCard) => {
      const [flip, front, back] = $creditCard.children;
      const htmlFront = front as HTMLElement;
      const htmlBack = back as HTMLElement;

      flip.addEventListener("click", () => {
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
      });

      $creditCard.addEventListener("click", () => {
        this.onCardClick($creditCard);
      });
    });
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
  }

  private generateRandomColor(): string {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
    };

    this.clientCardList.push(objectClient);
    localStorage.setItem("cardClients", JSON.stringify(this.clientCardList));
  }
}
