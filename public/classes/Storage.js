export class Storage {
    constructor(typeVal, htmlString) {
        this.oldData = [];
        this.setItem(typeVal, htmlString);
    }
    static checkLocalStorage() {
        if (!localStorage.getItem("invoice")) {
            localStorage.setItem("invoice", "[]");
        }
        if (!localStorage.getItem("estimate")) {
            localStorage.setItem("estimate", "[]");
        }
    }
    setItem(typeVal, htmlString) {
        let array;
        array = localStorage.getItem(typeVal);
        if (array) {
            this.oldData = JSON.parse(array);
            this.oldData.push(htmlString);
            localStorage.setItem(typeVal, JSON.stringify(this.oldData));
        }
        else {
            document.location.reload();
        }
    }
}
