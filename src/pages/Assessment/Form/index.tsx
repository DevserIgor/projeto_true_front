import Button from "components/Button";
import Input from "components/Input";
import React, { useEffect, useState } from "react";
import { Container, Row, FormGroup, ButtonGroup, ButtonItem } from "./styles";
import { useTheme } from "styled-components";
import InputTextArea from "components/InputTextArea";
import Rating from "components/Rating";
import moment from "moment";

interface IFormProps {
  data?: IFormData;
  onConfirm(data: IData): any;
  onCancel?: Function;
}

interface IData {
  id?: string;
  name: string;
  message: string;
  date: Date;
  stars: number;
}
interface IFormData extends IData {}

export default function Form({ data, onConfirm, onCancel }: IFormProps) {
  const theme = useTheme();

  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [stars, setStars] = useState<number>(0);

  useEffect(() => {
    setName(data?.name || "");
    setMessage(data?.message || "");
    setDate(data?.date || new Date());
    setStars(data?.stars || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleConfirm = () => {
    console.log({ name, message, date, stars });
    if (onConfirm) onConfirm({ name, message, date, stars });
  };
  return (
    <Container>
      <Row>
        <FormGroup>
          <Input
            label="Avaliador"
            placeholder="Nome do Avaliador"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="Data"
            type="date"
            placeholder="Data"
            value={moment(date).format("yyyy-MM-DD")}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="Hora"
            type="time"
            placeholder="Hora"
            value={moment(date).format("HH:mm")}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </FormGroup>
        <FormGroup>
          <Rating
            leftLabel="Muito Ruim"
            rightLabel="Muito Bom"
            half={false}
            count={5}
            value={stars}
            onChange={setStars}
            size={25}
            color2={theme.colors.green}
            color1={theme.colors.gray}
          />
        </FormGroup>
      </Row>
      <FormGroup>
        <InputTextArea
          label="Mensagem"
          placeholder="Mensagem de avaliação"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
