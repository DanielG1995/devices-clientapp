import { useDevices } from "../Hooks/useDevices";
import { Device } from '../Utils/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { Table } from "../Components/Table";
import { SelectComponent } from "../Components/SelectComponent";
import { AddButton } from "../Components/AddButton";
import { sortByOptions, typeOptions } from "../Utils/options";
import { useAlert } from "../Hooks/useAlert";
import { DeviceModal } from "../Components/DeviceModal";
import { filterBy, sortBy } from "../Helpers/helpersTable";
import { api } from "../Services/api";
import { baseUrl } from '../Utils/urls';

export const Dashboard = () => {


    const { saveDevice, device, setDevice, devices, deleteDevice, editDevice, setDevices } = useDevices();

    const { showConfirm } = useAlert();

    const [devicesDisplayed, setDevicesDisplayed] = useState<Device[]>();
    const [typeSelected, setTypeSelected] = useState<string[]>(['all']);
    const [sortBySelected, setSortBySelected] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false)


    const confirmationDialogDelete = (id: string) => {
        showConfirm('Are you sure do you want to delete this item?', deleteDevice, id);
    }

    const editItem = (device: Device) => {
        setDevice(device);
        setOpenModal(true);
    }

    const saveEdit = (deviceEdited: Device) => {
        editDevice(deviceEdited, device?.id || '');
        setOpenModal(false);
        setDevice(null);
    }

    const saveItem = (device: Device) => {
        saveDevice(device);
    }

    const loadDevices = useCallback(
        (devicesService) => {
            setDevices(devicesService);
            setDevicesDisplayed(devicesService)
        },
        [setDevices]
    )


    useEffect(() => {
        const init = async () => {
            const response = await api(baseUrl, 'GET');
            if (response?.statusText === 'OK') {
                loadDevices([...response?.data]);
            }
        }
        init();
    }, [loadDevices])


    useEffect(() => {
        const listFiltered = [...filterBy(typeSelected, devices)]
        setDevicesDisplayed([...sortBy(sortBySelected, listFiltered)]);
    }, [devices, sortBySelected, typeSelected])

    return (
        <div className="container mt-5 d-flex flex-wrap justify-content-center">
            <h1 className="col-12 text-center font__size__60">Dashboard</h1>
            <div className="col-12 d-flex flex-wrap justify-content-center p-5">
                <div className="mx-3 col-5 d-flex flex-wrap justify-content-end">
                    <SelectComponent
                        multiple={true}
                        handleChange={setTypeSelected}
                        selected={typeSelected}
                        options={[{ label: 'all', value: 'all' }, ...typeOptions]}
                        label="Device Type (Multiple)" />
                </div>
                <div className="mx-3 col-5 d-flex flex-wrap justify-content-start">
                    <SelectComponent
                        handleChange={setSortBySelected}
                        selected={sortBySelected}
                        options={sortByOptions}
                        label="Sort by: " />
                </div>

            </div>
            <div className="col-8 position-relative">
                <AddButton openModal={openModal} setOpenModal={setOpenModal} />
                <Table deleteItem={confirmationDialogDelete} editItem={editItem} data={devicesDisplayed} />
                <DeviceModal handleSave={saveItem} handleSaveEdit={saveEdit} setDevice={setDevice} device={device} open={openModal} setOpen={setOpenModal}></DeviceModal>
            </div>
        </div>
    )
}
