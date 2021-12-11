import { api } from '../Services/api';
import { useCallback, useState } from 'react';
import { baseUrl } from '../Utils/urls';
import { Device } from '../Utils/interfaces';
import { useAlert } from './useAlert';


export const useDevices = () => {

    const [devices, setDevices] = useState<Device[]>([]);
    const [device, setDevice] = useState<Device | null>(null);
    const { showNotification } = useAlert();

    const getDevices = useCallback(
        async () => {
            try {
                const response = await api(baseUrl, 'GET');
                if (response?.statusText === 'OK') {
                    setDevices(response?.data);
                }
            } catch (error) {
                showNotification('ERROR', '', 'error');
            }
        },
        [showNotification],
    );

    const deleteDevice = useCallback(
        async (id: string) => {
            try {
                const response = await api(`${baseUrl}/${id}`, 'DELETE');
                 if (response?.statusText === 'OK') {
                    setDevice(response?.data);
                    showNotification('', 'Deleted!', 'success');
                    setDevices(devices.filter(dev => dev.id !== id));
                }
            } catch (error) {
                showNotification('ERROR', 'Something went wrong :(', 'error');
            }
        },

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [showNotification],
    );

    const getDevice = useCallback(
        async (id: string) => {
            try {
                const response = await api(`${baseUrl}/${id}`, 'GET');
                if (response?.statusText === 'OK') {
                    setDevice(response?.data);
                }
            } catch (error) {
                showNotification('ERROR', 'Could not connect to the server', 'error');
            }
        },
        [showNotification],
    )

    const saveDevice = useCallback(
        async (data: Device) => {
            try {
                const response = await api(`${baseUrl}`, 'POST', data);
                if (response?.statusText === 'OK') {
                    showNotification('', 'Added!', 'success');
                    data.id = response?.data?.id
                    setDevices([...devices, data]);
                } else {
                    showNotification('ERROR', 'It could not be saved', 'error');
                }
            } catch (error) {
                showNotification('ERROR', 'Could not connect to the server', 'error');
            }
        },

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [showNotification],
    )

    const editDevice = useCallback(
        async (data: Device, id: string) => {
            try {
                const response = await api(`${baseUrl}/${id}`, 'PUT', data);
                if (response?.statusText === 'OK') {
                    showNotification('', 'Saved!', 'success');
                    setDevices(devices.map(dev => {
                        if (dev.id === id) {
                            return {
                                ...data,
                            }
                        }
                        return dev;
                    }));
                } else {
                    showNotification('ERROR', 'It could not be saved', 'error');
                }
            } catch (error) {
                showNotification('ERROR', 'Could not connect to the server', 'error');
            }
        },

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [showNotification],
    )
    return { getDevices, saveDevice, getDevice, device, setDevice, devices, deleteDevice, editDevice, setDevices };
}