import { makeAutoObservable } from 'mobx'
import {
    getStatisticsDealerPerformanceHistory,
    getStatisticsDealerPerformanceHistoryToday,
} from '../../../services/ApiService'
import { closeModalFn, openModalFn } from '../../../utils/controllers/ModalController'
import moment from 'moment/moment'
import { getComp } from '../../../utils/utils/DI'

class SummaryStatisticsDealersStore {
    rows = []
    data = {}
    monthly = {}
    dealerSelect = []
    intervalType = ''
    month = ''
    year = ''
    weeks = []
    weeksVue = []
    currentWeek = {}
    dealers = []
    searchForFilter = false

    isLoading = true

    subpage = {
        today: 'today',
        period: 'period',
        total: 'total',
    }

    activeToggleBlockItem = this.subpage.today

    constructor() {
        this.dealersStore = getComp('DealersStore')

        makeAutoObservable(this)
    }

    getRows = ({ param, vue }) => {
        this.currentWeek = vue

        openModalFn['progress-backdrop']()
        if (this.activeToggleBlockItem === this.subpage.today) {
            getStatisticsDealerPerformanceHistoryToday(param).then((res) => {
                this.data = res
                this.rows = Object.values(res.dealers)
                this.isLoading = false
                closeModalFn['progress-backdrop']()
            })
        } else {
            getStatisticsDealerPerformanceHistory(param).then((res) => {
                this.data = res
                this.monthly = res.monthly
                this.rows = Object.values(res.dealers)
                this.isLoading = false
                closeModalFn['progress-backdrop']()
            })
        }
    }

    getDealers = () => {
        const collection = this.dealersStore.collection
        this.dealers = [{ displayName: 'Все дилеры', subjectId: '', aid: '' }, ...collection]
    }

    setSearchForFilter = (value) => {
        this.searchForFilter = value
    }

    get getChips() {
        
        if (this.month && this.year) {
            return [...this.dealerSelect, this.month, this.year]
        } else {
            return [...this.dealerSelect]
        }
    }

    getWeeksOfMonth = (year, month) => {
        let startOfMonth = moment(`${year}-${month}-01`)
            .startOf('day')
        let endOfMonth = startOfMonth
            .clone()
            .endOf('month')
            .add(1, 'days')
            .startOf('day')

        let weeks = []

        while (startOfMonth.isBefore(endOfMonth)) {
            let endOfWeek = startOfMonth
                .clone()
                .endOf('isoWeek')
                .startOf('day')
                .add(1, 'days')

            if (endOfWeek.isAfter(endOfMonth)) {
                endOfWeek = endOfMonth.clone().startOf('day')
            }

            weeks.push({
                start: startOfMonth.toISOString(),
                end: endOfWeek.toISOString(),
            })

            startOfMonth = endOfWeek
                .clone()
                .startOf('day')
        }
        this.weeks = weeks

        return weeks
    }

    clear = () => {
        this.dealerSelect = []
        this.intervalType = ''
        this.month = ''
        this.year = ''
    }

    getWeeksOfMonthVue = (year, month) => {
        
        let startOfMonth = moment(`${year}-${month}-02`).startOf('day')
        let endOfMonth = startOfMonth.clone().endOf('month').add(1, 'days').startOf('day')
        let weeks = []

        while (startOfMonth.isBefore(endOfMonth)) {
            let endOfWeek = startOfMonth.clone().endOf('isoWeek').add(1, 'days').startOf('day')

            if (endOfWeek.isAfter(endOfMonth)) {
                endOfWeek = endOfMonth.clone().startOf('day')
            }

            weeks.push({
                start: startOfMonth.toISOString(),
                end: endOfWeek.toISOString(),
            })

            startOfMonth = endOfWeek.clone().add(1, 'days').startOf('day')
        }
        this.weeksVue = weeks

        return weeks
    }

    setActiveToggleBlockItem = (value) => {
        this.clear()
        this.activeToggleBlockItem = value
    }

    setDealerSelect = (value) => {
        this.dealerSelect = value
    }
    setIntervalType = (value) => {
        this.intervalType = value
    }
    setMonth = (value) => {
        this.month = value
    }
    setYear = (value) => {
        this.year = value
    }
}

const SummaryStatisticsDealersStoreInstance = new SummaryStatisticsDealersStore()

export default SummaryStatisticsDealersStoreInstance
