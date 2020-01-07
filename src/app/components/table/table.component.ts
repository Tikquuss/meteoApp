import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { RemplissageService } from '../../services/remplissage.service';
import { ModificationService } from '../../services/modification.service';
import { TableHead, TableRow, TableData, Table } from '../../Utils/Utils';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Identified } from '../../Utils/Utils';
import { constructor } from 'q';
import { element } from 'protractor';
import { concat } from 'rxjs';
import { Router} from '@angular/router';

import { EntitysService } from '../../services/entitys.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
    table: Table;
    dataSource: MatTableDataSource<object>;
    displayedColumns: string[] = [];
    initialized = false;


    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @Input() url: string;
    @Input() json: string;
    
    @Input() entityClass : string;

    constructor(private serviceRemplissage: RemplissageService,
                private router: Router,
                private entitysService : EntitysService) {}

    ngOnInit() {
        this.initialise();
    }

    initialise(
        {url, liste, json}: {
            url?: string,
            json?: string,
            liste?: object[]} = { url: this.url, json: this.json}) {
        const param = {
            url,
            json,
            liste
        };
        if (!url && !liste && !json) {
            return;
        }
        this.serviceRemplissage.generateTable(param).then((t: Table): void => {
            // tslint:disable-next-line: no-string-literal
            for (const col of t.getColumns()) {
                this.displayedColumns.push(col);
            }
            if (this.displayedColumns.indexOf('id') === -1) {
                this.displayedColumns.unshift('id');
            }
            this.displayedColumns.unshift('✍');
            this.table = t;
            this.dataSource = new MatTableDataSource(t.getContent());
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            this.initialized = true;
        }).catch((err: Error) => {
            console.log('Erreur lors de l\'initialisation de la table');
            console.error(err);
            this.initialized = false;
            throw Error('Erreur d\'initialisation du tableau\n' + err);
        });
    }

    destroy() {
        this.table = null;
        this.dataSource = null;
        this.initialized = false;
        this.displayedColumns = null;
        this.url = null;
        this.json = null;
        this.sort = null;
        this.paginator = null;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    add(): void {
        let newElt: object;
        ModificationService.ajout().then((obj) => {
            newElt = obj;
            if (!this.initialized) {
                if (!(newElt as Identified).id) {
                    newElt = {
                        id: '1',
                        ...newElt
                    };
                }
                this.initialise({liste: [newElt]});
            }
            // tslint:disable-next-line:no-string-literal
            if (!newElt['id']) {
                let max = 0;
                let tmp: number;
                for (const elt of this.dataSource.data) {
                    tmp = parseInt((elt as Identified).id, 10);
                    max = tmp > max ? tmp : max;
                }
                (newElt as Identified).id = String(max + 1);
            }
            this.router.navigate(['/form/'+this.entityClass+'/new']);
            this.dataSource.data.push(newElt);
            this.dataSource._updateChangeSubscription();
        });
    }

    edit(e: Event): void {
        const id = this.first_parent_button(e.target as Node).getAttribute('name') as string;
        let eltUpdate: object;
        for (const elt of this.dataSource.data) {
            if (String((elt as Identified).id) === id) {
                ModificationService.editer(elt).then((obj) => {
                    eltUpdate = obj;
                    // tslint:disable-next-line:forin
                    for (const key in eltUpdate) {
                        elt[key] = eltUpdate[key];
                    }
                    this.router.navigate(['/form/'+this.entityClass+'/'+JSON.stringify(elt)]);
                    this.dataSource._updateChangeSubscription();
                });
                break;
            }
        }
    }

    delete(e: Event): void {
        if (!confirm('❗❗⚠ Êtes vous sur de vouloir suprimer cette élément?')) {
            return;
        }
        const id = this.first_parent_button(e.target as Node).getAttribute('name') as string;
        for (const elt of this.dataSource.data) {
            if (String((elt as Identified).id) === id) {
                this.dataSource.data.splice(this.dataSource.data.indexOf(elt), 1);
                break;
            }
        }
        //this.entitysService.deleteEntity();
        this.dataSource._updateChangeSubscription();
        // let button = this.first_parent_button(e.target as Node);
    }

    first_parent_button(node: Node): HTMLElement {
        let parent = node;
        while (parent.nodeName !== 'BUTTON') {
            parent = parent.parentNode;
        }
        return parent as HTMLElement;
    }

    export(): object[] {
        return this.dataSource.data;
    }
}
