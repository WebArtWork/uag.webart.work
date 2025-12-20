import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '@lib/button';
@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ButtonComponent],
	selector: 'page-diia',
	templateUrl: './diia.component.html',
	styleUrls: ['./diia.component.scss'],
})
export class DiiaComponent {
	http = inject(HttpClient);

	// TODO we need a service which will handle if we should sign with diia or we are citizen

	sign() {
		this.http.post('/api/diia/sign', {}).subscribe();
	}
}
