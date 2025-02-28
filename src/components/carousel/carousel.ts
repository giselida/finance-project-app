export class Carousel {
  private $container: HTMLElement;
  private $previous: HTMLButtonElement;
  private $next: HTMLButtonElement;
  private scrollAmount: number;

  constructor(containerSelector: string, previousSelector: string, nextSelector: string, scrollAmount = 250) {
    this.$container = document.querySelector(containerSelector);
    this.$previous = document.querySelector(previousSelector);
    this.$next = document.querySelector(nextSelector);
    this.scrollAmount = scrollAmount;

    if (!this.$container || !this.$previous || !this.$next) {
      console.error("Erro: Um ou mais elementos do carrossel não foram encontrados.");
      return;
    }

    this.init();
  }

  private init() {
    this.checkButtonVisibility();
    this.$next.addEventListener("click", () => this.scrollNext());
    this.$previous.addEventListener("click", () => this.scrollPrevious());
    window.addEventListener("resize", () => this.checkButtonVisibility());
  }

  private scrollNext() {
    this.$container.scrollBy({ left: this.scrollAmount, behavior: "smooth" });
  }

  private scrollPrevious() {
    this.$container.scrollBy({ left: -this.scrollAmount, behavior: "smooth" });
  }

  private checkButtonVisibility() {
    if (!this.$container.children.length) return;
    const totalWidth = Array.from(this.$container.children).reduce((sum, child) => sum + (child as HTMLElement).clientWidth, 0);
    const isScrollable = totalWidth > this.$container.clientWidth;

    this.$previous.hidden = !isScrollable;
    this.$next.hidden = !isScrollable;
  }
}
