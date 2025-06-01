import Swal from "sweetalert2"
export const showSuccessAlertLogin = (message: string) => {
   return Swal.fire({
              icon: 'success',
              title: 'Login successful',
              text: message,
              timer: 2000,
              showConfirmButton: false,
            })
}
export const showErrorAlertLogin = (message: string) => {
   return Swal.fire({
              icon: 'error',
              title: 'Login failed',
              text: message,
              confirmButtonColor: '#48a6a7',
               customClass: {
                confirmButton: 'no-border-button',
              },
            })
}

export const showSuccessAlertRegister = (message: string) => {
   return Swal.fire({
              icon: 'success',
              title: 'Registration successful',
              text: message,
              timer: 2000,
              showConfirmButton: false,
            })
}

export const showErrorAlertEmpty = (message: string) => {
   return Swal.fire({
             icon: 'error',
             title: 'Invalid form',
             text: message,
           })
}

export const showErrorDuplicateEmail = (message: string) => {
   return Swal.fire({
               icon: 'warning',
               title: 'Duplicate email',
               text: message,
               confirmButtonColor: '#48a6a7',
                customClass: {
                confirmButton: 'no-border-button',
              },
             })
}

export const showWarningAlert = (message: string) => {
   return Swal.fire({
             title: 'Delete applicaion?',
             text: message,
             icon: 'warning',
             showCancelButton: true,
             confirmButtonColor: '#48a6a7',
                customClass: {
                confirmButton: 'no-border-button',
              },
             cancelButtonColor: '#d33',
             confirmButtonText: 'Yes, delete it',
             cancelButtonText: 'No, cancel',
           });
}