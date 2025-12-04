import {ChangeEvent, useState} from "react";
import {useForm} from "react-hook-form";
import './styles.css';


interface CreateProductForm {
    title: string;
    description: string;
    price: number;
    image: string;
}

const CreateProductPage = () => {
    const [imageURL, setImageURL] = useState<string | null>(null);

    const {register, handleSubmit, formState: {errors}} = useForm<CreateProductForm>();

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const url = URL.createObjectURL(file);
            setImageURL(url);
        }
    }

    const handleFormSubmit = (data: CreateProductForm) => {
        console.log(data);

        // todo: validate form fields, send to the server
        // todo: handle success and error states
    }

    return (
        <main className="create-product-page">
            <h1>Create New Product</h1>
            <section>
                <form id="create-product-form" onSubmit={handleSubmit(handleFormSubmit)} className="create-product-form">
                    {/* Title */}
                    <fieldset className="form-group">
                        <label htmlFor="title">Title</label>
                        <input {...register('title', {required: 'Title is required'})} name="title" type="text" id="title" placeholder="Product Title" />
                        {errors.title && <p className="text-error">{errors.title.message}</p>}
                    </fieldset>

                    {/* Description */}
                    <fieldset className="form-group">
                        <label htmlFor="description">Description</label>
                        <input {...register('description',  {required: true})} name="description" type="text" id="description" placeholder="Product Description" />
                    </fieldset>

                    {/* Price */}
                    <fieldset className="form-group">
                        <label htmlFor="price">Price</label>
                        <input {...register('price',  {required: true})} name="price" type="text" id="price" placeholder="Product Price" />
                    </fieldset>

                    {/* Image */}
                    <fieldset className="form-group">
                        <label htmlFor="product-image">Upload image</label>
                        <input {...register('image',  {required: true})} name="image" type="file" accept="image/*" id="product-image" onChange={handleFileUpload} />
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
