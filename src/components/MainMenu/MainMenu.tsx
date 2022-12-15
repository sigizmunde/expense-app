import { MenuAppBar, MenuLink } from './MainMenuComponents';
import { ReactComponent as AnalyticsIcon } from '../../images/icons/menu-analytics.svg';
import { ReactComponent as CategoriesIcon } from '../../images/icons/menu-categories.svg';
import { ReactComponent as DashIcon } from '../../images/icons/menu-dash.svg';
import { ReactComponent as SettingsIcon } from '../../images/icons/menu-settings.svg';

export function MainMenu() {
  return (
    <MenuAppBar>
      <MenuLink to="/dashboard">
        <DashIcon />
        Dashboard
      </MenuLink>
      <MenuLink to="/analytics">
        <AnalyticsIcon />
        Analytics
      </MenuLink>
      <MenuLink to="/categories">
        <CategoriesIcon />
        Categories
      </MenuLink>
      <MenuLink to="/settings">
        <SettingsIcon />
        Settings
      </MenuLink>
    </MenuAppBar>
  );
}
