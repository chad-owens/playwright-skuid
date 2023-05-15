import { test as base } from '@playwright/test';
import { PagesList } from './pages-list';
import { AppsList } from './apps-list';
import { DesignList } from './design-list';
import { Login } from './login';


// Declare the types
type MyFixtures = {
  pagesList: PagesList;
  appsList: AppsList;
  designList: DesignList;
  login: Login;
};

// Extend base tests and add page objects
export const test = base.extend<MyFixtures>({

  pagesList: async ({ page }, use) => {
    await use(new PagesList(page));
  },
  appsList: async ({ page }, use) => {
    await use(new AppsList(page));
  },
  designList: async ({ page }, use) => {
    await use(new DesignList(page));
  },
  login: async ({ page }, use) => {
    await use(new Login(page));
  }

});

export { expect } from '@playwright/test';