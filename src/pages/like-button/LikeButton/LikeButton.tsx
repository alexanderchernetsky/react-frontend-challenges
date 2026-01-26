import {LoaderCircle, Heart} from "lucide-react";
import {useState} from "react";

// Requirements
// In the button's default state, when it is clicked, it goes into the loading state and a request is made to the provided back end API which has a 50% chance of succeeding/failing.
//
// Success response: If the request was successful, the button changes to the "Liked" state.
// Failure response: Otherwise it returns to the "Default"/"Hovered" state depending on whether the cursor is still over the button. The error message from the back end API should be shown below the button.
// If the user clicks on a button in the "Liked" state, the reverse happens.
//
// Submission API
// URL: https://questions.greatfrontend.com/api/questions/like-button
// HTTP Method: POST
// Content Type: json
// Parameters
// The following fields are accepted in the request body:
//
// action: A string of either 'like' or 'unlike' depending on the desired action.
// Response
// The API has a 50% chance of succeeding (HTTP 200) or failing (HTTP 500) so as to make it easy for you to test the request failure cases. It returns a JSON payload of the following shape depending on the outcome.
//
// Success: { message: 'Success!' }
// Failure: { message: 'Unknown error during attempted {{action}}. Please try again later.!' }

// Notes:
// to make spinner spin - add animate-spin duration-900 Tailwind classes
// for accessibility - add aria-label={isLiked ? "Unlike" : "Like"}
// todo: create a re-usable Button component
// todo: to further improve - use clsx library for Tailwind class organisation
const LikeButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLikeClick = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("https://questions.greatfrontend.com/api/questions/like-button", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: isLiked ? "unlike" : "like",
                })
            });
            const json = await response.json();
            if (!response.ok) {
                console.error('Response is not OK', response);
                setError(json.message);
                return;
            }

            setIsLiked((prev) => !prev);
        } catch (error) {
            console.error('Toggle like failed', error);
            setError('Network error. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="flex flex-col justify-center items-center">
            <button
                onClick={handleLikeClick}
                aria-label={isLiked ? "Unlike" : "Like"}
                disabled={isLoading}
                aria-busy={isLoading}
                aria-describedby="like-button-error"
                className={`cursor-pointer flex flex-row justify-center items-center gap-2 font-bold p-3 rounded-full  ${isLiked ? 'text-white bg-[#FF0000] border-[#FF0000] hover:text-[#FF0000] hover:bg-white' : 'text-gray-600 border-gray-600 hover:text-[#FF0000] hover:border-[#FF0000]'} border-4  `}>
                {isLoading ? (
                    <LoaderCircle className="animate-spin duration-900" />
                ) : (
                    <Heart />
                )}
                Like
            </button>

            {error && (
                <p id="like-button-error" aria-live="polite" className="text-[#FF0000]  mt-1 text-center">
                    {error}
                </p>
            )}
        </div>
    )
}

export default LikeButton;
