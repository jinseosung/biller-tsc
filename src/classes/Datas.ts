import { HasHtmlFormat } from "../interfaces/HasHtmlFormat.js";

export class Datas implements HasHtmlFormat {
  constructor(
    private documentType: string,
    private firstName: string,
    private lastName: string,
    private address: string,
    private country: string,
    private town: string,
    private zip: number,
    private product: string,
    private price: number,
    private quantity: number,
    private tva: number,
    private date: Date
  ) {}

  private subtotal(price: number, quantity: number, tva: number): number {
    const tvaPercent = tva / 100;
    const totalTva = price * tvaPercent;
    return (price + totalTva) * quantity;
  }

  htmlFormat(): string {
    const totalPrice = this.subtotal(this.price, this.quantity, this.tva);

    return `
    <div class="flex flex-wrap  p-12">
    <div class="md:w-1/2 pr-4 pl-4">
        <h2 class="text-left">LOGO</h2>
    </div>
    <div class="md:w-1/2 pr-4 pl-4 text-right">
        <p class="font-bold mb-1">${
          this.documentType === "invoice" ? "Facture" : "Devis"
        }<span class="font-normal">N° ${Math.floor(
      Math.random() * 101
    )}</span></p>
        <p class="font-bold mb-1">Date <span class="font-normal">${this.date.toLocaleDateString()}</span></p>
    </div>
</div>

<div class="flex flex-wrap  pb-5 p-12">
    <div class="sm:w-1/2 pr-4 pl-4 text-left">
        <p class="font-bold">Entreprise de Toto</p>
        <p class="mb-1">22 boulevard Moe Szyslak</p>
        <p>75008 - Paris</p>
        <p class="mb-1">Tél: 00.00.00.00.00</p>
    </div>

    <div class="sm:w-1/2 pr-4 pl-4 text-right">
        <p class="font-bold">Informations du client</p>
        <p class="mb-1">Mr/Mme ${this.firstName} ${this.lastName}</p>
        <p class="mb-1">${this.address}</p>
        <p>${this.country}</p>
        <p>${this.town}</p>
        <p>${this.zip}</p>
    </div>
</div>

<div class="flex flex-wrap  p-12">
    <div class="md:w-full pr-4 pl-4">
        <table class="w-full max-w-full mb-4 bg-transparent">
        <thead>
            <tr>
            <th class="border-0 uppercase text-xs font-bold">Produit/Service</th>
            <th class="border-0 uppercase text-xs font-bold">Prix unitaire HT</th>
            <th class="border-0 uppercase text-xs font-bold">Quantité</th>
            <th class="border-0 uppercase text-xs font-bold">Total HT</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>${this.product}</td>
            <td>${this.price} € HT</td>
            <td>${this.quantity}</td>
            <td>${this.price * this.quantity} € HT</td>
            </tr>
        </tbody>
        </table>
    </div>
</div>

<div class="flex flex-row-reverse bg-gray-100 p-6">
    <div class="py-3 px-5">
        <div class="mb-2">TOTAL TTC</div>
        <div class="h2 font-weight-light">${totalPrice.toFixed(2)} €</div>
    </div>
</div>`;
  }
}
