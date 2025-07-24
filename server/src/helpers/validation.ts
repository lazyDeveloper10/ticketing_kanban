export const errorSetter = (err: any) => {
	if (err?.message.slice(0, 6) === 'Error:') {
		throw new Error(err.message);

	} else {
		throw new Error('Error: Internal server error');
	}
};

export const patternValidation = {
	password: () => new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)
};
