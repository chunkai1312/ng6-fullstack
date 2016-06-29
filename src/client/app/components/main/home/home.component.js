import './home.css';

const homeTemplate = `
  <main-page>
    <header-bar page-title="Home"></header-bar>
    <md-content>
      <div layout="column">
        Home
      </div>
    </md-content>
  </main-page>
`;

class HomeController {
  /* @ngInject */
  constructor() {

  }

  $onInit() {

  }
}

export default {
  bindings: {},
  template: homeTemplate,
  controller: HomeController,
};
