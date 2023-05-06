import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { initialLuggage } from '../../data/luggage';

// Hier müsste ein Sheriff-Fehler kommen
import { CheckinService } from '../../../checkin/data';


@Component({
  selector: 'app-luggage-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './luggage-card.component.html',
  styleUrls: ['./luggage-card.component.css']
})
export class LuggageCardComponent {
  @Input({ required: true}) luggage = initialLuggage;
}
