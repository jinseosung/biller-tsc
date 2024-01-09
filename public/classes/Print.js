export class Print {
    constructor(element) {
        this.element = element;
    }
    print() {
        this.element.innerHTML = document.body.innerHTML;
        window.print();
    }
}
