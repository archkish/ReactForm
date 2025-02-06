
import { Formik, Form, Field, ErrorMessage } from "formik";
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
      onSubmit = {(values) => console.log(JSON.stringify(values, null, 2))}
    >
      <Form className="form">
        <h2>Відправити пожертву</h2>
        <label htmlFor="name">Ваше ім'я</label>
        <Field
          id="name"
          name="name"
          type="text"
        />
        <ErrorMessage className="error" name="name" component="div"/>
        <label htmlFor="email">Ваша пошта</label>
        <Field
          id="email"
          name="email"
          type="email"
        />
        <ErrorMessage className="error" name="email" component="div"/>
        <label htmlFor="amount">Кількість</label>
        <Field
          id="amount"
          name="amount"
          type="number"

        />
        <ErrorMessage className="error" name="amount" component="div"/>
        <label htmlFor="currency">Валюта</label>
        <Field
          id="currency"
          name="currency"
          as="select"
        >
          <option value="">Виберіть валюту</option>
          <option value="USD">USD</option>
          <option value="UAH">UAH</option>
          <option value="EUR">EUR</option>
        </Field>
        <ErrorMessage className="error" name="currency" component="div"/> 
        <label htmlFor="text">Ваше повідомлення</label>
        <Field
          id="text"
          name="text"
          as="textarea"
        />
        <ErrorMessage className="error" name="text" component="div"/>
        <label className="checkbox">
          <Field
            name="terms"
            type="checkbox"
          />
          Погоджуєтесь з політикою конфіденційності?
        </label>
        <ErrorMessage className="error" name="terms" component="div"/>
        <button type="submit">Відправити</button>
      </Form>
    </Formik>
  );
};

export default CustomForm;
