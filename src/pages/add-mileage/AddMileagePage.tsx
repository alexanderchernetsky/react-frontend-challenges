import AddMileageForm from "./AddMileageForm/AddMileageForm";

const AddMileagePage = () => {
    return (
        <main className="flex flex-col items-center justify-center w-full p-[32px]">
            <h1 className="font-bold">Add mileage</h1>
            <section className="mt-[32px]">
                <AddMileageForm />
            </section>
        </main>
    )
}

export default AddMileagePage;
