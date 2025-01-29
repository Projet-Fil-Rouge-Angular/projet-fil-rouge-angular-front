import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Input() message: string = '';
  @Input() isVisible: boolean = false;
}
