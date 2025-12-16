import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { FormService } from 'src/app/libs/form/services/form.service';
import { TableComponent } from 'src/app/libs/table/table.component';
import { CrudComponent } from 'wacom';
import { birdForm } from '../../forms/bird.form';
import { Bird } from '../../interfaces/bird.interface';
import { BirdSelectorComponent } from '../../selectors/bird/bird-selector.component';
import { BirdService } from '../../services/bird.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TableComponent, BirdSelectorComponent],
	templateUrl: './birds.component.html',
})
export class BirdsComponent extends CrudComponent<
	BirdService,
	Bird,
	FormInterface
> {
	columns = ['name', 'description'];

	config = this.getConfig();

	constructor(_birdService: BirdService, _form: FormService) {
		super(birdForm, _form, _birdService, 'bird');

		this.setDocuments();
	}
}
