import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ChangeLocationModalContentComponent} from '../change-location-modal-content/change-location-modal-content.component';

@Component({
  selector: 'app-change-location-modal',
  templateUrl: './change-location-modal.component.html',
  styleUrls: ['./change-location-modal.component.css']
})
export class ChangeLocationModalComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  open() {
    const modalRef = this.modalService.open(ChangeLocationModalContentComponent);
    modalRef.componentInstance.name = 'World';
  }

  ngOnInit() {
  }

}
