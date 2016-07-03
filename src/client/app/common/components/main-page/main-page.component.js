import './main-page.css';

const pageTemplate = `
  <div layout="column" layout-fill>
    <div ng-transclude="headerBar"></div>
    <div ng-transclude="subheader"></div>
    <div ng-transclude></div>
    <md-content flex>
      <div ng-transclude="content"></div>
    </md-content>
  </div>
`;

class PageController { }

export default {
  transclude: {
    headerBar: '?headerBar',
    subheader: '?mdSubheader',
    content: '?mdContent',
  },
  bindings: {},
  template: pageTemplate,
  controller: PageController,
};
