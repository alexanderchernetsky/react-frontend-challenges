import {FC} from "react";
import getDiceRepresentation, {DiceNumber} from "../getDiceRepresentation";

interface DiceProps {
    num: DiceNumber;
}

const Dice: FC<DiceProps> = ({num}) => {
    const representation = getDiceRepresentation(num);

    return (
        <div  role="img"
              aria-label={`Dice showing ${num}`}
              className="grid grid-cols-3 grid-rows-3 w-20 h-20 p-2 bg-white rounded-xl shadow-inner border-2 border-gray-100 items-center justify-items-center"
        >
            {representation.map((slot, index) => (
                <div
                    key={index}
                    className={`w-3 h-3 ${slot === 1 ? 'bg-gray-800 rounded-full shadow-sm' : 'bg-transparent'}`}
                    aria-hidden={true}
                />
            ))}
        </div>
    );
}

export default Dice;
