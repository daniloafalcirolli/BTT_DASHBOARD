import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const ObjectPagination = ({ currentPage, totalPages, lastPage, firstPage, pagination}) => {

	return (
		<div className="pagination">
			<ul className="pagination_wrapper">
				<li>
					<button disabled={firstPage} onClick={() => { pagination.setPage(currentPage - 1) }} className="button_pagination">
						<FaChevronLeft />
					</button>
				</li>
				<li>
					<span className="current_page">{currentPage + 1}</span>
				</li>
				<li>
					<span>de</span>
					</li>
				<li>
					<span>{totalPages}</span>
				</li>
				<li>
					<button disabled={lastPage} onClick={ () => { pagination.setPage(currentPage + 1) }} className="button_pagination">
						<FaChevronRight />
					</button>
				</li>
			</ul>
		</div>
	)
}

export default ObjectPagination