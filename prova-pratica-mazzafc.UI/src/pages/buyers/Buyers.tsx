import { useEffect, useRef, useState } from 'react';
import { FilterSelected } from '../../types/ui/FilterBuilder';
import { AllBuyers, DeleteBuyers, NewBuyers, EditBuyers, BuyersByIdentifier } from '../../services/Buyers';
import { Buyer } from '../../types/buyers/Buyers';
import { Column } from '../../types/ui/Table';
import { GenericTable } from '../../components/ui/Table';
import { FilterBuilder } from '../../components/ui/Filter';
import { TransformData } from '../../utils/tools/TransformData';
import { Alert } from '../../utils/alert/Alert';
import Modal from '../../components/ui/Modal';
import ModalBuyer from './modal/ModalBuyers';
import axios from 'axios';
import { setGlobalLoader } from '../../contexts/LoaderContext';
import { IState, ICity } from '../../interfaces/Location';

function Buyers() {
    const modalRef = useRef<Modal>(null);

    const [name, setName] = useState('');
    const [document, setDocument] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');

    const [states, setStates] = useState<string[]>([]);
    const [citys, setCitys] = useState<string[]>([]);

    const [filters, setFilters] = useState<FilterSelected[]>([])
    const [buyers, setBuyers] = useState<Buyer[]>([]);

    const columns: Column<Buyer>[] = [
        { header: "Nome", accessor: "name" },
        { header: "CPF/CNPJ", accessor: "docNumber" },
        { header: "Cidade", accessor: "city" },
        { header: "Estado", accessor: "state" },
        { header: "Data Cadastro", accessor: "dtRegister" },
    ];

    const onLoadPage = () => {
        const encodedFilters = encodeURIComponent(JSON.stringify(filters));
        const params = `filters=${encodedFilters}`;
        AllBuyers(params, response => {
            setBuyers(response);
        })
    }

    const onGetStates = () => {
        setGlobalLoader(true);
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                const stateNames = response.data.map((state: IState) => `${state.nome} - ${state.sigla}`);
                setStates(stateNames);
            })
            .catch(error => {
                Alert('Erro ao buscar os estados', '', false, false);
            })
            .finally(() => {
                setGlobalLoader(false);
            });
    };


    const onGetCitys = (state: string) => {
        setState(state);
        setGlobalLoader(true);
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.split(' - ')[1]}/municipios`)
            .then(response => {
                const citysNames = response.data.map((city: ICity) => `${city.nome}`);
                setCitys(citysNames);
            })
            .catch(error => {
                Alert('Erro ao buscar os estados', '', false, false);
            })
            .finally(() => {
                setGlobalLoader(false);
            });
    }

    useEffect(() => {
        onLoadPage();
        onGetStates();
    }, [])

    const handleDelete = (key: string) => {
        DeleteBuyers(key, () => {
            onLoadPage();
            Alert("Sucesso!", "Item excluido com sucesso!");
        });
    }

    const onEdit = (identifier: string) => {
        BuyersByIdentifier(identifier, response => {
            setName(response.name);
            setDocument(response.docNumber);
            setState(response.state);
            setCity(response.city);
            modalRef.current?.onOpenEdit(identifier);
        })
    }

    const handleNewBuyer = () => {
        if (
            !name ||
            !document ||
            !state ||
            !city
        ) {
            Alert('Os campos "Nome do comprador", "CPF ou CNPJ", "Cidade" e "Estado" são obrigatórios!', "", false, false, true);
            return;
        }

        NewBuyers({
            name,
            docNumber: document.replace(".","").replace(".","").replace("-","").replace("/","").replace(" ",""),
            state: state,
            city
        }, () => {
            modalRef.current?.onClose();
            setName('')
            setDocument('')
            setState('')
            setCity('')
            onLoadPage();
            Alert("Comprador cadastrado com sucesso!");
        })
    }

    const handleEditBuyer = (identifier: string) => {
        if (
            !name ||
            !document ||
            !state ||
            !city
        ) {
            Alert('Os campos "Nome do comprador", "CPF ou CNPJ", "Cidade" e "Estado" são obrigatórios!', "", false, false, true);
            return;
        }

        EditBuyers({
            name,
            docNumber: document.replace(".","").replace(".","").replace("-","").replace("/","").replace(" ",""),
            state: state,
            city
        }, identifier, () => {
            modalRef.current?.onClose();
            setName('')
            setDocument('')
            setState('')
            setCity('')
            onLoadPage();
            Alert("Comprador atualizado com sucesso!");
        })
    }

    const transformedData = TransformData(buyers, ["name", "docNumber", "city", "state", "dtRegister"]);
    return (
        <div className="p-4">
            <ModalBuyer
                states={states}
                citys={citys}
                modalRef={modalRef}
                city={city}
                document={document}
                name={name}
                onEdit={i => handleEditBuyer(i)}
                onSubmit={handleNewBuyer}
                setCity={setCity}
                setDocument={setDocument}
                setName={setName}
                setState={value => onGetCitys(value)}
                state={state}
            />
            <FilterBuilder
                filters={filters}
                setFilters={setFilters}
                onFilter={() => onLoadPage()}
                onNewItem={() => modalRef.current?.onOpenNew()}
                transformDataKeys={transformedData}
                columns={columns.map(meat => ({ key: meat.accessor, name: meat.header }))}
            />
            <GenericTable
                data={buyers}
                columns={columns}
                keyField="identifier"
                enableActions
                onEdit={(key) => onEdit(`${key}`)}
                onDelete={(key) => handleDelete(String(key))}
            />
        </div>
    );
}

export default Buyers;