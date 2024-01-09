import { HasHtmlFormat } from "../interfaces/HasHtmlFormat.js";
import { HasPrint } from "../interfaces/HasPrint.js";
import { HasRender } from "../interfaces/HasRender.js";
import { Datas } from "./Datas.js";
import { Display } from "./Display.js";
import { Print } from "./Print.js";

export class FormInput {
  form: HTMLFormElement;
  type: HTMLSelectElement;
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  address: HTMLInputElement;
  country: HTMLInputElement;
  town: HTMLInputElement;
  zip: HTMLInputElement;
  product: HTMLInputElement;
  price: HTMLInputElement;
  quantity: HTMLInputElement;
  tva: HTMLInputElement;
  docContainer: HTMLDivElement;
  hiddenDiv: HTMLDivElement;
  btnPrint: HTMLButtonElement;
  btnReload: HTMLButtonElement;
  btnStoredInvoices: HTMLButtonElement;
  btnStoredEstimates: HTMLButtonElement;
  storedEl: HTMLDivElement;

  constructor() {
    this.form = document.getElementById("form") as HTMLFormElement;
    this.type = document.getElementById("type") as HTMLSelectElement;
    this.firstName = document.getElementById("firstname") as HTMLInputElement;
    this.lastName = document.getElementById("lastName") as HTMLInputElement;
    this.address = document.getElementById("address") as HTMLInputElement;
    this.country = document.getElementById("country") as HTMLInputElement;
    this.town = document.getElementById("town") as HTMLInputElement;
    this.zip = document.getElementById("zip") as HTMLInputElement;
    this.product = document.getElementById("product") as HTMLInputElement;
    this.price = document.getElementById("price") as HTMLInputElement;
    this.quantity = document.getElementById("quantity") as HTMLInputElement;
    this.tva = document.getElementById("tva") as HTMLInputElement;

    this.docContainer = document.getElementById(
      "document-container"
    ) as HTMLDivElement;
    this.hiddenDiv = document.getElementById("hiddenDiv") as HTMLDivElement;
    this.storedEl = document.getElementById("stored-data") as HTMLDivElement;

    this.btnPrint = document.getElementById("print") as HTMLButtonElement;
    this.btnReload = document.getElementById("reload") as HTMLButtonElement;
    this.btnStoredInvoices = document.getElementById(
      "stored-invoices"
    ) as HTMLButtonElement;
    this.btnStoredEstimates = document.getElementById(
      "stored-estimates"
    ) as HTMLButtonElement;

    // Listener
    this.submitFormListener();
    this.printListener(this.btnPrint, this.docContainer);
    this.deleteListener(this.btnReload);
    this.getStoredDocsListener();
  }

  // Listeners
  private submitFormListener(): void {
    this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
  }

  private printListener(
    btn: HTMLButtonElement,
    docContainer: HTMLDivElement
  ): void {
    btn.addEventListener("click", (e: Event) => {
      let avaliableDoc: HasPrint;
      avaliableDoc = new Print(docContainer);
      avaliableDoc.print();
    });
  }

  private deleteListener(btn: HTMLButtonElement): void {
    btn.addEventListener("click", () => {
      document.location.reload();
      window.scrollTo(0, 0);
    });
  }

  private getStoredDocsListener(): void {
    this.btnStoredInvoices.addEventListener(
      "click",
      this.getItems.bind(this, "invoice")
    );
    this.btnStoredInvoices.addEventListener(
      "click",
      this.getItems.bind(this, "estimate")
    );
  }

  private getItems(docType: string) {
    if (this.storedEl.hasChildNodes()) {
      this.storedEl.innerHTML = "";
    }

    if (localStorage.getItem(docType)) {
      let array: string | null;
      array = localStorage.getItem(docType);

      if (array && array.length > 2) {
        let arrayData: string[];
        arrayData = JSON.parse(array);

        arrayData.map((doc: string): void => {
          let card: HTMLDivElement = document.createElement("div");
          let cardBody: HTMLDivElement = document.createElement("div");
          let cardClasses: string[] = [
            "relative",
            "flex",
            "flex-col",
            "min-w-0",
            "rounded",
            "break-words",
            "border",
            "bg-white",
            "border-1",
            "border-gray-300",
            "mt-5",
          ];
          let cardBodyClasses: string[] = ["flex-auto", "p-6"];
          card.classList.add(...cardClasses);
          cardBody.classList.add(...cardBodyClasses);

          cardBody.innerHTML = doc;
          card.append(cardBody);
          this.storedEl.append(card);
        });
      } else {
        this.storedEl.innerHTML = `<div class="p-12">Aucune data disponible !</div>`;
      }
    }
  }

  private handleFormSubmit(e: Event) {
    e.preventDefault();

    const inputs = this.inputDatas();

    if (Array.isArray(inputs)) {
      const [
        type,
        firstName,
        lastName,
        address,
        country,
        town,
        zip,
        product,
        price,
        quantity,
        tva,
      ] = inputs;

      let docData: HasHtmlFormat;
      let date: Date = new Date();
      docData = new Datas(
        type,
        firstName,
        lastName,
        address,
        country,
        town,
        zip,
        product,
        price,
        quantity,
        tva,
        date
      );

      let template: HasRender;
      template = new Display(this.docContainer, this.hiddenDiv, this.btnPrint);
      template.render(docData, type);
    }
  }

  private inputDatas():
    | [
        string,
        string,
        string,
        string,
        string,
        string,
        number,
        string,
        number,
        number,
        number
      ]
    | void {
    const type = this.type.value;
    const firstName = this.firstName.value;
    const lastName = this.lastName.value;
    const address = this.address.value;
    const country = this.country.value;
    const town = this.town.value;
    const zip = this.zip.valueAsNumber;
    const product = this.product.value;
    const price = this.price.valueAsNumber;
    const quantity = this.quantity.valueAsNumber;
    const tva = this.tva.valueAsNumber;

    if (zip > 0 && price > 0 && quantity > 0 && tva > 0) {
      return [
        type,
        firstName,
        lastName,
        address,
        country,
        town,
        zip,
        product,
        price,
        quantity,
        tva,
      ];
    } else {
      alert("Les valeurs numérique doivent être > 0 !");
      return;
    }
  }
}
