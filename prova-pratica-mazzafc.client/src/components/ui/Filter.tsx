import { useState } from 'react';
import { Input, SearchInput } from './Input';
import { FaPlus } from 'react-icons/fa';
import { SelectTransition } from './SelectTransition';
import { FieldValue, FilterSelected } from '../../types/ui/FilterBuilder';
import Select from './Select';
import Button from './Button';
import { IoClose } from 'react-icons/io5';
import { Alert } from '../../utils/alert/Alert';

type FilterBuilderProps = {
    columns: FieldValue[];
    transformDataKeys: Record<string, any[]>;
    onNewItem: () => void;
};

export function FilterBuilder({ columns, transformDataKeys, onNewItem }: FilterBuilderProps) {
    const [fieldSelected, setFieldSelected] = useState<string>("");
    const [conditionSelected, setConditionSelected] = useState<string>("");
    const [fieldComparisonSelected, setFieldComparisonSelected] = useState<string>("");
    const [filters, setFilters] = useState<FilterSelected[]>([]);

    const handleCancel = () => {
        setFieldSelected("");
        setConditionSelected("");
        setFieldComparisonSelected("");
    };

    const handleAddFilter = () => {
        if (
            !fieldSelected ||
            !conditionSelected ||
            !fieldComparisonSelected
        ) {
            Alert('Os campos "Campo","Condição" e "Valor" são obrigatórios!', "", false, false, true);
            return;
        }

        const fieldName = columns.find(x => x.key === fieldSelected)?.name || "";

        const newFilter: FilterSelected = {
            field: fieldName,
            condition: conditionSelected,
            comparison: fieldSelected.startsWith("dt")
                ? new Date(fieldComparisonSelected + "T00:00:00").toLocaleDateString("pt-br")
                : fieldComparisonSelected,
        };

        setFilters(prevFilters => {
            const updatedFilters = prevFilters.filter(f => f.field !== fieldName);
            return [...updatedFilters, newFilter];
        });

        handleCancel();
    };


    const handleRemoveFilter = (index: number) => {
        setFilters(prevItems => prevItems.filter((_, i) => i !== index));
    }

    const isNumber = (str: string) => {
        return !isNaN(Number(str))
    };

    return (
        <div className="p-5 w-full shadow-lg">
            <div className="grid grid-cols-3 gap-5 bg-white border-lg">
                <SearchInput
                    onClick={() => { }}
                    onChange={() => { }}
                    placeholder="Buscar pela Descrição..."
                    value=""
                />
                <div className="w-full flex items-center justify-between">
                    <div className="w-full flex items-center justify-start gap-4">
                        <SelectTransition ButtonIcon={FaPlus} ButtonName="Filtro">
                            <div className="p-5">
                                <Select
                                    onChange={(e) => setFieldSelected(e.target.value)}
                                    value={fieldSelected}
                                    label="Selecione um campo"
                                >
                                    {columns.map((column) => (
                                        <option key={column.key} value={column.key}>
                                            {column.name}
                                        </option>
                                    ))}
                                </Select>
                                <Select
                                    onChange={(e) => setConditionSelected(e.target.value)}
                                    value={conditionSelected}
                                    label="Selecione uma condição"
                                >
                                    <option value="=">Igual</option>
                                    {(isNumber(transformDataKeys[fieldSelected] && transformDataKeys[fieldSelected][0]) || fieldSelected.startsWith("dt")) && <option value=">">Maior que</option>}
                                    {(isNumber(transformDataKeys[fieldSelected] && transformDataKeys[fieldSelected][0]) || fieldSelected.startsWith("dt")) && <option value="<">Menor que</option>}
                                    {(isNumber(transformDataKeys[fieldSelected] && transformDataKeys[fieldSelected][0]) || fieldSelected.startsWith("dt")) && <option value=">=">Maior ou igual à</option>}
                                    {(isNumber(transformDataKeys[fieldSelected] && transformDataKeys[fieldSelected][0]) || fieldSelected.startsWith("dt")) && <option value="<=">Menor ou igual à</option>}
                                </Select>
                                {!fieldSelected.startsWith("dt") && (
                                    <Select
                                        onChange={(e) => setFieldComparisonSelected(e.target.value)}
                                        value={fieldComparisonSelected}
                                        label="Selecione um valor"
                                    >
                                        {transformDataKeys[fieldSelected]?.map(item => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </Select>
                                )}
                                {fieldSelected.startsWith("dt") && (
                                    <div className="mt-3">
                                        <label htmlFor="category" className="text-sm text-gray-500">
                                            Selecione um valor
                                        </label>
                                        <Input
                                            onClick={() => { }}
                                            onChange={(e) => setFieldComparisonSelected(e.target.value)}
                                            value={fieldComparisonSelected}
                                            type="date"
                                        />
                                    </div>
                                )}
                                <div className="gap-5 flex items-center justify-center mt-5">
                                    <Button onClick={handleCancel} variant="outline">
                                        Limpar
                                    </Button>
                                    <Button onClick={handleAddFilter} variant="primary">
                                        Adicionar
                                    </Button>
                                </div>
                            </div>
                        </SelectTransition>
                        <Button onClick={() => { setFilters([]) }} variant="outline">
                            Limpar
                        </Button>
                    </div>
                </div>
                <div className="w-full flex items-center justify-end gap-4">
                    <Button className='flex w-50 items-center justify-center' onClick={onNewItem} variant="outline">
                        <FaPlus /> Adicionar
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-4 mt-5">
                {filters.map((filter, index) => (
                    <div className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <span key={index} className='flex items-center justify-between'>
                            <span>
                                <b>{filter.field}</b> {filter.condition} <b>{filter.comparison}</b>
                            </span>
                            <button onClick={() => handleRemoveFilter(index)}><IoClose /></button>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
