import React, { useState } from "react";

import logoImg from "../../assets/logo.svg";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { useAuth } from "../../hooks/auth";

import { Container, Logo, Form, FormTitle, Message } from "./styles";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { signIn, message } = useAuth();

  return (
    <Container>
      <Logo>
        <img src={logoImg} alt="True Ecommerce" />
        <h2>True Ecommerce</h2>
      </Logo>

      <Form onSubmit={() => signIn(email, password)}>
        <FormTitle>Entrar</FormTitle>

        <Input
          type="email"
          placeholder="e-mail"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="senha"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="button" onClick={() => signIn(email, password)}>
          Acessar
        </Button>
        {!!message && <Message>{message}</Message>}
      </Form>
    </Container>
  );
};

export default SignIn;
