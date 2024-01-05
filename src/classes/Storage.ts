export class Storage {
  constructor() {}

  static checkLocalStorage(): void {
    if (!localStorage.getItem("invoice")) {
      localStorage.setItem("invoice", "[]");
    }

    if (!localStorage.getItem("estimate")) {
      localStorage.setItem("estimate", "[]");
    }
  }
}
