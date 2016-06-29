import './home.css';

const homeTemplate = `
  <div layout="column" layout-fill>
    <header-bar title="Home"></header-bar>

    <md-content flex layout-padding>
      <div layout="column">
        Home
      </div>
    </md-content>
  </div>
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
