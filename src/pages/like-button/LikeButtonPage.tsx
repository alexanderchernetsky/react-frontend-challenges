import LikeButton from "./LikeButton/LikeButton";

const LikeButtonPage = () => {
    return (
        <main className="flex flex-col items-center justify-center w-full p-[32px]">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Like Button</h1>

            <section className="w-full max-w-3xl mb-12 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Objective: Create a Like Button</h2>
                <div className="space-y-4 text-blue-800">
                    <p>
                        Implement a Like Button component that interacts with a backend API. The button should handle various states: <strong>default, hover, liked, and loading</strong>.
                    </p>
                    <div className="space-y-2">
                        <p className="font-medium text-blue-900">Functional Requirements:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li><strong>Default to Loading:</strong> When clicked in the default state, the button enters a <strong>loading</strong> state and makes a POST request to the API.</li>
                            <li><strong>Success Handling:</strong> If the API request succeeds, the button transitions to the <strong>Liked</strong> state.</li>
                            <li><strong>Failure Handling:</strong> If the API request fails, the button returns to its <strong>Default/Hovered</strong> state, and the error message from the API is displayed below it.</li>
                            <li><strong>Toggle Like:</strong> Clicking the button in the <strong>Liked</strong> state reverses the process (unliking).</li>
                            <li><strong>API Details:</strong>
                                <ul className="list-disc list-inside ml-6 mt-1">
                                    <li>URL: <code className="bg-blue-100 px-1 rounded">https://questions.greatfrontend.com/api/questions/like-button</code></li>
                                    <li>Method: <code className="font-semibold">POST</code></li>
                                    <li>Body: <code className="bg-blue-100 px-1 rounded">{"{ \"action\": \"like\" | \"unlike\" }"}</code></li>
                                    <li>Behavior: 50% success (200 OK) / 50% failure (500 Internal Server Error).</li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <p className="font-medium text-blue-900">Implementation Notes:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Use <code className="bg-blue-100 px-1 rounded">animate-spin duration-900</code> for the loading spinner.</li>
                            <li>Ensure accessibility with <code className="bg-blue-100 px-1 rounded">aria-label</code> (e.g., "Like" or "Unlike").</li>
                        </ul>
                    </div>

                    <div className="mt-6">
                        <p className="font-medium text-blue-900 mb-2">Visual States Reference:</p>
                        <img
                            src="/images/like-button-states.png"
                            alt="Like Button States"
                            className="rounded border border-blue-200 shadow-sm max-w-full"
                        />
                    </div>
                </div>
            </section>

            <section className="w-full flex flex-col items-center p-10 border-2 border-dashed border-gray-300 rounded-xl text-gray-500">
                {/* Like Button component will be implemented here */}
                    <LikeButton />
            </section>
        </main>
    );
};

export default LikeButtonPage;
