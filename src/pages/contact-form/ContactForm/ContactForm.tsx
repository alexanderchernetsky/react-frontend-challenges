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


// todo: add validation with validation messages
// use aria-live="polite" for error/success messages screen reader will announce changes when it can do so without interrupting the user.
// use aria-describedby="name-error" for error message related to the input/textarea field
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
        <form id="contact-form" onSubmit={handleFormSubmit} className="w-[500px]">
            <fieldset className="flex flex-col justify-start gap-1">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" className="border-[1px] border-black" aria-describedby="name-error" />
                {formErrors.name && <p id="name-error" className="text-red-500 text-sm" aria-live="polite">{formErrors.name}</p>}
            </fieldset>

            <fieldset className="flex flex-col justify-start gap-1">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" className="border-[1px] border-black" aria-describedby="email-error" />
                {formErrors.email && <p id="email-error" className="text-red-500 text-sm" aria-live="polite">{formErrors.email}</p>}
            </fieldset>

            <fieldset className="flex flex-col justify-start gap-1">
                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" className="border-[1px] border-black" aria-describedby="email-error" />
                {formErrors.message && <p id="message-error" className="text-red-500 text-sm" aria-live="polite">{formErrors.message}</p>}
            </fieldset>

            <button disabled={isSubmitting} type="submit" className="mt-4 border-[1px] border-black w-full">Send</button>
            {isSuccess && (<p className="text-center mt-2 text-green-500">The message has been sent successfully!</p>)}
            {isError && (<p className="text-center mt-2 text-red-500">The form submission has failed!</p>)}
        </form>
    );
}

export default ContactForm;
