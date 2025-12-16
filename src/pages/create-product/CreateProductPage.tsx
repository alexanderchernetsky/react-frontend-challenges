import {ChangeEvent, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import CustomSelect from "../products/CustomSelect/CustomSelect";
import './styles.css';


interface CreateProductForm {
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
}

const CreateProductPage = () => {
    const [imageURL, setImageURL] = useState<string | null>(null);

    const {control, register, handleSubmit, formState: {errors}} = useForm<CreateProductForm>();

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
                        <input {...register('description',  {required: 'Description is required'})} name="description" type="text" id="description" placeholder="Product Description" />
                        {errors.description && <p className="text-error">{errors.description.message}</p>}
                    </fieldset>

                    {/* Price */}
                    <fieldset className="form-group">
                        <label htmlFor="price">Price</label>
                        <input {...register('price',  {required: 'Price is required'})} name="price" type="text" id="price" placeholder="Product Price" />
                        {errors.price && <p className="text-error">{errors.price.message}</p>}
                    </fieldset>

                    {/* Category */}
                    {/* Native select implementation - the best */}
                    {/*<fieldset className="form-group">*/}
                    {/*    <label htmlFor="category">Category</label>*/}
                    {/*    <select*/}
                    {/*        {...register('category',  {required: true})}*/}
                    {/*        name="category"*/}
                    {/*        id="category"*/}
                    {/*        defaultValue=""*/}
                    {/*    >*/}
                    {/*        <option value="" disabled>-- Select a category --</option>*/}
                    {/*        <option value="clothes">Clothes</option>*/}
                    {/*        <option value="furniture">Furniture</option>*/}
                    {/*        <option value="electronics">Electronics</option>*/}
                    {/*    </select>*/}
                    {/*</fieldset>*/}

                    {/* Custom Dropdown integrated with react-hook-form */}
                    <Controller name="category" control={control} rules={{required: 'Category is required'}} render={({field, fieldState}) => (
                        <>
                            <CustomSelect value={field.value} onChange={field.onChange} label="Category" options={['Clothes', 'Furniture', 'Electronics']} />
                            {fieldState.error && <p className="text-error">{fieldState.error.message}</p>}
                        </>
                    )} />

                    {/* Image */}
                    <fieldset className="form-group">
                        <label htmlFor="product-image">Upload image</label>
                        <input {...register('image',  {required: 'Image is required'})} name="image" type="file" accept="image/*" id="product-image" onChange={handleFileUpload} />
                        <div>
                            {imageURL && <img src={imageURL} width={100} height={100} alt="Preview" />}
                        </div>
                        {errors.image && <p className="text-error">{errors.image.message}</p>}
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
