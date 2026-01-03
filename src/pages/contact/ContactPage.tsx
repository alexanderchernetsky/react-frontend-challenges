import ContactForm from "./ContactForm/ContactForm";

const ContactPage = () => {
    return (
        <main className="flex flex-col items-center justify-center w-full p-[32px]">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Form</h1>

            <section className="w-full max-w-lg mb-12 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Objective: Create a Contact Form</h2>
                <p className="text-blue-800 mb-4">
                    Build a robust contact form that handles user input, validation, and submission.
                </p>
                <div className="space-y-2">
                    <p className="font-medium text-blue-900">Key Requirements:</p>
                    <ul className="list-disc list-inside text-blue-800 space-y-1 ml-2">
                        <li>Fields: Name, Email, and Message (textarea)</li>
                        <li>Submit button with "Send" text</li>
                        <li>Implement manual validation (client-side)</li>
                        <li>POST form data to an API on submission</li>
                        <li>Handle submission states: loading, success, and error</li>
                        <li>Use <code className="bg-blue-100 px-1 rounded">aria-live="polite"</code> for status messages</li>
                        <li>Use <code className="bg-blue-100 px-1 rounded">aria-describedby</code> for field-specific errors</li>
                    </ul>
                </div>
            </section>

            <section className="w-full max-w-lg">
                <ContactForm />
            </section>
        </main>
    )
}

export default ContactPage;
