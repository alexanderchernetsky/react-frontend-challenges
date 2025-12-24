import {Link} from "react-router-dom";


const pages = [
    {
        to: '/products',
        text: 'Products (fetch data from API and show a grid of items)'
    },
    {
        to: '/create-product',
        text: 'Create Product Form (create a form for creation a new product using react-hook-form)',
    },
    {
        to: '/todo',
        text: 'Manage todos (ToDo application with add / delete / search / complete functionality)',
    },
    {
        to: '/accordion',
        text: 'Accordion component (accessible accordion)'
    }
]

const HomePage = () => {
    return (
        <main className="mt-[32px] flex flex-col items-center justify-center h-full">
            <h1 className="font-bold">Tasks: </h1>
            <ul>
                {
                    pages.map((page, index) => (<li key={index} className="p-2 hover:underline"><Link to={page.to}>{index + 1}. {page.text}</Link></li>))
                }
            </ul>
        </main>

    )
}

export default HomePage;
