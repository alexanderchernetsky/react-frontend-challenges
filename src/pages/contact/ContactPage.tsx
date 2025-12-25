import ContactForm from "./ContactForm/ContactForm";

const ContactPage = () => {
    return (
        <main className="flex flex-col items-center justify-center w-full p-[32px]">
            <h1 className="font-bold">Contact Page</h1>
            <section className="mt-[32px]">
                <ContactForm />
            </section>
        </main>
    )
}

export default ContactPage;
