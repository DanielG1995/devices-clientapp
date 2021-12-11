/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal } from "react-bootstrap";
import { Device } from "../Utils/interfaces";
import { Input } from "@mui/material";
import { SelectComponent } from "./SelectComponent";
import { typeOptions } from '../Utils/options';
import { useEffect } from "react";
import { Controller, useForm } from 'react-hook-form';

export const DeviceModal = ({ open, setOpen, device, handleSave, handleSaveEdit }:
    {
        open: boolean,
        setOpen: CallableFunction,
        device: Device | null,
        handleSave: CallableFunction,
        handleSaveEdit: CallableFunction
    }) => {


    const methods = useForm({
        mode: 'onChange',
        defaultValues: { system_name: '', type:'', hdd_capacity: '' }
    });
    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (values: any) => {
        if (device) {
            handleSaveEdit(values)
        } else {
            handleSave(values);
        }
    }

    const onError = (errors: any) => {
        console.log(errors)
    }

    useEffect(() => {
        methods.reset({ ...device })
    }, [device])

    return (
        <div>
            <Modal backdrop="static" show={open} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="col-12 text-center">Device</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={methods.handleSubmit(onSubmit, onError)} className="row p-3 d-flex justify-content-center">
                        <div className="col-12 text-left py-3">
                            <h5>
                                System Name *
                            </h5>
                            <Input required className="w-100" {...methods.register("system_name")} />
                        </div>
                        <div className="col-12">
                            <h5>
                                Device type *
                            </h5>
                            <Controller
                                control={methods.control}
                                name="type"
                                render={({
                                    field: { value, onChange },
                                }) => (
                                    <SelectComponent
                                        name="type"
                                        selected={value?value:''}
                                        handleChange={onChange}
                                        required={true}
                                        className='col-12'
                                        options={[...typeOptions]}
                                        label="" />
                                )}
                            />

                        </div>
                        <div className="col-12 text-left py-3">
                            <h5>
                                HDD Capacity (GB) *
                            </h5>
                            <Input required type="number" className='w-100' {...methods.register("hdd_capacity")} />
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <Button className="mx-3" variant="primary" type="submit">
                                Save
                            </Button>
                            <Button className="mx-3" variant="danger" onClick={() => handleClose()}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Modal.Body>

            </Modal>
        </div >
    );
}
