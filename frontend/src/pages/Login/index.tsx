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
import useAuthService from "@/services/auth";
import { authStore } from "@/stores/auth-store";
import { observer } from "mobx-react-lite";
import Cookies from "js-cookie";

export const Login = observer(() => {
  const { authentication } = useAuthService();

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
      authentication(formik.values)
        .then((resp) => {
          authStore.setToken(resp.data.token);
          authStore.setUser(resp.data.user);
          Cookies.set("token", resp.data.token);
          console.log("sucess", resp);
        })
        .catch((error) => {
          console.log("error", error);
        });
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
});
