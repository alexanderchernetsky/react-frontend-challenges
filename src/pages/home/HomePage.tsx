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
        title: 'Todo list',
        description: 'A ToDo app with add, delete, search, and toggle completion features, utilizing Local Storage for data persistence.',
        company: 'Greatfrontend'
    },
    {
        to: '/accordion',
        title: 'Accordion component',
        description: 'An accessible, multi-expandable accordion component following WAI-ARIA patterns for screen reader support.',
        company: 'Greatfrontend'
    },
    {
        to: '/contact-form',
        title: 'Contact form',
        description: 'A robust contact form with manual validation, submission state handling (loading/success/error), and ARIA-live announcements.',
        company: 'Greatfrontend'
    },
    {
        to: '/progress-bars',
        title: 'Progress bars',
        description: 'An app where clicking the "Add" button adds progress bars to the page. The progress bars fill up gradually as soon as they are shown.',
        company: 'Greatfrontend'
    },
    {
        to: '/add-mileage-form',
        title: 'Add mileage form',
        description: 'Create form like on the image. There is a dynamic field - destinations, select that fetches values from the API, on submit - send data to the external API using POST. The expenseName field should be prefilled as a string consisting of “startingPoint + destination”.',
        company: 'Moss'
    },
    {
        to: '/mortgage-calculator',
        title: 'Mortgage Calculator',
        description: 'Build a simple mortgage calculator widget that takes in a loan amount, interest rate, loan term, and calculates the monthly mortgage payment, total payment amount, and total interest paid.',
        company: 'Greatfrontend'
    },
    {
        to: '/tabs',
        title: 'Tabs',
        description: 'An accessible tabs component that allows users to switch between different content views.',
        company: 'Greatfrontend'
    },
    {
        to: '/holy-grail',
        title: 'Holy Grail Layout',
        description: 'The Holy Grail layout is a famous CSS page layout that has traditionally been hard to implement. It consists of a header, footer, and three columns. The left column contains navigation items, the middle column contains the page contents, and the right column contains ads.',
        company: 'Greatfrontend'
    },
    {
        to: '/dice-roller',
        title: 'Dice Roller',
        description: 'A simple dice roller application that allows users to roll multiple dice and see the results.',
        company: 'Greatfrontend'
    },
    {
        to: '/css-battle-235',
        title: 'CSS Battle #235',
        description: 'Re-create the layout on the image.',
        company: 'Fluxon'
    },
    {
        to: '/table',
        title: 'Table',
        description: 'Given a list of users, build a users data table that displays users in a paginated format.',
        company: 'Greatfrontend'
    },
    {
        to: '/like-button',
        title: 'Like Button',
        description: 'Create a Like button which appearance changes based on different states.',
        company: 'Greatfrontend'
    },
    {
        to: '/star-rating',
        title: 'Star Rating',
        description: 'Create a star rating widget that allows users to select a rating and see hover effects.',
        company: 'Greatfrontend'
    },
]

const HomePage = () => {
    return (
        <main className="p-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8">Challenges</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {
                    pages.map((page, index) => (
                        <Link
                            key={index}
                            to={page.to}
                            className="flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-colors group relative"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h5 className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors pr-2">
                                    {index + 1}. {page.title}
                                </h5>
                                {page.company && (
                                    <span className="flex-shrink-0 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded border border-blue-400">
                                        {page.company}
                                    </span>
                                )}
                            </div>
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
