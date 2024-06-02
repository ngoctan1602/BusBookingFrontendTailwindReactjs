import Footer from "../Components/Footer";
import Header from "../Components/Header";

function DefaultLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header>

            </Header>

            <div className="flex justify-center bg-bg flex-1">
                {children}
            </div>
            <Footer>

            </Footer>
        </div>
    );
}

export default DefaultLayout;