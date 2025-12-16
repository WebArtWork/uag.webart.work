export interface ProfileModel {
	name: string;
	phone: string;
	bio: string;
}

export interface SecurityModel {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}
