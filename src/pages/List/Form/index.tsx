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
  cnpj: string;
  domain: string;
  active: boolean;
}
interface IFormData extends IData {}

export default function Form({ data, onConfirm, onCancel }: IFormProps) {
  const [name, setName] = useState<string>("");
  const [cnpj, setCNPJ] = useState<string>("");
  const [domain, setDomain] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    setName(data?.name || "");
    setCNPJ(data?.cnpj || "");
    setDomain(data?.domain || "");
    setActive(data?.active || false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleConfirm = () => {
    if (onConfirm) onConfirm({ name, cnpj, domain, active });
  };
  return (
    <Container>
      <Row>
        <FormGroup>
          <Input
            placeholder="Nome da empresa"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="CNPJ da Empresa"
            value={cnpj}
            onChange={(e) => setCNPJ(e.target.value)}
          />
        </FormGroup>
      </Row>
      <FormGroup>
        <Input
          placeholder="Domínio da empresa"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Toggle
          checked={active}
          labelLeft={"Inativo"}
          labelRight={"Ativo"}
          onChange={(checked) => {
            setActive(!!checked);
          }}
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
