import { makeObservable, observable, action } from 'mobx';
import FormStore from '../../../utils/stores/FormStore'

const initState = {
    dealer: "",
    subpage: "",
    reportMonth: "",
    reportYear: "",
    id: ""
}

const validateData = {
    id: { required: true },
}

class SummaryStatisticsDealersFiltersStore extends FormStore {
    constructor() {
        super({ initState, validateData })
        this.param = null
        this.dateNames = [['from', 'to']]
        this.showErrors = true
        this.isValid = false
        makeObservable(this, {
            param: observable,
            isHighlighted: observable,
            makeHighlightTrue: action,
            makeHighlightFalse: action
        })
    }
    isHighlighted = false

    clear = () => {
        this.param = null
        this.setData(initState)
        this.clearSelectedFilters()
        this.makeHighlightFalse()
    }
    isHighlighted = false

    makeHighlightTrue = () => {
        if (this.data.id !== "") {
            return
        }
        this.isHighlighted = true
    }

    makeHighlightFalse = () => (this.isHighlighted = false)
}
const summaryStatisticsDealersFiltersStore = new SummaryStatisticsDealersFiltersStore()
export default summaryStatisticsDealersFiltersStore
