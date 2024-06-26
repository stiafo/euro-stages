export interface FetchError extends Error {
	info?: any;
	status?: number;
}

export const fetcher = async (url: string) => {
	const res = await fetch('https://api.nifs.no/' + url, {
		method: 'GET',
	});

	if (!res.ok) {
		const error: FetchError = new Error('An error occurred while fetching the data.');
		error.info = await res.json();
		error.status = res.status;
		throw error;
	}

	return res.json();
};

export const getMatchStatus = (match: any) => {
	switch (match.matchStatusId) {
		case 1:
			return 'Played';
		case 2:
			return 'Not started';
		case 3:
			return 'Postponed';
		case 4:
			return 'Abandoned';
		case 5:
			return 'Will not be Played';
		case 6:
			return 'Date not set';
		case 7:
			return 'Ongoing';
		case 8:
			return 'First half';
		case 9:
			return 'Half time';
		case 10:
			return 'Second half';
	}
};
