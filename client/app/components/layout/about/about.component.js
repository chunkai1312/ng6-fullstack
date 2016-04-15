import './about.css';

export default {
  bindings: {},
  template: `
    <div layout="column" layout-fill>
      <header-bar title="About"></header-bar>

      <md-content flex layout-padding>
        <div layout="column">
          About
        </div>
      </md-content>
    </div>
  `,
  controller() {
    'ngInject';
  },
};
