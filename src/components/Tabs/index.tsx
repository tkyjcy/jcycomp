import Tabs from "./tabs";
import { TabItem, TabItemProps } from "./tabItem";
import { FC } from "react";

type ITabsComponent = typeof Tabs & {
  Item: FC<TabItemProps>;
}

const TransTabs = Tabs as ITabsComponent;
TransTabs.Item = TabItem;

export default TransTabs;