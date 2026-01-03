import Accordion, {AccordionRow} from "../../components/Accordion/Accordion";

const accordionTestData: AccordionRow[] = [
    {
        id: "personal-info",
        title: "Personal Information",
        content:
            "This section contains personal details such as your name, email address, and phone number. All required fields must be completed before continuing.",
    },
    {
        id: "billing-address",
        title: "Billing Address",
        content:
            "Enter the billing address associated with your payment method. This information is used for verification and invoicing purposes.",
    },
    {
        id: "shipping-address",
        title: "Shipping Address",
        content:
            "Provide the address where your order should be delivered. You can choose a different shipping address from your billing address.",
    },
    {
        id: "payment-details",
        title: "Payment Details",
        content:
            "This section collects your payment information, including card type, expiration date, and security code. Your data is securely processed.",
    },
];

const AccordionPage = () => {
    return (
        <main className="flex flex-col items-center justify-center w-full p-[32px]">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Accordion</h1>

            <section className="w-full max-w-3xl mb-12 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Objective: Implement an Accessible Accordion</h2>
                <p className="text-blue-800 mb-4">
                    Create a component that follows the <a href="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/" target="_blank" rel="noopener noreferrer" className="underline font-medium">W3C WAI-ARIA Accordion Pattern</a>.
                </p>
                <div className="space-y-2">
                    <p className="font-medium text-blue-900">Key Requirements:</p>
                    <ul className="list-disc list-inside text-blue-800 space-y-1 ml-2">
                        <li>Use <code className="bg-blue-100 px-1 rounded">&lt;button&gt;</code> elements as triggers</li>
                        <li>Wrap buttons in appropriate heading levels (<code className="bg-blue-100 px-1 rounded">h2</code>/<code className="bg-blue-100 px-1 rounded">h3</code>)</li>
                        <li>Manage <code className="bg-blue-100 px-1 rounded">aria-expanded</code> state for screen readers</li>
                        <li>Use <code className="bg-blue-100 px-1 rounded">aria-controls</code> and <code className="bg-blue-100 px-1 rounded">aria-labelledby</code> to link triggers and panels</li>
                        <li>Implement content visibility using the <code className="bg-blue-100 px-1 rounded">hidden</code> attribute or equivalent accessible methods</li>
                        <li>Ensure decorative icons are hidden from assistive technologies with <code className="bg-blue-100 px-1 rounded">aria-hidden="true"</code></li>
                    </ul>
                </div>
            </section>

            <section className="w-full max-w-3xl">
                <Accordion data={accordionTestData} />
            </section>
        </main>
    )
}

export default AccordionPage;
