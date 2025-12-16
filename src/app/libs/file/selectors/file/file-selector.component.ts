import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	output,
	Signal,
	signal,
} from '@angular/core';
import { SelectComponent } from 'src/app/libs/select/select.component';
import { TranslatePipe } from 'src/app/modules/translate/pipes/translate.pipe';
import { File } from '../../file.interface';
import { FileService } from '../../file.service';

@Component({
	selector: 'file-selector',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SelectComponent, TranslatePipe],
	templateUrl: './file-selector.component.html',
})
export class FileSelectorComponent {
	private _files = inject(FileService);
	readonly wModel = input<string | null>(null, { alias: 'wModel' });
	readonly wChange = output<string | null>();

	readonly items: Signal<File[]> = signal(this._files.getDocs());
}
