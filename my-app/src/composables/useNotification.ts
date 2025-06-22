import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export function useNotification() {
  const success = (msg: string) => {
    toast.success(msg, {
      autoClose: 2000,
      position: toast.POSITION.TOP_RIGHT,
    })
  }

  const error = (msg: string) => {
    toast.error(msg, {
      autoClose: 3000,
      position: toast.POSITION.TOP_RIGHT,
    })
  }

  const info = (msg: string) => {
    toast.info(msg, {
      autoClose: 2500,
      position: toast.POSITION.TOP_RIGHT,
    })
  }

  return { success, error, info }
}
