import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Tablist, Tab } from "evergreen-ui";
import { useTabDisplayer, useSyncTabAndRoute } from "./listing-page.hooks";
import { TAB_PANEL_SIZE } from "../../constants/sizes.consts";
import { INFO_TAB } from "./listing-page.consts";
import PageContainer from "../../components/page-container/page-container";
import { handleNavigation } from "./listing-page.utils";

const ListingPage = () => {

  const { t } = useTranslation([ "listing" ]) 
  const tabs = [ t("information"), t("gallery") ];
  const [ selectedTab, setSelectedTab ] = useState(INFO_TAB);
  const [ showTabs ] = useTabDisplayer();

  useSyncTabAndRoute(setSelectedTab)

  return (
    <PageContainer>
      { showTabs &&
        <Tablist width="100%" display="flex" className="tablist">
          {
            tabs.map((tab, index) => (
              <Tab
                key={tab}
                id={tab}
                onSelect={() => handleNavigation(index, selectedTab)}
                isSelected={index === selectedTab}
                aria-controls={`panel-${tab}`}
                flex={1}
                height={ TAB_PANEL_SIZE }
                borderRadius={0}
              >
                {tab}
              </Tab>
            ))
          }
        </Tablist>
      }
      <Outlet />
    </PageContainer>
  )
};

export default ListingPage;
