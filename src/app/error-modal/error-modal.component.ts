import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {
  @Input() errorMessage: string | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
