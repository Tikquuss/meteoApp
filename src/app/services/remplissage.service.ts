import { Injectable } from '@angular/core';
import { TableHead, TableRow, TableData, Table } from '../Utils/Utils';

interface Test {
    page?: string;
}

@Injectable({
    providedIn: 'root'
})
export class RemplissageService {
    test = `[
        {
          "id": 1,
          "name": "Leanne Graham",
          "username": "Bret",
          "email": "Sincere@april.biz",
          "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
              "lat": "-37.3159",
              "lng": "81.1496"
            }
          },
          "phone": "1-770-736-8031 x56442",
          "website": "hildegard.org",
          "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
          }
        },
        {
          "id": 2,
          "name": "Ervin Howell",
          "username": "Antonette",
          "email": "Shanna@melissa.tv",
          "address": {
            "street": "Victor Plains",
            "suite": "Suite 879",
            "city": "Wisokyburgh",
            "zipcode": "90566-7771",
            "geo": {
              "lat": "-43.9509",
              "lng": "-34.4618"
            }
          },
          "phone": "010-692-6593 x09125",
          "website": "anastasia.net",
          "company": {
            "name": "Deckow-Crist",
            "catchPhrase": "Proactive didactic contingency",
            "bs": "synergize scalable supply-chains"
          }
        }
      ]`;
    constructor() { }

    generateTable({ url, liste, json }: { url?: string, json?: string, liste?: object[] }): Promise<Table> {
        if (url) {
            return new Promise((resolve, reject): void => {
                this.generateTableFromUrl(url).then((table: object[]) => {
                    resolve(new Table(table));
                }).catch((err) => {
                    reject(err);
                });
            });
        } else if (liste) {
            return new Promise((resolve, reject): void => {
                try {
                    resolve(new Table(liste));
                } catch (e) {
                    reject(e);
                }
            });
        } else if (json) {
            return new Promise((resolve, reject): void => {
                try {
                    resolve(new Table(this.generateTableFromString(json)));
                } catch (e) {
                    reject(e);
                }
            });
        } else { // tableau vide
            return new Promise((resolve, reject): void => {
                resolve(new Table([]));
            });
        }
    }

    generateTableFromString(data: string = this.test): object[] {
        let items: object[] = JSON.parse(data);
        items = ((u) => {
            const tmp = [];
            const split = (splitted, collection) => {
                let value = null;
                // tslint:disable-next-line:forin
                for (const key in collection) {
                    value = collection[key];
                    if (typeof value === 'object') {
                        split(splitted, value);
                    } else {
                        splitted[key] = value;
                    }
                }
            };
            u.forEach(value => {
                const obj = {};
                split(obj, value);
                tmp.push(obj);
            });
            return tmp;
        })(items);
        return items;
    }

    generateTableFromUrl(url?: string) {
        return new Promise((resolve, reject) => {
            if (!url) {
                resolve(this.generateTableFromString());
            } else {
                fetch(url).then((response) => {
                    resolve(this.generateTableFromString(JSON.stringify(response.json()['[[PromisseValue]]'])));
                }).catch((err) => {
                    reject(err);
                });
            }
        });
    }
}
