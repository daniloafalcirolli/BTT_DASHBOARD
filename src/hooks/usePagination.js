import React from 'react';

const usePagination = () => {
	const [size, setSize] = React.useState(10);
	const [page, setPage] = React.useState(0);
	const [search, setSearch] = React.useState("");

	return {
		size, page, search, setSize, setPage, setSearch
	}
}

export default usePagination;