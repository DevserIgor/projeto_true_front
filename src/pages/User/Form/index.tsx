import Button from "components/Button";
import Input from "components/Input";
import Toggle from "components/Toggle";
import React, { useEffect, useState } from "react";
import { Container, Row, FormGroup, ButtonGroup, ButtonItem } from "./styles";

interface IFormProps {
  data?: IFormData;
  onConfirm(data: IData): any;
  onCancel?: Function;
}

interface IData {
  id?: string;
  name: string;
  email: string;
  password?: string;
}
interface IFormData extends IData {}

export default function Form({ data, onConfirm, onCancel }: IFormProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  useEffect(() => {
    setName(data?.name || "");
    setEmail(data?.email || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleConfirm = () => {
    if (onConfirm) onConfirm({ name, email, password });
  };
  return (
    <Container>
      <Row>
        <FormGroup>
          <Input
            label="Nome"
            placeholder="Nome do Usuário"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
      </Row>
      <FormGroup>
        <Input
          label="Email"
          placeholder="Email do Usuário"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          label="Senha"
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>

      <ButtonGroup>
        <ButtonItem>
          <Button
            onClick={() => {
              if (onCancel) onCancel();
            }}
            color="gray"
          >
            Cancelar
          </Button>
        </ButtonItem>
        <ButtonItem>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </ButtonItem>
      </ButtonGroup>
    </Container>
  );
}
