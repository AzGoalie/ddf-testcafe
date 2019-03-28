import { Selector } from 'testcafe';
import { waitForReact, ReactSelector } from 'testcafe-react-selectors';
import LoginPage from './login-page.js'
import IntriguePage from './intrigue-page.js';

const loginPage = new LoginPage();
const intriguePage = new IntriguePage();

fixture`Search UI`
    // This was for testing stuff faster
    // .page`https://localhost:8993/search/catalog/#workspaces/769f0426b9784f31b128615dd9ad24ab`
    .page`https://localhost:8993/search`
    // If basic auth is setup
    // .httpAuth({ username: 'admin', password: 'admin' })
    .beforeEach(async t => {
        // Login when redirected
        // Remove this if using basic auth
        await loginPage.login('admin', 'admin');

        // Wait for intrigue to load
        await waitForReact();
    });

test('Create a new workspace and seach with a geometry', async t => {
    await intriguePage.openLeftNav();
    await intriguePage.openWorkspaces();
    await intriguePage.newWorkspace();

    const search = {
        title: 'Testcafe Basic Search',
        text: 'example text',
        location: {
            type: 'Point-Radius',
            pointRadius: {
                lat: '51.6',
                lon: '29.3'
            }
        }
    }
    await intriguePage.newBasicSearch(search);
});