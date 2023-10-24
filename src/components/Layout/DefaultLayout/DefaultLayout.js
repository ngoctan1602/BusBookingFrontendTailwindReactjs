import Footer from "../Components/Footer";
import Header from "../Components/Header";

function DefaultLayout({ children }) {
    return (
        <div>
            <Header>

            </Header>

            <div className="flex justify-center bg-bg">
                {children}
            </div>
            <Footer>

            </Footer>
        </div>
    );
}

export default DefaultLayout;