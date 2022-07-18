import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  constructor(private modal: NzModalService) {}

  ngOnInit(): void {}

  showModal(): void {
    this.modal.info({
      nzTitle: 'This is a notification message',
      nzContent: 'xxx',
      nzOnOk: () => console.log('Info OK'),
    });
  }
}
