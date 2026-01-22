import {FC, useMemo, useState} from "react";

interface User {
    id: number;
    name: string;
    age: number;
    occupation: string;
}

interface TableProps {
    data: User[];
}

// Notes:
// Add aria-label attr to pagination buttons
// Add an aria-describedby attr to select to provide additional context for assistive tech. and a hidden description that explains what changing this value will do
// Wrap pagination info in a <div> or <span> with role="status" and aria-live="polite"
// Add a <caption> element inside the <table> (after the opening tag) to provde some context
// Wrap your pagination div in a <nav> element with aria-label so that the pagination controls identified as navigation.
// todo: way to improve - make component accept props for customisation of col headers, cell rendering, pagination options etc.
const Table: FC<TableProps> = ({data}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const totalPages = Math.ceil(data.length / rowsPerPage);

    const handleNext = () => {
        setCurrentPage(prev => prev + 1);
    }

    const handlePrev = () => {
        setCurrentPage(prev => prev - 1);
    }

    const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    }

    const sliceOfData = useMemo(() => {
        return data.slice((currentPage - 1) * rowsPerPage , currentPage * rowsPerPage);
    }, [data, currentPage, rowsPerPage])

    return (
        <div className="flex flex-col gap-6">
            <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <caption className="sr-only">
                        User data table with pagination
                    </caption>
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupation</th>
                    </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                    {sliceOfData.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                                No data available
                            </td>
                        </tr>
                    ) : (
                        sliceOfData.map(user => {
                        return (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.age}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.occupation}</td>
                            </tr>
                        )
                    }))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                    <label htmlFor="items-per-page-select" className="text-sm font-medium text-gray-700">Show</label>
                    <select
                        name="items-per-page"
                        id="items-per-page-select"
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
                        value={rowsPerPage}
                        onChange={handleSelection}
                        aria-describedby="rows-per-page-description"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                    <p id="rows-per-page-description" className="sr-only">This select changes the number of rows displayed in the table</p>
                    <span className="text-sm text-gray-700 whitespace-nowrap">per page</span>
                </div>

                <div className="flex items-center gap-4">
                    <nav aria-label="Table pagination">
                        <div role="status" aria-live="polite" aria-atomic="true" className="text-sm text-gray-700" >
                            Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span>
                        </div>
                        <div className="inline-flex rounded-md shadow-sm" role="group">
                            <button
                                aria-label="Go to previous page"
                                type="button"
                                onClick={handlePrev}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Prev
                            </button>
                            <button
                                aria-label="Go to next page"
                                type="button"
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md border-l-0 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}


export default Table;
