export const getLastPageFromLink = (links) => {
	const result = links.match(/_page=(\d{1,9})&_limit=\d{1,6}>; rel="last"/);
	return result ? Number(result[1]) : 1;
};
