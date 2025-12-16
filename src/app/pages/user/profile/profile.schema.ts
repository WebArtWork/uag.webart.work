import { required, schema } from '@angular/forms/signals';
import { ProfileModel, SecurityModel } from './profile.interface';

export const profileSchema = schema<ProfileModel>((path) => {
	required(path.name, { message: 'Enter your name...' });

	required(path.phone, { message: 'Enter your phone...' });

	required(path.bio, { message: 'Enter your biography...' });
});

export const securitySchema = schema<SecurityModel>((path) => {
	required(path.currentPassword, {
		message: 'Enter your current password...',
	});

	required(path.newPassword, {
		message: 'Enter your new password...',
	});

	required(path.confirmPassword, {
		message: 'Confirm your new password...',
	});
});
