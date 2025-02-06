import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";

// const validate = values => {
//   const errors = {};

//   if(!values.name) {
//     errors.name = "Обов'язкове поле!";
//   } else if(values.name.length < 2) {
//     errors.name = "Мінімум 2 символи для заповнення";
//   }

//   if(!values.email) {
//     errors.email = "Обов'язкове поле!"
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//     errors.email = "Неправильний email адрес";
//   }

//   return errors;
// }
const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input {...props} {...field}/>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({...props, type: 'checkbox'});

  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...props} {...field}/>
        {children}
      </label>
      
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const CustomForm = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        amount: 0,
        currency: "",
        text: "",
        terms: false,
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, "Мінімум 2 символи")
          .required("Обов'язкове поле!"),
        email: Yup.string()
          .email("Неправильний email адрес")
          .required("Обов'язкове поле!"),
        amount: Yup.number().min(5, "Мінімум 5").required("Обов'язкове поле!"),
        currency: Yup.string().required("Оберіть валюту"),
        text: Yup.string().min(10, "Мінімум 10 символів"),
        terms: Yup.boolean()
          .required("Потрібна згода")
          .oneOf([true], "Потрібна згода"),
      })}
      onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}
    >
      <Form className="form">
        <h2>Відправити пожертву</h2>
        <MyTextInput
                    label="Ваше ім'я"
                    id="name"
                    name="name" 
                    type="text"
        />
        <MyTextInput
                    label="Ваша пошта"
                    id="email"
                    name="email" 
                    type="text"
        />
        <MyTextInput
                    label="Кількість"
                    id="amount"
                    name="amount" 
                    type="number"
        />
        <label htmlFor="currency">Валюта</label>
        <Field id="currency" name="currency" as="select">
          <option value="">Виберіть валюту</option>
          <option value="USD">USD</option>
          <option value="UAH">UAH</option>
          <option value="EUR">EUR</option>
        </Field>
        <ErrorMessage className="error" name="currency" component="div" />
        <label htmlFor="text">Ваше повідомлення</label>
        <Field id="text" name="text" as="textarea" />
        <ErrorMessage className="error" name="text" component="div" />
        <MyCheckbox 
                    name="terms">
          Погоджуєтесь з політикою конфіденційності?          
        </MyCheckbox>
        <button type="submit">Відправити</button>
      </Form>
    </Formik>
  );
};

export default CustomForm;
