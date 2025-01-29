import { Component, Input } from '@angular/core';

/**
 * Composant de notification permettant d'afficher un message temporaire.
 */
@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {

  @Input() message: string = '';
  @Input() estVisible: boolean = false;

  /**
   * Cache la notification en modifiant la variable `estVisible` à `false`.
   */
  cacherNotification() {
    this.estVisible = false;
  }
}
