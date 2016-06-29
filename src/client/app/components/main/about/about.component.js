import './about.css';

const aboutTemplate = `
  <main-page>
    <header-bar page-title="About"></header-bar>
    <md-content>
      <div layout="column">
        <md-card>
          <md-card-content>
            About Page
          </md-card-content>
        </md-card>
      </div>
    </md-content>
  </main-page>
`;

class AboutController {
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
  template: aboutTemplate,
  controller: AboutController,
};
