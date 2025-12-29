import {Link} from "react-router-dom";


const pages = [
    {
        to: '/products',
        title: 'Products',
        description: 'Dynamic product grid fetching data from FakeStoreAPI, featuring an Intersection Observer for bottom-of-page detection.'
    },
    {
        to: '/create-product',
        title: 'Create Product Form',
        description: 'An accessible product creation form built with react-hook-form, featuring a custom-built dropdown and image preview functionality.',
    },
    {
        to: '/todo',
        title: 'Manage todos',
        description: 'A comprehensive ToDo app with add, delete, search, and toggle completion features, utilizing Local Storage for data persistence.',
    },
    {
        to: '/accordion',
        title: 'Accordion component',
        description: 'An accessible, multi-expandable accordion component following WAI-ARIA patterns for screen reader support.'
    },
    {
        to: '/contact-form',
        title: 'Contact form',
        description: 'A robust contact form with manual validation, submission state handling (loading/success/error), and ARIA-live announcements.'
    },
    {
        to: '/progress-bars',
        title: 'Progress bars',
        description: 'An app where clicking the "Add" button adds progress bars to the page. The progress bars fill up gradually as soon as they are shown.'
    },
    {
        to: '/add-mileage-form',
        title: 'Add mileage form',
        description: 'Create form like on the image. There is a dynamic field - destinations, select that fetches values from the API, on submit - send data to the external API using POST. The expenseName field should be prefilled as a string consisting of “startingPoint + destination”.'
    },
    {
        to: '/mortgage-calculator',
        title: 'Mortgage Calculator',
        description: 'Build a simple mortgage calculator widget that takes in a loan amount, interest rate, loan term, and calculates the monthly mortgage payment, total payment amount, and total interest paid.'
    },
    {
        to: '/tabs',
        title: 'Tabs',
        description: 'An accessible tabs component that allows users to switch between different content views.'
    },
]

const HomePage = () => {
    return (
        <main className="p-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8">Tasks</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {
                    pages.map((page, index) => (
                        <Link
                            key={index}
                            to={page.to}
                            className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-colors group"
                        >
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                                {index + 1}. {page.title}
                            </h5>
                            <p className="font-normal text-gray-700">
                                {page.description}
                            </p>
                        </Link>
                    ))
                }
            </div>
        </main>
    )
}

export default HomePage;
