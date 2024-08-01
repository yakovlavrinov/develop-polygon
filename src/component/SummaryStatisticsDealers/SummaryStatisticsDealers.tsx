import { FC } from "react";
import { observer } from "mobx-react";
import { ToggleBlock } from "./ToggleBlock/ToggleBlock";

// import summaryStatisticsDealersStore from './store/SummaryStatisticsDealersStore'

export const SummaryStatisticsDealers: FC = observer(() => {
    return <ToggleBlock />;
});
