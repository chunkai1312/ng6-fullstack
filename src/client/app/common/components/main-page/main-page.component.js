import mainPageTemplate from './main-page.html';
import './main-page.css';

class MainPageController { }

export default {
  transclude: {
    headerBar: '?headerBar',
    subheader: '?mdSubheader',
    content: '?mdContent',
  },
  bindings: {},
  template: mainPageTemplate,
  controller: MainPageController,
};
