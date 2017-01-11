/*
Copyright 2016 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

export default class View {
  constructor(containerId, renderBeforeVisible = false) {
    this._containerId = containerId;
    this._container = document.getElementById(this._containerId);
    this._needsRender = renderBeforeVisible;
  }

  render() {
    // override this
  }

  set visible(vis) {
    if (vis && !this.visible && this._needsRender) {
      // becoming visible, update
      this.render();
    }
    if (vis) {
      this._container.removeAttribute('hidden');
    } else {
      this._container.setAttribute('hidden', true);
    }
  }

  get visible() {
    return !this._container.hasAttribute('hidden');
  }

}
