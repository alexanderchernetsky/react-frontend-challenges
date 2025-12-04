import {ChangeEvent, useState} from "react";
import './styles.css';


// todo: create a validated form with title, description, price, image
const CreateProductPage = () => {
    const [imageURL, setImageURL] = useState<string | null>(null);

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const url = URL.createObjectURL(file);
            setImageURL(url);
        }
    }

    return (
        <main className="create-product-page">
            <h1>Create New Product</h1>
            <section>
                <label htmlFor="product-image">Upload image</label>
                <input type="file" accept="image/*" id="product-image" onChange={handleFileUpload} />

                <div>
                    {imageURL && <img src={imageURL} width={100} height={100} alt="Preview" />}
                </div>
            </section>
        </main>
    )
}

export default CreateProductPage;
