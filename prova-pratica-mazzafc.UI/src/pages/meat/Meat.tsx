import { useNavigate } from 'react-router-dom';
import { GenericTable } from '../../components/ui/Table';
import { Column } from '../../types/ui/Table';
import { AllMeats, DeleteMeat, EditMeat, MeatByIdentifier, NewMeat } from '../../services/Meat';
import { Alert } from '../../utils/alert/Alert';
import { FilterBuilder } from '../../components/ui/Filter';
import { TransformData } from '../../utils/tools/TransformData';
import ModalMeat from './modal/ModalMeat';
import { useEffect, useRef, useState } from 'react';
import Modal from '../../components/ui/Modal';
import { IOrigin } from '../../interfaces/Origin';
import { Meats } from '../../types/Meat/Meat';
import { AllOrigins } from '../../services/Origin';
import { FilterSelected } from '../../types/ui/FilterBuilder';

function Meat() {
    const modalRef = useRef<Modal>(null);
    const [description, setDescription] = useState("")
    const [origin, setOrigin] = useState(0)
    const [meats, setmMats] = useState<Meats[]>([])
    const [origins, setOrigins] = useState<IOrigin[]>([])
    const [filters, setFilters] = useState<FilterSelected[]>([])

    const columns: Column<Meats>[] = [
        { header: "Descrição", accessor: "name" },
        { header: "Origem", accessor: "origin" },
        { header: "Data Cadastro", accessor: "dtRegister" },
    ];

    const onLoadPage = () => {
        const encodedFilters = encodeURIComponent(JSON.stringify(filters));
        const params = `filters=${encodedFilters}`;
        AllMeats(params,response => {
            setmMats(response);
        })
    }

    const handleDelete = (key: string) => {
        DeleteMeat(key, () => {
            onLoadPage();
            Alert("Sucesso!", "Item excluido com sucesso!");
        });
    }

    const handleNewMeat = () => {
        if (!description || !origin) {
            Alert('Os campos "Descrição da carne" e "Origem da carne", são obrigatórios!', "", false, false, true);
            return;
        }

        NewMeat({
            description,
            origin
        }, () => {
            modalRef.current?.onClose();
            setOrigin(0);
            setDescription('');
            onLoadPage();
            Alert("Carne cadastrada com sucesso!");
        })
    }

    useEffect(() => {
        onLoadPage();
        AllOrigins(response => setOrigins(response));
    }, [])

    const onEdit = (identifier: string) => {
        MeatByIdentifier(identifier, response => {
            setOrigin(response.originId);
            setDescription(response.name);
            modalRef.current?.onOpenEdit(identifier);
        })
    }

    const handleEditMeat = (identifier: string) => {
        if (!description || !origin) {
            Alert('Os campos "Descrição da carne" e "Origem da carne", são obrigatórios!', "", false, false, true);
            return;
        }
        EditMeat({
            description,
            origin
        }, identifier, () => {
            modalRef.current?.onClose();
            setOrigin(0);
            setDescription('');
            onLoadPage();
            Alert("Carne editada com sucesso!");
        })
    }

    const transformedData = TransformData(meats, ["id", "origin", "name"]);
    return (
        <div className="p-4">
            <ModalMeat
                onEdit={i => handleEditMeat(i)}
                onSubmit={handleNewMeat}
                originSelected={origin}
                description={description}
                origins={origins}
                setDescription={value => setDescription(value)}
                setOriginSelected={id => setOrigin(id)}
                modalRef={modalRef}
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
                data={meats}
                columns={columns}
                keyField="identifier"
                enableActions
                onEdit={(key) => onEdit(`${key}`)}
                onDelete={(key) => handleDelete(String(key))}
            />
        </div>
    );
}

export default Meat;