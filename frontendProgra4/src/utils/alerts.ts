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
             })
}
