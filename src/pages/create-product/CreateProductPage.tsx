import {ChangeEvent, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import CustomSelect from "../../components/Select/CustomSelect";


interface CreateProductForm {
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
}

// OBJECTIVE: create an accessible form for creation a new product using react-hook-form
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
        <main className="flex flex-col justify-start items-center p-[32px]">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Product</h1>

            <section className="w-full max-w-xl mb-12 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Objective: Build a Product Creation Form</h2>
                <p className="text-blue-800 mb-4">
                    Create an accessible product creation form using <code className="bg-blue-100 px-1 rounded">react-hook-form</code>.
                </p>
                <div className="space-y-2">
                    <p className="font-medium text-blue-900">Key Requirements:</p>
                    <ul className="list-disc list-inside text-blue-800 space-y-1 ml-2">
                        <li>Implement form fields for Title, Description, Price, Category, and Image</li>
                        <li>Use <code className="bg-blue-100 px-1 rounded">react-hook-form</code> for form state and validation</li>
                        <li>Integrate a custom-built dropdown (CustomSelect) for the Category field</li>
                        <li>Implement image upload with a live preview</li>
                        <li>Ensure the form is accessible with proper labels and error messages</li>
                    </ul>
                </div>
            </section>

            <section className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <form id="create-product-form" onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col justify-start items-start gap-4">
                    {/* Title */}
                    <fieldset className="w-full flex flex-col justify-start items-start gap-1 border-0 p-0">
                        <label htmlFor="title">Title</label>
                        <input {...register('title', {required: 'Title is required'})} name="title" type="text" id="title" placeholder="Product Title" className="border p-1 rounded w-full" />
                        {errors.title && <p className="m-0 text-red-500">{errors.title.message}</p>}
                    </fieldset>

                    {/* Description */}
                    <fieldset className="w-full flex flex-col justify-start items-start gap-1 border-0 p-0">
                        <label htmlFor="description">Description</label>
                        <input {...register('description',  {required: 'Description is required'})} name="description" type="text" id="description" placeholder="Product Description" className="border p-1 rounded  w-full" />
                        {errors.description && <p className="m-0 text-red-500">{errors.description.message}</p>}
                    </fieldset>

                    {/* Price */}
                    <fieldset className="w-full flex flex-col justify-start items-start gap-1 border-0 p-0">
                        <label htmlFor="price">Price</label>
                        <input {...register('price',  {required: 'Price is required'})} name="price" type="text" id="price" placeholder="Product Price" className="border p-1 rounded  w-full" />
                        {errors.price && <p className="m-0 text-red-500">{errors.price.message}</p>}
                    </fieldset>

                    {/* Category */}
                    {/* Native select implementation - the best */}
                    {/*<fieldset className="w-full flex flex-col justify-start items-start gap-1 border-0 p-0">*/}
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
                    <div className="relative w-full">
                        <Controller name="category" control={control} rules={{required: 'Category is required'}} render={({field, fieldState}) => (
                            <>
                                <CustomSelect value={field.value} onChange={field.onChange} label="Category" options={['Clothes', 'Furniture', 'Electronics']} />
                                {fieldState.error && <p className="m-0 text-red-500">{fieldState.error.message}</p>}
                            </>
                        )} />
                    </div>

                    {/* Image */}
                    <fieldset className="w-full flex flex-col justify-start items-start gap-1 border-0 p-0">
                        <label htmlFor="product-image">Upload image</label>
                        <input {...register('image',  {required: 'Image is required'})} name="image" type="file" accept="image/*" id="product-image" onChange={handleFileUpload} className="p-1" />
                        <div>
                            {imageURL && <img src={imageURL} width={100} height={100} alt="Preview" />}
                        </div>
                        {errors.image && <p className="m-0 text-red-500">{errors.image.message}</p>}
                    </fieldset>

                    {/* Submit */}
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors  w-full">
                        Submit
                    </button>
                </form>
            </section>
        </main>
    )
}

export default CreateProductPage;
