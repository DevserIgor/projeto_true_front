import React, { useMemo, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { uuid } from "uuidv4";
import axios from "axios";

import ContentHeader from "../../components/ContentHeader";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import listOfMonths from "../../utils/months";

import { Container, Content, Filters } from "./styles";
import BtnController from "../../components/BtnController";
import CardListItem from "../../components/CardListItem";

type Store = {
    id: string;
    cnpj: string;
    name: string;
    domain: string;
    active: boolean;
};

type ResponseStore = {
    from: number;
    to: number;
    per_page: number;
    total: number;
    current_page: number;
    prev_page: number;
    next_page: number;
    last_page: number;
    data: Store[];
};
interface IRouteParams {
    match: {
        params: {
            type: string;
        };
    };
}

interface IData {
    id: string;
    description: string;
    amountFormatted: string;
    frequency: string;
    dateFormatted: string;
    tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
    const { data, isFetching } = useQuery<ResponseStore>(
        "ListStores",
        async () => {
            const response = await axios.get(`http://localhost:3333/stores`);
            // const response = await axios.get(`${process.env.URL_BASE_API}/stores`);

            return response.data;
        }
    );
    
    const [monthSelected, setMonthSelected] = useState<number>(
        new Date().getMonth() + 1
    );
    const [yearSelected, setYearSelected] = useState<number>(
        new Date().getFullYear()
    );
    const [frequencyFilterSelected, setFrequencyFilterSelected] = useState([
        "recorrente",
        "eventual",
    ]);

    const movimentType = match.params.type;

    const pageData = useMemo(() => {
        return movimentType === "empresas"
            ? {
                  title: "Empresas",
                  lineColor: "#08f036",
                  data: gains,
              }
            : {
                  title: "Avaliações",
                  lineColor: "#08f036",
                  data: expenses,
              };
    }, [movimentType]);

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        const { data } = pageData;

        data.forEach((item) => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if (!uniqueYears.includes(year)) {
                uniqueYears.push(year);
            }
        });

        return uniqueYears.map((year) => {
            return {
                value: year,
                label: year,
            };
        });
    }, [pageData]);

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month,
            };
        });
    }, []);

    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = frequencyFilterSelected.findIndex(
            (item) => item === frequency
        );

        if (alreadySelected >= 0) {
            const filtered = frequencyFilterSelected.filter(
                (item) => item !== frequency
            );
            setFrequencyFilterSelected(filtered);
        } else {
            setFrequencyFilterSelected((prev) => [...prev, frequency]);
        }
    };

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch {
            throw new Error("invalid month value. Is accept 0 - 24.");
        }
    };

    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } catch {
            throw new Error("invalid year value. Is accept integer numbers.");
        }
    };

    useEffect(() => {
        const { data } = pageData;

        const filteredData = data.filter((item) => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return (
                month === monthSelected &&
                year === yearSelected &&
                frequencyFilterSelected.includes(item.frequency)
            );
        });

        const formattedData = filteredData.map((item) => {
            return {
                id: uuid(),
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor:
                    item.frequency === "recorrente" ? "#4E41F0" : "#E44C4E",
            };
        });

        
    }, [
        pageData,
        monthSelected,
        yearSelected,
        '',
        frequencyFilterSelected,
    ]);

    return (
        <Container>
            <ContentHeader
                title={pageData.title}
                lineColor={pageData.lineColor}
            >
                {/* <SelectInput 
                    options={months}
                    onChange={(e) => handleMonthSelected(e.target.value)} 
                    defaultValue={monthSelected}
                />
                <SelectInput 
                    options={years} 
                    onChange={(e) => handleYearSelected(e.target.value)} 
                    defaultValue={yearSelected}
                /> */}
                <BtnController title="Filtrar" />
            </ContentHeader>

            {/* <Filters>
                <button
                    type="button"
                    className={`
                    tag-filter 
                    tag-filter-recurrent
                    ${
                        frequencyFilterSelected.includes("recorrente") &&
                        "tag-actived"
                    }`}
                    onClick={() => handleFrequencyClick("recorrente")}
                >
                    Recorrentes
                </button>

                <button
                    type="button"
                    className={`
                    tag-filter 
                    tag-filter-eventual
                    ${
                        frequencyFilterSelected.includes("eventual") &&
                        "tag-actived"
                    }`}
                    onClick={() => handleFrequencyClick("eventual")}
                >
                    Eventuais
                </button>
            </Filters> */}

            <Content>
                {isFetching && <p>Carregando</p>}
                {data?.data.map((store) => {
                    return (
                        <CardListItem
                            cnpj={store.cnpj}
                            name={store.name}
                            domain={store.domain}
                            active={store.active}
                        />
                    );
                })}
            </Content>
        </Container>
    );
};

export default List;
