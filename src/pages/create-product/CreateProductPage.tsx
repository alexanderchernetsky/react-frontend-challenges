import {ChangeEvent, useState} from "react";
import './styles.css';


const CreateProductPage = () => {
    const [imageURL, setImageURL] = useState<string | null>(null);

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const url = URL.createObjectURL(file);
            setImageURL(url);
        }
    }

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;

        const formData: FormData = new FormData(form);

        const title = formData.get('title');
        const description = formData.get('description');
        const price = formData.get('price');
        const image = formData.get('image');

        console.log(title);
        console.log(description);
        console.log(price);
        console.log(image);

        // todo: validate form fields, send to the server
        // todo: handle success and error states
    }

    return (
        <main className="create-product-page">
            <h1>Create New Product</h1>
            <section>
                <form id="create-product-form" onSubmit={handleFormSubmit} className="create-product-form">
                    {/* Title */}
                    <fieldset className="form-group">
                        <label htmlFor="title">Title</label>
                        <input name="title" type="text" id="title" placeholder="Product Title" />
                    </fieldset>

                    {/* Description */}
                    <fieldset className="form-group">
                        <label htmlFor="description">Description</label>
                        <input name="description" type="text" id="description" placeholder="Product Description" />
                    </fieldset>

                    {/* Price */}
                    <fieldset className="form-group">
                        <label htmlFor="price">Price</label>
                        <input name="price" type="text" id="price" placeholder="Product Price" />
                    </fieldset>

                    {/* Image */}
                    <fieldset className="form-group">
                        <label htmlFor="product-image">Upload image</label>
                        <input name="image" type="file" accept="image/*" id="product-image" onChange={handleFileUpload} />
                        <div>
                            {imageURL && <img src={imageURL} width={100} height={100} alt="Preview" />}
                        </div>
                    </fieldset>

                    {/* Submit */}
                    <button type="submit">
                        Submit
                    </button>
                </form>
               
            </section>
        </main>
    )
}

export default CreateProductPage;
