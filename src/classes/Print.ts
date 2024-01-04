import { HasPrint } from "../interfaces/HasPrint.js";

export class Print implements HasPrint {
  constructor(private element: HTMLDivElement) {}

  print(): void {
    this.element.innerHTML = document.body.innerHTML;
    window.print();
  }
}
