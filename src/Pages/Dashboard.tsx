import { useDevices } from "../Hooks/useDevices";
import { Device } from '../Utils/interfaces';
import { useEffect, useState } from 'react';
import { Table } from "../Components/Table";
import { SelectComponent } from "../Components/SelectComponent";
import { AddButton } from "../Components/AddButton";
import { sortByOptions, typeOptions } from "../Utils/options";
import { useAlert } from "../Hooks/useAlert";
import { DeviceModal } from "../Components/DeviceModal";

export const Dashboard = () => {


    const {
        getDevices,
        devices,
        deleteDevice,
        device,
        setDevice,
        saveDevice,
        editDevice,
        setDevices,
    } = useDevices();

    const { showConfirm } = useAlert();

    const [devicesDisplayed, setDevicesDisplayed] = useState<Device[]>();
    const [typeSelected, setTypeSelected] = useState<string[]>(['all']);
    const [sortBySelected, setSortBySelected] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false)

    const filterByDevice = (value: string[]) => {
         if (value.length === 1 && value.includes('all') && typeSelected.includes('all')) {
            return setDevicesDisplayed([...devices]);
        }
        if ((!typeSelected.includes('all') && value.includes('all')) || (value.length === 0)) {
            setTypeSelected(['all']);
            return setDevicesDisplayed([...devices]);
        }
        if (typeSelected.includes('all') && value.includes('all')) {
            value = value.filter(val => val !== 'all');
        }
        setTypeSelected(value);
        setDevicesDisplayed(
            devices.filter(device => value?.includes(device?.type?.toUpperCase().replaceAll(' ', '')))
        );

    }

    const sortBy = (value: string) => {
        setSortBySelected(value);
        const sortedList = devices?.sort((a: any, b: any) => {
            if (a?.[value] === b?.[value]) {
                return 0;
            }
            if (isNaN(a?.[value])) {
                return a?.[value] > b?.[value] ? 1 : -1;
            } else {
                return Number(a?.[value]) - Number(b?.[value])
            }
        });
        setDevices(sortedList);
        filterByDevice(typeSelected);

    }

    const confirmationDialogDelete = (id: string) => {
        showConfirm('Are you sure do you want to delete this item?', deleteDevice, id);
    }

    const editItem = (device: Device) => {
        setDevice(device);
        setOpenModal(true);
    }

    const saveEdit = (deviceEdited: Device) => {
        editDevice(deviceEdited, device?.id || '');
        setDevice(null);
        setOpenModal(false);
    }

    const saveItem = (device: Device) => {
        saveDevice(device);
        setOpenModal(false);
        setDevice(null);
    }

    useEffect(() => {
        getDevices();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (sortBySelected !== '') {
            sortBy(sortBySelected);
        } else {
            filterByDevice(typeSelected);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [devices])

    return (
        <div className="container mt-5 d-flex flex-wrap justify-content-center">
            <h1 className="col-12 text-center fontsize40">Dashboard</h1>
            <div className="col-12 d-flex flex-wrap justify-content-center p-5">
                <div className="mx-3 col-5 d-flex flex-wrap justify-content-end">
                    <SelectComponent
                        multiple={true}
                        handleChange={filterByDevice}
                        selected={typeSelected}
                        options={[{ label: 'All', value: 'all' }, ...typeOptions]}
                        label="Device Type: " />
                </div>
                <div className="mx-3 col-5 d-flex flex-wrap justify-content-start">
                    <SelectComponent
                        handleChange={sortBy}
                        selected={sortBySelected}
                        options={sortByOptions}
                        label="Sort by: " />
                </div>

            </div>
            <div className="col-8 position-relative">
                <AddButton openModal={openModal} setOpenModal={setOpenModal} />
                <Table deleteItem={confirmationDialogDelete} editItem={editItem} data={devicesDisplayed} />
                <DeviceModal handleSave={saveItem} handleSaveEdit={saveEdit} device={device || null} open={openModal} setOpen={setOpenModal}></DeviceModal>
            </div>
        </div>
    )
}
