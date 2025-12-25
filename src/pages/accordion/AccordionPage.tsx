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
            <section className="w-full max-w-3xl">
                <Accordion data={accordionTestData} />
            </section>
        </main>
    )
}

export default AccordionPage;
