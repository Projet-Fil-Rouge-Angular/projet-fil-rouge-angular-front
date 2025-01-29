import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Composant modal permettant d'afficher une fenêtre de dialogue avec un titre.
 */
@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() titre: string = '';
  @Output() fermer = new EventEmitter<void>();

  /**
   * Émet l'événement `fermer` pour signaler la fermeture du modal.
   */
  fermerModal() {
    this.fermer.emit();
  }
}
