import {useState} from "react";

// OBJECTIVE: create contact form
// Requirements
// The form should contain the following elements:
// Name field.
// Email field.
// Message field. Since the message can be long, a <textarea> will be more suitable.
// Submit button
// Contains the text "Send".
// Clicking on the submit button submits the form.
// The form and submission should be implemented entirely in HTML. Do not use any JavaScript or framework-specific features for this question.
// Any client-side validation on the fields is optional. Validation will be done on the server side.
// Submission API
// Upon submission, POST the form data to https://questions.greatfrontend.com/api/questions/contact-form with the following fields in the request body: name, email, message.
//
// If all the form fields are correctly filled up, you will see an alert containing a success message. Congratulations!


// Notes:
// submit handler receives event: React.FormEvent<HTMLFormElement>; const form = event.target as HTMLFormElement; const formData = new FormData(form); const data = Object.fromEntries(formData);
// use aria-live="polite" for error/success messages - screen reader will announce changes when it can do so without interrupting the user.
// use aria-describedby="name-error" for error messages related to the input/textarea field
const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [formErrors, setFormErrors] = useState<{name?: string; email?: string; message?: string}>({});

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // reset form state
        setIsError(false);
        setIsSuccess(false);
        setFormErrors({});

        // get form data
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log('data', data);

        // validation
        const name = data.name.toString().trim();
        console.log('name', name);
        const email = data.email.toString().trim();
        const message = data.message.toString().trim();

        const errors: Record<string, string> = {};
        if (!name) {
            errors.name = 'Name is required';
        }
        if (!email) {
            errors.email = 'Email is required';
        }
        if (!message) {
            errors.message = 'Message is required';
        }
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        // submission
        try {
            setIsSubmitting(true);
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                setIsError(true);
                console.error('Something went wrong! Response status:', response.status);
                return;
            }

            const result = await response.json();
            console.log('result', result);
            setIsSuccess(true);
            form.reset(); // Form reset after success
        } catch (error) {
            console.error('Something went wrong!', error);
            setIsError(true);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form id="contact-form" onSubmit={handleFormSubmit} className="w-full max-w-lg min-w-[320px] sm:min-w-[400px] bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="space-y-4">
                <fieldset className="flex flex-col gap-1.5 border-none p-0">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        aria-describedby="name-error"
                    />
                    {formErrors.name && <p id="name-error" className="text-red-500 text-xs italic" aria-live="polite">{formErrors.name}</p>}
                </fieldset>

                <fieldset className="flex flex-col gap-1.5 border-none p-0">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        aria-describedby="email-error"
                    />
                    {formErrors.email && <p id="email-error" className="text-red-500 text-xs italic" aria-live="polite">{formErrors.email}</p>}
                </fieldset>

                <fieldset className="flex flex-col gap-1.5 border-none p-0">
                    <label htmlFor="message" className="text-sm font-semibold text-gray-700">Message</label>
                    <textarea
                        name="message"
                        id="message"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                        aria-describedby="message-error"
                    />
                    {formErrors.message && <p id="message-error" className="text-red-500 text-xs italic" aria-live="polite">{formErrors.message}</p>}
                </fieldset>

                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Sending...' : 'Send'}
                </button>

                <div aria-live="polite" className="text-center min-h-[1.5rem]">
                    {isSuccess && (<p className="text-green-600 font-medium">The message has been sent successfully!</p>)}
                    {isError && (<p className="text-red-600 font-medium">The form submission has failed!</p>)}
                </div>
            </div>
        </form>
    );
}

export default ContactForm;
