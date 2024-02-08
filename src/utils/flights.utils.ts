export function getFormattedWallet(wallet: number) {
	return new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency: 'INR',
		maximumFractionDigits: 0
	}).format(wallet);
}

export function catchError(callback: Function, params?: any) {
	try {
		return callback(params);
	} catch (error) {
		console.error(error);
	}
}
