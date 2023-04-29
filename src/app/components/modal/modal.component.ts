import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() title: string | undefined;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  @Output() confirm: EventEmitter<boolean> = new EventEmitter<boolean>();

  closeModal() {
    this.closeModalEvent.emit(false);
  }

  onModalConfirm() {
    this.confirm.emit(true);
    this.closeModal();
  }
}