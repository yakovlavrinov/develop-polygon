import { makeAutoObservable } from "mobx";

type Subpage = {
    today: string;
    period: string;
    total: string;
};

class SummaryStatisticsDealersStore {
    subpage: Subpage = {
        today: "today",
        period: "period",
        total: "total",
    };

    activeToggleBlockItem: string = this.subpage.today;

    constructor() {
        makeAutoObservable(this);
    }

    setActiveToggleBlockItem = (value: string) => {
        this.activeToggleBlockItem = value;
    };
}

const SummaryStatisticsDealersStoreInstance = new SummaryStatisticsDealersStore();

export default SummaryStatisticsDealersStoreInstance;
