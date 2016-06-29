import './home.css';

const homeTemplate = `
  <main-page>
    <header-bar page-title="Home"></header-bar>
    <md-content>
      <div layout="column">
        <md-card>
          <md-card-content>
            Home Page
          </md-card-content>
        </md-card>
      </div>
    </md-content>
  </main-page>
`;

class HomeController {
  /* @ngInject */
  constructor() {
    // TODO
  }

  $onInit() {
    // TODO
  }
}

export default {
  bindings: {},
  template: homeTemplate,
  controller: HomeController,
};
