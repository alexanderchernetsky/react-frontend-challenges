import {useEffect, useState} from "react";
import {Trash2} from "lucide-react";

// OBJECTIVE:
// create form like on the image. There is a dynamic field - destinations, select that fetches values from the API, on submit - send data to the external API using POST.
// The expenseName field should be prefilled as a string consisting of “startingPoint + destination”.
// Image: https://drive.google.com/file/d/1RAv0VEtvXmJNxfeLS2kCBzBWjsnHBkNW/view

// Notes:
// we need to use the controlled form here
// don't forget to clear the form after successful submit
// todo: next - add validation: Required field checks, Ensuring at least one destination has a value, Min/Max length for text inputs
const AddMileageForm = () => {
    const [startingPoint, setStartingPoint] = useState('');
    const [destinations, setDestinations] = useState([{id: Math.round(Math.random() * 10000), name: ''}]);
    const [expenseName, setExpenseName] = useState("");
    const [vehicle, setVehicle] = useState('');
    const [isExpenseNameVirgin, setIsExpenseNameVirgin] = useState(true);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const addDestination = () => {
        setDestinations(prev => {
            return [...prev, {id: Math.round(Math.random() * 10000), name: ''}];
        });
    }

    const editDestination = (id: number, value: string) => {
        setDestinations(prev => {
            return prev.map(d => {
                if (d.id === id) {
                    return {
                        ...d,
                        name: value,
                    }
                }
                return d;
            })
        })
    }

    const deleteDestination = (id: number) => {
        setDestinations(prev => {
            return prev.filter(dest => dest.id !== id);
        })
    }

    const handleExpenseNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExpenseName(e.target.value);
        setIsExpenseNameVirgin(false);
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsSubmiting(true);
        e.preventDefault();
        setIsError(false);
        setIsSuccess(false);

        const payload = {
            startingPoint,
            destinations: destinations.map(d => d.name),
            vehicle,
            expenseName
        };
        console.log('payload', payload);

        try {
            const response = await fetch("https://free.mockerapi.com/post", {
                method: "POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                setIsError(true);
                return;
            }

            const data = await response.json();
            console.log('data', data);
            setIsSuccess(true);
            // clear the form after success
            setStartingPoint('');
            setDestinations([{id: Math.round(Math.random() * 10000), name: ''}]);
            setExpenseName('');
            setVehicle('');
            setIsExpenseNameVirgin(true);
        } catch (error) {
            console.error('error', error);
            setIsError(true);
        } finally {
            setIsSubmiting(false);
        }
    }

    useEffect(() => {
        if (startingPoint && destinations[0]?.name && isExpenseNameVirgin) {
            setExpenseName(`${startingPoint} - ${destinations[0].name}`);
        }
    },[startingPoint, isExpenseNameVirgin, destinations]);

    return (
        <form id="add-mileage-form" onSubmit={handleFormSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Mileage</h2>

            <div className="space-y-4">
                <fieldset className="flex flex-col space-y-1.5">
                    <label htmlFor="starting-point" className="text-sm font-semibold text-gray-700">Starting Point</label>
                    <input
                        type="text"
                        id="starting-point"
                        name="starting-point"
                        value={startingPoint}
                        onChange={(e) => setStartingPoint(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Enter starting point"
                    />
                </fieldset>

                {
                    destinations.map((d) => {
                        const isDeleteDisabled = destinations.length <= 1;
                        return (
                            <fieldset key={d.id} className="flex flex-col space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                                <label htmlFor={`destination-${d.id}`} className="text-sm font-semibold text-gray-700">Destination</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        name={`destination-${d.id}`}
                                        id={`destination-${d.id}`}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="Enter destination"
                                        value={d.name}
                                        onChange={(e) => editDestination(d.id, e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => deleteDestination(d.id)}
                                        className={`p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200 ${isDeleteDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                                        title="Remove destination"
                                        disabled={isDeleteDisabled}
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </fieldset>
                        )
                    })
                }
            </div>

            <button
                type="button"
                onClick={addDestination}
                className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-medium hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
            >
                <span className="text-xl">+</span> Add additional destination
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <fieldset className="flex flex-col space-y-1.5">
                    <label htmlFor="vehicle" className="text-sm font-semibold text-gray-700">Vehicle</label>
                    <select
                        value={vehicle}
                        onChange={(e) => setVehicle(e.target.value)}
                        name="vehicle"
                        id="vehicle"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                    >
                        <option value="">-- select --</option>
                        <option value="car">Car</option>
                        <option value="plane">Plane</option>
                        <option value="train">Train</option>
                    </select>
                </fieldset>

                <fieldset className="flex flex-col space-y-1.5">
                    <label htmlFor="expense-name" className="text-sm font-semibold text-gray-700">Expense Name</label>
                    <input
                        type="text"
                        id="expense-name"
                        name="expense-name"
                        value={expenseName}
                        onChange={(e) => handleExpenseNameChange(e)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50"
                        placeholder="Starting Point + Destination"
                    />
                </fieldset>
            </div>

            <button
                type="submit"
                className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all active:scale-[0.98] mt-4"
                disabled={isSubmiting}
            >
                Send
            </button>
            {isSuccess && (
                <p className="mt-2 text-green-500 text-center" aria-live="polite">The form has been submitted successfully</p>
            )}
            {isError && (
                <p className="mt-2 text-red-500 text-center" aria-live="polite">Something went wrong</p>
            )}
        </form>
    )
}

export default AddMileageForm;
