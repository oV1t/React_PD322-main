import TextInput from "../../common/textInput";
import {useState} from "react";
import FileInput from "../../common/fileInput";
import * as yup from "yup";
import {useFormik} from "formik";
import ImageCropperModal from "../../common/imageCropperModal";

const RegisterPage = () => {

    const initValue = {
        firstName: "Вова",
        lastName: "",
        phone: "",
        image: null
    };

    const registerSchema = yup.object({
        lastName: yup.string()
            .required("Вкажіть прізвище"),
        firstName: yup.string()
            .required("Вкажіть ім'я"),
        phone: yup.string()
            .required("Вкажіть телефон"),
        image: yup.mixed()
            .required('Картинка є обов\'язковою'),
    });

    const handleFormikSubmit = (values) => {
        //e.preventDefault();
        console.log("Submit form ", values);
    }

    const formik = useFormik({
       initialValues: initValue,
        onSubmit: handleFormikSubmit,
        validationSchema: registerSchema
    });

    const {values, touched, errors,
        handleSubmit, handleChange, setFieldValue} = formik;

    const onChangeFileHandler = (e) => {
        console.log("onChange", e.target.files);
        const file = e.target.files[0];
        if (file) {
            const imgUrl = URL.createObjectURL(file);
            setImageForCropping(imgUrl);
            setShowModal(true);
        }
        else {
            setFieldValue(e.target.name, null);
            //setData({...data, [e.target.name]: null});
            //alert("Оберіть фото");
        }
    }

    const [showModal, setShowModal] = useState(false);
    const [imageForCropping, setImageForCropping] = useState(null);

    const handleCrop = (croppedImage) => {
        //const blob = dataURItoBlob(croppedImage);
        //const file = new File([blob], 'cropped_image.png', { type: blob.type });
        setFieldValue('image', croppedImage);
        setShowModal(false);
    };

    console.log("errors ", errors);
    return (
        <>
            <h1 className={"text-center"}>Реєстрація</h1>
            <form onSubmit={handleSubmit} className={"col-md-6 offset-md-3"}>
                <TextInput label={"Прізвище"} field={"lastName"} type={"text"}
                           value={values.lastName}
                           error={errors.lastName}
                           onChange={handleChange}/>

                <TextInput label={"Ім'я"} field={"firstName"} type={"text"}
                           value={values.firstName}
                           error={errors.firstName}
                           onChange={handleChange}/>

                <TextInput label={"Телефон"} field={"phone"} type={"text"}
                           value={values.phone}
                           error={errors.phone}
                           onChange={handleChange}/>

                <FileInput label={"Фото"} field={"image"}
                           value={values.image}
                           error={errors.image}
                           onChange={onChangeFileHandler}/>

                <ImageCropperModal
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                    handleCrop={handleCrop}
                    image={imageForCropping}
                />

                <button type="submit" className="btn btn-primary">Реєструватися</button>

            </form>
        </>
    )
}

export default RegisterPage;