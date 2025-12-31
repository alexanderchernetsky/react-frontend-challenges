// OBJECTIVE:
// The Holy Grail layout is a famous CSS page layout that has traditionally been hard to implement.
// It consists of a header, footer, and three columns.
// The left column contains navigation items, the middle column contains the page contents, and the right column contains ads.

// Requirements:
// Implement the Holy Grail layout using just CSS. You shouldn't need to change the HTML too much.
//
// Requirements
// Header
// Stretches horizontally across the whole page.
// 60px tall.
// Columns
// Both the left and right columns have a fixed width of 100px.
// The center column is fluid-width.
// All the columns should have the same height, regardless of which column is the tallest.
// Footer
// Stretches horizontally across the whole page.
// 100px tall.
// The footer should be at the bottom of the page even if there is not enough content to fill up the viewport height.


// Notes:
// Use css grid to create 3 column layout: grid-cols-[100px_1fr_100px]
// To implement "The footer should be at the bottom of the page even if there is not enough content to fill up the viewport height." use flex flex-col min-h-screen + flex-1
const HolyGrail = () => {
    return (
        <div className="w-full flex flex-col min-h-screen">
            <header className="bg-red-500 h-[60px] flex flex-col justify-center items-center p-4">
                <h1 className="text-center">Holy Grail Layout</h1>
            </header>
            <div className="grid grid-cols-[100px_1fr_100px] flex-1">
                <nav className="bg-blue-300 p-4">
                    Navigation (left)
                </nav>
                <main className="bg-green-100 text-center p-4">
                    Main Content
                </main>
                <aside className="bg-yellow-200 p-4">
                    Aside (right)
                </aside>
            </div>
            <footer className="bg-purple-300 h-[100px] text-center p-4">
                Footer
            </footer>
        </div>
    );
};

export default HolyGrail;
