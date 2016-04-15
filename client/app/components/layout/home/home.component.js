import './home.css';

export default {
  bindings: {},
  template: `
    <div layout="column" layout-fill>
      <header-bar title="Home"></header-bar>

      <md-content flex layout-padding>
        <div layout="column">
          Home
        </div>
      </md-content>
    </div>
  `,
  controller() {
    'ngInject';
  },
};
