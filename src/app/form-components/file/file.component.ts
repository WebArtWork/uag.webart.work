import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	TemplateRef,
	inject,
	viewChild,
} from '@angular/core';
import { FileComponent, fileDefaults } from '@lib/file';
import { FormService } from '@lib/form';

interface FileTemplateContext {}

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [FileComponent],
	templateUrl: './file.component.html',
})
export class FileFormComponent implements OnInit {
	private readonly _formService = inject(FormService);

	readonly templateRef =
		viewChild.required<TemplateRef<FileTemplateContext>>('templateRef');

	readonly fileDefaults = fileDefaults;

	ngOnInit(): void {
		this._formService.addTemplateComponent<FileTemplateContext>(
			'File',
			this.templateRef(),
		);
	}
}
