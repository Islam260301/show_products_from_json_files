import {useQuasar} from "quasar";

const $q = useQuasar()


export const triggerNegative = (count) => {
  $q.notify({
    position: 'top-left',
    timeout: 3000,
    color: 'warning',
    message: `Valid count is ${count}`
  })
}
export const triggerInfo = (message) => {
  $q.notify({
    position: 'top-left',
    timeout: 3000,
    color: 'info',
    message: message
  })
}
