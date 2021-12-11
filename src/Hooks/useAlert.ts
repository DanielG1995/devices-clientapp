import Swal, { SweetAlertIcon } from 'sweetalert2'

export const useAlert = () => {

    const showAlert = (title: string, text: string, icon: SweetAlertIcon = 'info') => {
        Swal.fire({
            icon,
            title,
            text
        })
    }

    const confirmationAlert = (title: string, actionToConfirm: CallableFunction, args: any) => {
        Swal.fire({
            title,
            showCancelButton: true,
            confirmButtonText: 'Delete',
        }).then((result) => {
            if (result.isConfirmed) {
                actionToConfirm(args);
            }
        })
    }


    return {
        showNotification: showAlert,
        showConfirm: confirmationAlert,
    }
}