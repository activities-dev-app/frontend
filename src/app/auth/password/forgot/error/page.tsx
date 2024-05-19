import Image from "next/image";
import image from "../images/undraw_no_data_re_kwbl.svg";

export default function Page() {
    return (
        <div className="error">
            <h1 className="title">Error!</h1>

            <div className="success__image">
                <Image
                    src={image}
                    alt="Envelope with card showing a checkmark icon"
                    width={200}
                />
            </div>

            <h2 className="main-text">The informed email does not exist in our database.</h2>

            <p className="secondary-text">Please double check and try again.</p>
        </div>
    );
}