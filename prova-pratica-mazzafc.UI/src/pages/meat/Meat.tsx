import { useNavigate } from 'react-router-dom';
import { GenericTable } from '../../components/ui/Table';
import { Column } from '../../types/ui/Table';
import { DeleteMeat, NewMeat } from '../../services/Meat';
import { Alert } from '../../utils/alert/Alert';
import { FilterBuilder } from '../../components/ui/Filter';
import { TransformData } from '../../utils/tools/TransformData';
import ModalMeat from './modal/modalMeat';
import { useRef, useState } from 'react';
import Modal from '../../components/ui/Modal';
import { IOrigin } from '../../interfaces/Origin';

type Meats = {
    id: number;
    name: string;
    origin: string;
    identifier: string;
    dtRegister: string;
};

export const meats: Meats[] = [
    { id: 1, name: "Picanha", origin: "Bovina", identifier: "819c2f67-eb51-4ee1-af82-cbb4ac903838", dtRegister: "01/01/2001 10:20:30" },
    { id: 2, name: "Frango à Passarinho", origin: "Aves", identifier: "819c2f67-eb51-4ee1-af82-cbb4ac903838", dtRegister: "01/01/2001 10:20:30" },
    { id: 3, name: "Linguiça Toscana", origin: "Suína", identifier: "819c2f67-eb51-4ee1-af82-cbb4ac903838", dtRegister: "01/01/2001 10:20:30" },
    { id: 4, name: "Costela", origin: "Bovina", identifier: "819c2f67-eb51-4ee1-af82-cbb4ac903838", dtRegister: "01/01/2001 10:20:30" },
    { id: 5, name: "Coração de Frango", origin: "Aves", identifier: "819c2f67-eb51-4ee1-af82-cbb4ac903838", dtRegister: "01/01/2001 10:20:30" },
    { id: 6, name: "Alcatra", origin: "Bovina", identifier: "819c2f67-eb51-4ee1-af82-cbb4ac903838", dtRegister: "01/01/2001 10:20:30" },
    { id: 7, name: "Cupim", origin: "Bovina", identifier: "819c2f67-eb51-4ee1-af82-cbb4ac903838", dtRegister: "01/01/2001 10:20:30" },
    { id: 8, name: "Lombo", origin: "Suína", identifier: "819c2f67-eb51-4ee1-af82-cbb4ac903838", dtRegister: "01/01/2001 10:20:30" },
    { id: 9, name: "Asinha", origin: "Aves", identifier: "819c2f67-eb51-4ee1-af82-cbb4ac903838", dtRegister: "01/01/2001 10:20:30" },
    { id: 10, name: "Maminha", origin: "Bovina", identifier: "819c2f67-eb51-4ee1-af82-cbb4ac903838", dtRegister: "01/01/2001 10:20:30" },
    { id: 11, name: "Costelinha", origin: "Suína", identifier: "819c2f67-eb51-4ee1-af82-cbb4ac903838", dtRegister: "01/01/2001 10:20:30" },
];

const origins: IOrigin[] = [
    { id: 1, name: 'Bovina' },
    { id: 2, name: 'Aves' },
    { id: 3, name: 'Suína' },
    { id: 4, name: 'Peixe' },
]

function Meat() {
    const navigate = useNavigate();
    const modalRef = useRef<Modal>(null);
    const [description, setDescription] = useState("")
    const [origin, setOrigin] = useState(0)

    const columns: Column<Meats>[] = [
        { header: "#", accessor: "id" },
        { header: "Descrição", accessor: "name" },
        { header: "Origem", accessor: "origin" },
        { header: "Data Cadastro", accessor: "dtRegister" },
    ];

    const onLoadPage = () => {

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
            onLoadPage();
            Alert("Carne cadastrada com sucesso!");
        })
    }

    const transformedData = TransformData(meats, ["id", "origin", "name"]);
    return (
        <div className="p-4">
            <ModalMeat
                onSubmit={handleNewMeat}
                originSelected={origin}
                description={description}
                origins={origins}
                setDescription={value => setDescription(value)}
                setOriginSelected={id => setOrigin(id)}
                modalRef={modalRef}
            />
            <FilterBuilder
                onNewItem={() => modalRef.current?.onOpenNew()}
                transformDataKeys={transformedData}
                columns={columns.map(meat => ({ key: meat.accessor, name: meat.header }))}
            />
            <GenericTable
                data={meats}
                columns={columns}
                keyField="identifier"
                enableActions
                onEdit={(key) => navigate(`${key}`)}
                onDelete={(key) => handleDelete(String(key))}
            />
        </div>
    );
}

export default Meat;