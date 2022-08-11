import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Stat } from 'src/app/interfaces/pokemon';

@Component({
  selector: 'app-stats-pokemon',
  templateUrl: './stats-pokemon.component.html',
  styleUrls: ['./stats-pokemon.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsPokemonComponent {
    @Input()
    stats!:Stat[]
}
