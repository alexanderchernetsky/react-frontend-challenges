// OBJECTIVE:
// The Holy Grail layout is a famous CSS page layout that has traditionally been hard to implement.
// It consists of a header, footer, and three columns.
// The left column contains navigation items, the middle column contains the page contents, and the right column contains ads.


const HolyGrail = () => {
    return (
        <div>
            <header>
                Header
            </header>
            <div>
                <nav>
                    Navigation
                </nav>
                <main>
                    Main Content
                </main>
                <aside>
                    Aside
                </aside>
            </div>
            <footer>
                Footer
            </footer>
        </div>
    );
};

export default HolyGrail;
