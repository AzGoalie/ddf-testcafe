import { Selector, t } from 'testcafe';
import { ReactSelector } from 'testcafe-react-selectors';

export default class {
    constructor() {
        this.navigationTop = new IntrigueTopNavigation();
        this.navigationLeft = new IntrigueLeftNavigation;
        this.workspaces = new IntrigueWorkspaces();
        this.basicSearch = new IntrigueBasicSearch();
    }

    openLeftNav() {
        return t.click(this.navigationTop.navigator);
    }

    openWorkspaces() {
        return t.click(this.navigationLeft.workspacesButton);
    }

    newWorkspace() {
        return t.click(this.workspaces.newWorkspaceButton);
    }

    async newBasicSearch(search = {}) {
        await t.click(this.navigationTop.searchButton)
            .click(this.basicSearch.searchOptions.searchOptionsButton)
            .click(this.basicSearch.searchOptions.basicSearchOption);

        if (search.title) {
            await this.basicSearch.setQueryTitle(search.title);
        }

        if (search.text) {
            await this.basicSearch.setTextQuery(search.text);
        }

        if (search.location) {
            await this.basicSearch.setLocation(search.location);
        }

        await t.click(this.basicSearch.searchButton);
    }
}

export class IntrigueLeftNavigation {
    constructor() {
        this.workspacesButton = Selector('.choice-workspaces');
        this.uploadButton = Selector('.choice-upload');
        this.sourcesButton = Selector('.choice-sources');
        this.searchFormsButton = Selector('.choice-search-forms');
        this.resultFormsButton = Selector('.choice-result-forms');
        this.aboutButton = Selector('.choice-about');
        this.Developer = Selector('.choice-dev');
    }
}

export class IntrigueWorkspaces {
    constructor() {
        this.newWorkspaceButton = Selector('button')
            .child('div')
            .withText('New Workspace')
            .nth(0);
    }

    async openFirstWorkspace() {
        await t.click(ReactSelector('WorkspacesItemContainer'));
    }
}

export class IntrigueTopNavigation {
    constructor() {
        this.navigator = ReactSelector('NavigationLeft');
        this.searchButton = Selector('.fa-search');
    }
}

export class IntrigueSearchOptions {
    constructor() {
        this.searchOptionsButton = Selector('.is-search-interactions');
        this.textSearchOption = Selector('.interaction-text').withText('Text Search');
        this.basicSearchOption = Selector('.interaction-text').withText('Basic Search');
        this.advancedSearchOption = Selector('.interaction-text').withText('Advanced Search');
        this.searchFormsOption = Selector('.interaction-text').withText('Use Another Search Form');
        this.resetOption = Selector('.interaction-text').withText('Reset');
        this.settingsOption = Selector('.interaction-text').withText('Settings');
    }
}

export class IntrigueTextSearch {
    constructor() {
        this.queryTitle = Selector('.query-title');
        this.searchOptions = new IntrigueSearchOptions();
        this.textQuery = Selector('input').withAttribute('name', 'Text');
        this.searchButton = ReactSelector('button')
            .withProps('type', 'submit')
            .child('span')
            .withText('Search');
    }

    async setQueryTitle(title) {
        await t
            .typeText(this.queryTitle, title);
    }

    async setTextQuery(query) {
        await t
            .typeText(this.textQuery, query);
    }
}

export class IntrigueBasicSearch extends IntrigueTextSearch {
    constructor() {
        super();
        this.locationAnywhereButton = Selector('span').withText('Anywhere')
        this.locationSomewhereSpecificButton = Selector('span').withText('Somewhere Specific');
        this.locationDropdown = Selector('intrigue-react-location');

        this.locationOptions = new IntrigueLocationOptions();
        this.pointRadius = new IntriguePointRadius();
    }

    async setLocation(location) {
        if (location.type === 'Anywhere') {
            await t.click(this.locationAnywhereButton);
        } else {
            await t.click(this.locationSomewhereSpecificButton)
                .click(this.locationDropdown);
            switch (location.type) {
                case 'Line':
                    await t.click(this.locationOptions.lineOption);
                    break;
                case 'Polygon':
                    await t.click(this.locationOptions.polygonOption);
                    break;
                case 'Point-Radius':
                    await t.click(this.locationOptions.pointRadiusOption)
                        .typeText(this.pointRadius.latitudeInput, location.pointRadius.lat)
                        .typeText(this.pointRadius.longitudeInput, location.pointRadius.lon);
                    break;
                case 'Bounding Box':
                    await t.click(this.locationOptions.boundingBoxOption);
                    break;
                case 'Keyword':
                    await t.click(this.locationOptions.keywordOption);
                    break;
            }
        }
    }
}

export class IntrigueLocationOptions {
    constructor() {
        this.lineOption = Selector('.input-menu-item').withText('Line');
        this.polygonOption = Selector('.input-menu-item').withText('Polygon');
        this.pointRadiusOption = Selector('.input-menu-item').withText('Point-Radius');
        this.boundingBoxOption = Selector('.input-menu-item').withText('Bounding Box');
        this.keywordOption = Selector('.input-menu-item').withText('Keyword');
    }
}

export class IntriguePointRadius {
    constructor() {
        this.latitudeInput = Selector('.input-location input').nth(0)
        this.longitudeInput = Selector('.input-location input').nth(1);
    }
}