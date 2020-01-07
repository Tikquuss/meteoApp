export interface Identified {
    id: string;
}

export class TableHead {
    constructor(private name: string, private label: string = name) {}

    getName(): string {
        return this.name;
    }

    getLabel(): string {
        return this.name;
    }
}

export class TableData {
    constructor(private head: TableHead, private content: string) {}

    getHead(): TableHead {
        return this.head;
    }

    getContent(): string {
        return this.content;
    }
}

export class TableRow {
    constructor(private data: TableData[]) {}

    getData(): TableData[] {
        return this.data;
    }
}

export class Table {
    private colonnes: TableHead[];
    private lignes: TableRow[];
    private dataFormatted: object[];
    constructor(objs: object[]) {
        this.colonnes = [];
        this.lignes = [];
        this.dataFormatted = [];
        // tslint:disable-next-line:forin
        for (const elt in objs[0]) {
            this.colonnes.push(new TableHead(elt));
        }
        const rows: TableRow[] = [];
        // tslint:disable-next-line: forin
        for (const line of objs) {
            const datas: TableData[] = [];
            let i = 0;
            // tslint:disable-next-line: forin
            for (const data in line) {
                datas.push(new TableData(this.colonnes[i], line[data]));
                i++;
            }
            rows.push(new TableRow(datas));
        }
        this.lignes = rows;
        /**
         * @todo
         * ceci n'est qu'un code de test
         */
        // const nomHead: TableHead = new TableHead('nom', 'noms et prénoms');
        // const usernameHead: TableHead = new TableHead('username');
        // const emailHead: TableHead = new TableHead('email');

        // this.colonnes = [
        //     nomHead,
        //     usernameHead,
        //     emailHead
        // ];

        // const ligne1: TableRow = new TableRow(
        //     [
        //         new TableData(nomHead, 'Foko henri'),
        //         new TableData(usernameHead, 'henrifoko'),
        //         new TableData(emailHead, 'henrifoko@gmail.com')
        //     ]);
        // const ligne2: TableRow = new TableRow(
        //     [
        //         new TableData(nomHead, 'Mbathe Paul'),
        //         new TableData(usernameHead, 'paulM'),
        //         new TableData(emailHead, 'paulmbathe@gmail.com'),
        //     ]);
        // const ligne3: TableRow = new TableRow(
        //     [
        //         new TableData(nomHead, 'Donang Arold'),
        //         new TableData(usernameHead, 'aroldlemotieu'),
        //         new TableData(emailHead, 'aroldlemotieu@gmail.com'),
        //     ]);
        // const ligne4: TableRow = new TableRow(
        //     [
        //         new TableData(nomHead, 'Kengne Maeva'),
        //         new TableData(usernameHead, 'maevak'),
        //         new TableData(emailHead, 'maevakengne-estic@gmail.com'),
        //     ]);
        // const lignes: TableRow[] = [];
        // lignes.push(ligne1);
        // lignes.push(ligne2);
        // lignes.push(ligne3);
        // lignes.push(ligne4);

        // this.lignes = lignes;
        // this.dataFormatted = [];

        this.updateTable();
    }

    updateTable(): void {
        let i = 1;
        for (const ligne of this.lignes) {
            // tslint:disable-next-line: prefer-const
            let tmp = {};
            // tslint:disable-next-line: no-string-literal
            for (const data of ligne.getData()) {
                tmp[data.getHead().getName()] = data.getContent();
            }
            // tslint:disable-next-line: no-string-literal
            if (!tmp['id']) {
                // tslint:disable-next-line: no-string-literal
                tmp['id'] = i + '';
            }
            this.dataFormatted.push(tmp);
            i++;
        }
        console.log('fomr', this.dataFormatted);
    }

    getContent(): object[] {
        return this.dataFormatted;
    }

    getColumns(): string[] {
        const cols: string[] = [];
        for (const elt of this.colonnes) {
            cols.push(elt.getName());
        }
        return cols;
    }
}
