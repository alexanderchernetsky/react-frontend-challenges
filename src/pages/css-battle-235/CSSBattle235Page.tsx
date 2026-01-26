import React from 'react';
import {Link} from "react-router-dom";
import CSSBattleLayout from "./CSSBattleLayout/CSSBattleLayout";

const CSSBattle235Page = () => {
    return (
        <main className="flex flex-col items-center justify-center w-full p-[32px]">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">CSS Battle #235</h1>

            <section className="w-full max-w-3xl mb-4 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Challenge Description</h2>
                <p className="text-blue-800 mb-4">
                    Re-create the layout on the image.
                </p>

                <div className="flex justify-center w-full max-w-md">
                    <img
                        src="/images/css-battle-235.png"
                        alt="CSS Battle #235 Challenge"
                        className="max-w-full h-auto border border-gray-300 rounded-lg shadow-md"
                    />
                </div>
            </section>

            <div className="mt-4 w-full border-t border-gray-200">
                <CSSBattleLayout />
            </div>

            <Link to="/" className="mt-8 text-blue-600 hover:text-blue-800 transition-colors font-medium flex items-center gap-2">
                ← Back to Home
            </Link>
        </main>
    );
};

export default CSSBattle235Page;
