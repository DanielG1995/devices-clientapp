import { Checkbox, Chip, InputLabel, ListItemIcon, ListItemText, MenuItem, Select } from '@mui/material'
import { Box } from '@mui/system';
import { Option } from '../Utils/interfaces';

export const SelectComponent = ({ required = false, className, name, options, selected, handleChange, label, multiple = false, ...props }:
    { required?: boolean, className?: string, name?: string, options: Option[], selected?: any, handleChange?: CallableFunction, label: string, multiple?: boolean, deleteItem?: CallableFunction }) => {

    const handleChangeSelect = (value: any) => {

        if (multiple) {
            if (value.length > 1 && value.includes('all') && value?.[value.length - 1] === 'all') {
                value = ['all'];
            } else {
                value = value?.filter((val: string) => val !== 'all');
            }
        }

        (handleChange) && handleChange(value.includes("all")
            ? (selected.length === options.length ?
                ['all'] : value) :
            ((value.length > 0) ?
                value :
                ['all']));
    }


    return (
        <>
            <div className="col-8 d-flex ">
                <h4> <InputLabel id='select' className="align-self-center">{label}</InputLabel> </h4>
            </div>
            <div className={(!className) ? `col-8` : className}>
                {(multiple) ?
                    <Select
                        label=''
                        multiple
                        name={name}
                        className={`w-100`}
                        value={selected}
                        required
                        onChange={(evt) => { handleChangeSelect(evt.target.value) }}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value: any) => (
                                    <Chip key={value} label={options?.find(opt => opt.value === value)?.label} />
                                ))}
                            </Box>
                        )}
                    >
                        {options.map((opt) => (
                            <MenuItem key={opt?.value} value={opt?.value} >
                                <ListItemIcon>
                                    <Checkbox checked={selected.indexOf(opt.value) > -1} />
                                </ListItemIcon>
                                <ListItemText primary={opt.label} />
                            </MenuItem>
                        ))}
                    </Select>
                    :
                    <Select
                        label=''
                        name={name}
                        className={`w-100`}
                        value={selected}
                        required
                        onChange={(evt) => { handleChangeSelect(evt.target.value) }}
                    >
                        {options.map((opt: any) => {
                            return <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                        })}
                    </Select>
                }
            </div>
        </>
    )
}
