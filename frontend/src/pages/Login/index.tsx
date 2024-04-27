import { InputLabel, TextField } from "@mui/material";
import {
  ButtonStyled,
  Container,
  Form,
  GroupButton,
  InputGroup,
  Section,
  Title,
} from "./styles";
import { formikProps } from "@/utils/formikProps";
import * as Yup from "yup";
import { useFormik } from "formik";

const Login = () => {
  const formikValidation = Yup.object().shape({
    email: Yup.string()
      .email("E-mail inválido")
      .required("O e-mail é obrigatório"),
    password: Yup.string().required("O senha é obrigatória"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formikValidation,
    onSubmit: () => {
      console.log(formik.values);
      // supportService
      //   .createSupportForm(formData)
      //   .then((resp) => {
      //     snackbar(resp.success, "success");
      //     setTimeout(() => {
      //       formik.resetForm(formik.initialValues);
      //       setTechnicalForm(false);
      //     }, 200);
      //   })
      //   .catch((error) => {
      //     const erro = error.response.data.errors;
      //     snackbar(erro[Object.keys(erro)[0]], "error");
      //   });
    },
  });

  return (
    <>
      <Container>
        <Section bgColor="#004080">
          <h1>Bem vindo!</h1>
        </Section>

        <Section>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Title>Faça seu login</Title>

            <InputGroup>
              <InputLabel>Usuário</InputLabel>
              <TextField
                {...formikProps("email", formik)}
                name="email"
                placeholder="Digite seu e-mail"
                fullWidth
                type="email"
                size={"small"}
                required
              />
            </InputGroup>

            <div>
              <InputLabel>Senha</InputLabel>
              <TextField
                {...formikProps("password", formik)}
                name="password"
                placeholder="Digite sua senha"
                fullWidth
                type="password"
                size={"small"}
                required
              />
            </div>

            <GroupButton>
              <ButtonStyled type="submit" variant="contained">
                Entrar
              </ButtonStyled>

              <a href="#">Cadastre-se agora!</a>
            </GroupButton>
          </Form>
        </Section>
      </Container>
    </>
  );
};

export default Login;
