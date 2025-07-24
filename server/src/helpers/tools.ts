import crypto from 'crypto';

export const generateRandomString = (length: number) => {
	return crypto.randomBytes(length).toString('hex').toUpperCase();
};

export const padWithLeadingZeros = (num: number, totalLength: number) => {
	return String(num).padStart(totalLength, '0');
};

export const ticketCode = (ticketType: string) => {
	switch (ticketType) {
		case 'BUG_FIXED':
			return 'BUG';
		case 'FEATURE_REQUEST':
			return 'FR';
		default:
			return 'OT'
	}
};
