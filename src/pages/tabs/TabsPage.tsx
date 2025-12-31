import Tabs from "../../components/Tabs/Tabs";

const TabsPage = () => {
    const tabs = [
        { id: 1, title: 'HTML', content: 'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.' },
        { id: 2, title: 'CSS', content: 'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.' },
        { id: 3, title: 'JavaScript', content: 'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.' },
    ];

    return (
        <main className="flex flex-col items-center justify-center w-full p-[32px]">
            <h1 className="font-bold">Tabs Page</h1>
            <section className="mt-[32px] w-full max-w-2xl">
                <Tabs tabs={tabs} defaultActiveTabId={2} />
            </section>
        </main>
    )
}

export default TabsPage;
