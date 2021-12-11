import { InputLabel, MenuItem, Select } from '@mui/material'
import { Option } from '../Utils/interfaces';

export const SelectComponent = ({ required = false, className, name, options, selected, handleChange, label, multiple = false, ...props }:
    { required?: boolean, className?: string, name?: string, options: Option[], selected?: any, handleChange?: CallableFunction, label: string, multiple?: boolean, deleteItem?: CallableFunction }) => {
    return (
        <>
            <div className="col-8 d-flex ">
                <h4> <InputLabel id='select' className="align-self-center">{label}</InputLabel> </h4>
            </div>
            <div className={(!className) ? `col-8` : className}>
                <Select
                    label=''
                    name={name}
                    multiple={multiple}
                    className={`w-100`}
                    value={selected}
                    required
                    onChange={(evt) => { (handleChange) && handleChange(evt.target.value) }}
                    {...props}
                >
                    {options.map((opt: any) => {
                        return <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                    })}
                </Select>
            </div>
        </>
    )
}
