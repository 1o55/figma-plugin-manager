(function(e){function t(t){for(var i,l,o=t[0],r=t[1],d=t[2],c=0,p=[];c<o.length;c++)l=o[c],s[l]&&p.push(s[l][0]),s[l]=0;for(i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i]);u&&u(t);while(p.length)p.shift()();return a.push.apply(a,d||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],i=!0,o=1;o<n.length;o++){var r=n[o];0!==s[r]&&(i=!1)}i&&(a.splice(t--,1),e=l(l.s=n[0]))}return e}var i={},s={app:0},a=[];function l(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.m=e,l.c=i,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)l.d(n,i,function(t){return e[t]}.bind(null,i));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/";var o=window["pluginManager"]=window["pluginManager"]||[],r=o.push.bind(o);o.push=t,o=o.slice();for(var d=0;d<o.length;d++)t(o[d]);var u=r;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"18f3":function(e,t,n){"use strict";var i=n("4265"),s=n.n(i);s.a},"3cf6":function(e,t,n){"use strict";var i=n("6b25"),s=n.n(i);s.a},4265:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("ac6a"),n("cadf"),n("551c"),n("097d");var i=n("8afe");n("7514");function s(){var e=!1,t=!1,n=!1,s=!1;new MutationObserver(function(){document.getElementsByClassName("nav-12").length>0&&!e&&(e=!0,window.dispatchEvent(new CustomEvent("fileBrowserLoaded"))),!document.getElementById("pluginManagerButton")&&document.getElementsByClassName("nav-12").length>0&&e&&window.dispatchEvent(new CustomEvent("fileBrowserChanged")),0===document.getElementsByClassName("nav-12").length&&e&&(e=!1,window.dispatchEvent(new CustomEvent("fileBrowserUnloaded"))),window.App._fullscreenIsReady&&window.App._state.selectedView.fullscreen&&!t&&(t=!0,window.dispatchEvent(new CustomEvent("fileLoaded"))),window.App._fullscreenIsReady&&void 0===window.App._state.selectedView.fullscreen&&t&&(t=!1,window.dispatchEvent(new CustomEvent("fileUnloaded"))),document.querySelector('div[class*="modal--header--"]')&&!n&&(n=!0,window.dispatchEvent(new CustomEvent("modalOpened",{detail:document.querySelector('div[class*="modal--header"]').innerText.trim()}))),!document.querySelector('div[class*="modal--header--"]')&&n&&(n=!1,window.dispatchEvent(new CustomEvent("modalClosed"))),window.App._state.dropdownShown&&!s&&(s=!0,window.dispatchEvent(new CustomEvent("menuOpened",{detail:{type:window.App._state.dropdownShown.type,hasMoreOptions:void 0!==Object(i["a"])(document.querySelectorAll('div[class*="multilevel_dropdown--name"]')).find(function(e){return"More"===e.innerText})}}))),!window.App._state.dropdownShown&&s&&(s=!1,window.dispatchEvent(new CustomEvent("menuClosed")))}).observe(document.getElementById("react-page"),{childList:!0,subtree:!0})}n("6762"),n("2fdb");var a={onFileBrowserLoaded:function(e){window.addEventListener("fileBrowserLoaded",function(){e()})},onFileBrowserChanged:function(e){window.addEventListener("fileBrowserChanged",function(){e()})},onFileBrowserUnloaded:function(e){window.addEventListener("fileBrowserUnloaded",function(){e()})},onFileLoaded:function(e){window.addEventListener("fileLoaded",function(){e()})},onFileUnloaded:function(e){window.addEventListener("fileUnloaded",function(){e()})},onModalOpened:function(e){window.addEventListener("modalOpened",function(t){e(t.detail)})},onModalClosed:function(e){window.addEventListener("modalClosed",function(){e()})},onMenuOpened:function(e){window.addEventListener("menuOpened",function(t){e(t.detail.type,t.detail.hasMoreOptions)})},onMoreMenuOpened:function(e){window.addEventListener("moreMenuOpened",function(t){e(t.detail.type,t.detail.hasMoreOptions)})},onMenuClosed:function(e){window.addEventListener("menuClosed",function(){e()})},createContextMenuButton:{Selection:function(e,t,n,i){l("DROPDOWN_TYPE_SELECTION_CONTEXT_MENU",e,t,n,i)},Canvas:function(e,t,n,i){l("DROPDOWN_TYPE_CANVAS_CONTEXT_MENU",e,t,n,i)}},createKeyboardShortcut:function(e,t){document.querySelector(".focus-target").onkeydown=function(n){n.preventDefault(),n.metaKey!==!e.command&&n.shiftKey!==!e.shift&&n.ctrlKey!==!e.control&&n.altKey!==!e.option&&n.key.toLowerCase()===e.key.toLowerCase()&&t()}},addTooltip:function(e,t,n){e.addEventListener("mousemove",function(){window.App._dispatch({type:n?"TOOLTIP_SHOW_AFTER_DELAY":"TOOLTIP_SHOW_IMMEDIATELY",payload:{interactive:!1,position:0,target:{kind:2,text:t},targetRect:e.getBoundingClientRect(),timeoutDelay:500}})}),e.addEventListener("click",function(){1===window.App._state.tooltip.state&&window.App._dispatch({type:"TOOLTIP_HIDE"})})}},l=function(e,t,n,s,l){a.onMenuOpened(function(a,o){if(a===e&&!o){var r=document.querySelector('div[class*="dropdown--dropdown--35dH4"]'),d=document.createElement("div");d.className="plugin-dropdown-option",d.id=t;var u=document.createElement("div");if(u.className="plugin-dropdown-option-text",u.innerText=n,d.appendChild(u),l){var c="";if(c+=l.control?"⌃":"",c+=l.option?"⌥":"",c+=l.shift?"⇧":"",c+=l.command?"⌘":"",c+=l.key?l.key.toUpperCase():"",""!==c){var p=document.createElement("div");p.className="plugin-dropdown-option-shortcut",p.innerText=c,d.appendChild(p)}}d.onclick=function(){s(),window.App._dispatch({type:"HIDE_DROPDOWN"})},r.appendChild(d),r.style.top="".concat(parseInt(r.style.top)-24,"px"),d.onmouseover=function(){var e=d.previousSibling,t=Object(i["a"])(e.classList).find(function(e){return e.includes("optionActive")});e.classList.remove(t),e.onmouseover=function(n){e.classList.add(t)}}}}),a.onMoreMenuOpened(function(a,o){if(a===e&&o){var r=document.querySelector('div[class*="multilevel_dropdown--menu"]'),d=document.createElement("div");d.className="plugin-dropdown-option",d.id=t;var u=document.createElement("div");if(u.className="plugin-dropdown-option-text",u.innerText=n,d.appendChild(u),l){var c="";if(c+=l.control?"⌃":"",c+=l.option?"⌥":"",c+=l.shift?"⇧":"",c+=l.command?"⌘":"",c+=l.key?l.key.toUpperCase():"",""!==c){var p=document.createElement("div");p.className="plugin-dropdown-option-shortcut",p.innerText=c,d.appendChild(p)}}d.onclick=function(){s(),window.App._dispatch({type:"HIDE_DROPDOWN"})};var g=Object(i["a"])(r.children).filter(function(e){return e.className.includes("dropdown--separator")}).length;r.appendChild(d),r.style.top="".concat(parseInt(r.style.top)-24-2*g,"px"),r.getBoundingClientRect().bottom+8>window.innerHeight&&(r.style.top="".concat(window.innerHeight-r.getBoundingClientRect().height-2,"px")),d.onmouseover=function(){var e=d.previousSibling,t=Object(i["a"])(e.classList).find(function(e){return e.includes("optionActive")});e.classList.remove(t),e.onmouseover=function(n){e.classList.add(t)}}}})},o=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"pluginManager"}},[n("modal",{ref:"modal",attrs:{name:"pluginManagerModal",draggable:".modal-header",width:"460",height:"auto",maxHeight:"642"},on:{opened:e.openModal,closed:e.modalClosed}},[n("div",{staticClass:"modal-header header-large"},[n("div",{staticClass:"modal-tabs"},[n("div",{staticClass:"modal-tab",class:{"active-tab":!e.installedScreenOn},on:{click:function(t){e.installedScreenOn=!1,e.detailScreenOn=!1,e.searchText=""}}},[e._v("Plugins")]),n("div",{staticClass:"modal-tab",class:{"active-tab":e.installedScreenOn},on:{click:function(t){e.installedScreenOn=!0,e.detailScreenOn=!1,e.searchText=""}}},[e._v("Installed"),e.numberOfUpdates>0?n("div",{staticClass:"update-count"},[e._v(e._s(e.numberOfUpdates))]):e._e()])]),n("div",{ref:"closeButton",staticClass:"modal-close-button",on:{click:e.hide}})]),n("div",{staticClass:"modal-content"},[!e.installedScreenOn||e.installedScreenOn&&e.installedPlugins.length>0?n("div",{staticClass:"list-screen",class:{detailScreenOn:e.detailScreenOn}},[n("div",{staticClass:"search-box"},[n("div",{staticClass:"figma-icon search"}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.searchText,expression:"searchText"}],attrs:{placeholder:"Search",spellcheck:"false"},domProps:{value:e.searchText},on:{input:function(t){t.target.composing||(e.searchText=t.target.value)}}})]),n("div",{staticClass:"plugins-list"},[e._l(e.searchedPlugins,function(t){return n("pluginItem",{key:t.id,attrs:{type:"text",plugin:t,installedPlugins:e.installedPlugins,installedScreenOn:e.installedScreenOn},on:{goToDetail:e.goToDetail,install:e.install}})}),0===e.searchedPlugins.length&&""!==e.searchText?n("div",{staticClass:"no-search-results-message"},[e._v("No results for '"+e._s(e.searchText)+"'")]):e._e()],2)]):e._e(),n("detailScreen",{class:{detailScreenOn:e.detailScreenOn},attrs:{plugin:e.selectedPlugin,installed:void 0!==e.installedPlugins.find(function(t){return t.id===e.selectedPlugin.id})},on:{backToList:function(t){e.detailScreenOn=!1},install:e.install,uninstall:e.uninstall}}),e.installedScreenOn&&0===e.installedPlugins.length?n("div",{staticClass:"empty-state"},[e._v("No plugins installed")]):e._e()],1)])],1)},d=[],u=(n("f751"),n("7f7f"),n("4917"),n("55dd"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"pluginItem",on:{click:e.goToDetail}},[n("div",{staticClass:"name"},[e._v(e._s(e.plugin.name))]),n("div",{staticClass:"author"},[e._v(e._s(e.plugin.author))]),n("div",{staticClass:"description"},[e._v(e._s(e.plugin.description))]),e.installedScreenOn&&e.hasUpdate?n("div",{staticClass:"whats-new-button"},[e._v("See what's new in version "+e._s(e.plugin.version))]):e._e(),e.installedScreenOn&&e.hasUpdate?n("div",{staticClass:"update-text"},[e._v("Updated")]):e._e(),n("button",{directives:[{name:"show",rawName:"v-show",value:!e.installed&&!e.installedScreenOn,expression:"!installed && !installedScreenOn"}],staticClass:"button",on:{click:function(t){return t.stopPropagation(),e.install(t)}}},[e._v("Install")]),n("button",{directives:[{name:"show",rawName:"v-show",value:e.installed&&!e.installedScreenOn,expression:"installed && !installedScreenOn"}],staticClass:"button",attrs:{disabled:"true"}},[e._v("Installed")]),n("div",{staticClass:"chevron"},[e._v("œ")])])}),c=[],p=n("b697"),g={props:["plugin","installedPlugins","installed","installedScreenOn"],methods:{goToDetail:function(e){this.$emit("goToDetail",this.plugin)},install:function(){this.$emit("install",this.plugin)}},computed:{installed:function(){var e=this;return void 0!==this.installedPlugins.find(function(t){return t.id===e.plugin.id})},hasUpdate:function(){var e=this,t=this.installedPlugins.find(function(t){return t.id===e.plugin.id});return void 0!==t&&p(this.plugin.version,t.version)}}},h=g,f=(n("3cf6"),n("2877")),v=Object(f["a"])(h,u,c,!1,null,null,null);v.options.__file="PluginItem.vue";var C=v.exports,m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"detail-screen"},[n("div",{staticClass:"header"},[n("div",{staticClass:"back-button",on:{click:e.backToList}},[e._v("Ŕ\t")]),n("div",{staticClass:"title"},[n("div",{staticClass:"name"},[e._v(e._s(e.plugin.name))]),n("div",{staticClass:"author"},[e._v(e._s(e.plugin.author))])]),n("button",{directives:[{name:"show",rawName:"v-show",value:!e.installed,expression:"!installed"}],staticClass:"button primary",on:{click:function(t){return t.stopPropagation(),e.install(t)}}},[e._v("Install")]),n("button",{directives:[{name:"show",rawName:"v-show",value:e.installed,expression:"installed"}],staticClass:"button",on:{click:function(t){return t.stopPropagation(),e.uninstall(t)}}},[e._v("Uninstall")])]),n("div",{staticClass:"content"},[e.plugin.images&&e.plugin.images.length>0?n("div",{staticClass:"section image-section",class:{singleImage:1===e.plugin.images.length}},[n("carousel",{ref:"carousel",attrs:{"watch-items":e.plugin.images,"prev-html":"Ŕ","next-html":"ŕ",loop:""}},e._l(e.plugin.images,function(e){return n("carousel-item",{style:{backgroundImage:"url("+e+")"}})})),n("div",{staticClass:"v-carousel-nav prev",on:{click:function(t){e.$refs.carousel.$emit("prev")}}},[e._v("Ŕ")]),n("div",{staticClass:"v-carousel-nav next",on:{click:function(t){e.$refs.carousel.$emit("next")}}},[e._v("ŕ")])],1):e._e(),e.plugin.description&&""!==e.plugin.description?n("div",{staticClass:"section"},[n("div",{staticClass:"section-title"},[e._v("Overview")]),n("div",{staticClass:"description"},[e._v(e._s(e.plugin.description))])]):e._e(),e.plugin.instructions&&""!==e.plugin.instructions?n("div",{staticClass:"section"},[n("div",{staticClass:"section-title"},[e._v("How to use")]),n("div",{staticClass:"instructions"},[e._v(e._s(e.plugin.instructions))])]):e._e(),e.plugin.updates&&e.plugin.updates.length>0?n("div",{staticClass:"section"},[n("div",{staticClass:"section-title"},[e._v("What's new")]),e._l(e.sortedUpdates,function(t){return n("div",{key:t.version,staticClass:"version"},[n("div",{staticClass:"version-number"},[e._v("Version "+e._s(t.version))]),n("div",{staticClass:"date"},[e._v(e._s(e.timeAgo.format(new Date(t.date))))]),n("div",{staticClass:"notes"},[e._v(e._s(t.notes))])])}),!e.showAllVersions&&e.plugin.updates.length>1?n("div",{staticClass:"show-all-versions-button",on:{click:function(t){e.showAllVersions=!0}}},[e._v("See all versions")]):e._e()],2):e._e(),e.plugin.github&&e.plugin.github.includes("github.com/")?n("div",{staticClass:"section"},[n("a",{staticClass:"link-button",attrs:{href:e.plugin.github,target:"_blank"}},[n("div",{staticClass:"icon"},[n("svg",{attrs:{width:"14",height:"14",viewBox:"0 0 12 12",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{d:"M6 0.146484C6.55078 0.146484 7.08203 0.21875 7.59375 0.363281C8.10547 0.503906 8.58203 0.705078 9.02344 0.966797C9.46875 1.22852 9.87305 1.54297 10.2363 1.91016C10.6035 2.27344 10.918 2.67773 11.1797 3.12305C11.4414 3.56445 11.6426 4.04102 11.7832 4.55273C11.9277 5.06445 12 5.5957 12 6.14648C12 6.79102 11.9004 7.41211 11.7012 8.00977C11.5059 8.60742 11.2285 9.15625 10.8691 9.65625C10.5098 10.1562 10.0781 10.5957 9.57422 10.9746C9.07031 11.3496 8.51172 11.6387 7.89844 11.8418C7.88672 11.8457 7.86914 11.8496 7.8457 11.8535C7.82227 11.8535 7.80469 11.8535 7.79297 11.8535C7.69922 11.8535 7.625 11.8262 7.57031 11.7715C7.51562 11.7168 7.48828 11.6445 7.48828 11.5547C7.48828 11.2773 7.48828 11.0039 7.48828 10.7344C7.49219 10.4609 7.49414 10.1855 7.49414 9.9082C7.49414 9.70898 7.46484 9.50781 7.40625 9.30469C7.34766 9.10156 7.24219 8.93164 7.08984 8.79492C7.54297 8.74414 7.93945 8.65234 8.2793 8.51953C8.62305 8.38281 8.9082 8.19531 9.13477 7.95703C9.36523 7.71875 9.53711 7.42578 9.65039 7.07812C9.76758 6.72656 9.82617 6.3125 9.82617 5.83594C9.82617 5.53125 9.77539 5.24414 9.67383 4.97461C9.57227 4.70117 9.41797 4.45117 9.21094 4.22461C9.25391 4.11523 9.28516 4.00195 9.30469 3.88477C9.32422 3.76758 9.33398 3.65039 9.33398 3.5332C9.33398 3.38086 9.31641 3.23047 9.28125 3.08203C9.25 2.92969 9.20703 2.78125 9.15234 2.63672C9.13281 2.62891 9.11133 2.625 9.08789 2.625C9.06445 2.625 9.04297 2.625 9.02344 2.625C8.89844 2.625 8.76758 2.64648 8.63086 2.68945C8.49414 2.72852 8.35742 2.7793 8.2207 2.8418C8.08789 2.90039 7.95898 2.9668 7.83398 3.04102C7.70898 3.11523 7.59766 3.18555 7.5 3.25195C7.01172 3.11523 6.51172 3.04688 6 3.04688C5.48828 3.04688 4.98828 3.11523 4.5 3.25195C4.40234 3.18555 4.29102 3.11523 4.16602 3.04102C4.04102 2.9668 3.91016 2.90039 3.77344 2.8418C3.64062 2.7793 3.50391 2.72852 3.36328 2.68945C3.22656 2.64648 3.09766 2.625 2.97656 2.625C2.95703 2.625 2.93555 2.625 2.91211 2.625C2.88867 2.625 2.86719 2.62891 2.84766 2.63672C2.79297 2.78125 2.74805 2.92969 2.71289 3.08203C2.68164 3.23047 2.66602 3.38086 2.66602 3.5332C2.66602 3.65039 2.67578 3.76758 2.69531 3.88477C2.71484 4.00195 2.74609 4.11523 2.78906 4.22461C2.58203 4.45117 2.42773 4.70117 2.32617 4.97461C2.22461 5.24414 2.17383 5.53125 2.17383 5.83594C2.17383 6.3125 2.23047 6.72461 2.34375 7.07227C2.46094 7.41992 2.63281 7.71484 2.85938 7.95703C3.08984 8.19531 3.375 8.38281 3.71484 8.51953C4.05469 8.65625 4.45117 8.75 4.9043 8.80078C4.79102 8.90234 4.70312 9.02539 4.64062 9.16992C4.58203 9.31055 4.54297 9.45508 4.52344 9.60352C4.41797 9.6543 4.30664 9.69336 4.18945 9.7207C4.07227 9.74805 3.95508 9.76172 3.83789 9.76172C3.58789 9.76172 3.38086 9.70312 3.2168 9.58594C3.05273 9.46875 2.90625 9.30859 2.77734 9.10547C2.73047 9.03125 2.67383 8.95703 2.60742 8.88281C2.54102 8.80859 2.46875 8.74219 2.39062 8.68359C2.3125 8.625 2.22852 8.57812 2.13867 8.54297C2.04883 8.50391 1.95508 8.48438 1.85742 8.48438C1.8418 8.48438 1.81836 8.48633 1.78711 8.49023C1.75586 8.49023 1.72461 8.49414 1.69336 8.50195C1.66602 8.50977 1.64062 8.52148 1.61719 8.53711C1.59375 8.55273 1.58203 8.57227 1.58203 8.5957C1.58203 8.64258 1.60938 8.68945 1.66406 8.73633C1.71875 8.7793 1.76367 8.8125 1.79883 8.83594L1.81641 8.84766C1.90234 8.91406 1.97656 8.97852 2.03906 9.04102C2.10547 9.09961 2.16406 9.16406 2.21484 9.23438C2.26562 9.30078 2.31055 9.375 2.34961 9.45703C2.39258 9.53516 2.4375 9.625 2.48438 9.72656C2.61719 10.0312 2.80273 10.2539 3.04102 10.3945C3.2832 10.5312 3.57031 10.5996 3.90234 10.5996C4.00391 10.5996 4.10547 10.5938 4.20703 10.582C4.30859 10.5664 4.41016 10.5488 4.51172 10.5293V11.5488C4.51172 11.6426 4.48242 11.7168 4.42383 11.7715C4.36914 11.8262 4.29492 11.8535 4.20117 11.8535C4.18945 11.8535 4.17188 11.8535 4.14844 11.8535C4.12891 11.8496 4.11328 11.8457 4.10156 11.8418C3.48828 11.6426 2.92969 11.3555 2.42578 10.9805C1.92188 10.6016 1.49023 10.1621 1.13086 9.66211C0.771484 9.1582 0.492188 8.60742 0.292969 8.00977C0.0976563 7.41211 0 6.79102 0 6.14648C0 5.5957 0.0703125 5.06445 0.210938 4.55273C0.355469 4.04102 0.558594 3.56445 0.820312 3.12305C1.08203 2.67773 1.39453 2.27344 1.75781 1.91016C2.125 1.54297 2.5293 1.22852 2.9707 0.966797C3.41602 0.705078 3.89453 0.503906 4.40625 0.363281C4.91797 0.21875 5.44922 0.146484 6 0.146484Z",fill:"#30C2FF"}})])]),n("div",{staticClass:"label"},[e._v("View on Github")])]),n("a",{staticClass:"link-button",attrs:{href:e.plugin.github+"/issues/new",target:"_blank"}},[n("div",{staticClass:"icon"},[n("svg",{attrs:{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{d:"M7.4375 14C6.83138 14 6.25033 13.9225 5.69434 13.7676C5.13379 13.6126 4.6097 13.3916 4.12207 13.1045C3.63444 12.8219 3.19238 12.4801 2.7959 12.0791C2.39486 11.6826 2.05306 11.2406 1.77051 10.7529C1.4834 10.2653 1.26237 9.74121 1.10742 9.18066C0.952474 8.62467 0.875 8.04362 0.875 7.4375C0.875 6.83138 0.952474 6.24805 1.10742 5.6875C1.26237 5.13151 1.4834 4.6097 1.77051 4.12207C2.05306 3.63444 2.39486 3.1901 2.7959 2.78906C3.19238 2.39258 3.63444 2.05078 4.12207 1.76367C4.6097 1.48112 5.13379 1.26237 5.69434 1.10742C6.25033 0.952474 6.83138 0.875 7.4375 0.875C8.04362 0.875 8.62695 0.952474 9.1875 1.10742C9.74349 1.26237 10.2653 1.48112 10.7529 1.76367C11.2406 2.05078 11.6849 2.39258 12.0859 2.78906C12.4824 3.1901 12.8242 3.63444 13.1113 4.12207C13.3939 4.6097 13.6126 5.13151 13.7676 5.6875C13.9225 6.24805 14 6.83138 14 7.4375C14 8.04362 13.9225 8.62467 13.7676 9.18066C13.6126 9.74121 13.3939 10.2653 13.1113 10.7529C12.8242 11.2406 12.4824 11.6826 12.0859 12.0791C11.6849 12.4801 11.2406 12.8219 10.7529 13.1045C10.2653 13.3916 9.74349 13.6126 9.1875 13.7676C8.62695 13.9225 8.04362 14 7.4375 14ZM7.4375 1.75C6.91797 1.75 6.41667 1.81836 5.93359 1.95508C5.44596 2.0918 4.99251 2.2832 4.57324 2.5293C4.14941 2.77539 3.76432 3.07161 3.41797 3.41797C3.07161 3.76432 2.77539 4.14714 2.5293 4.56641C2.2832 4.99023 2.0918 5.44368 1.95508 5.92676C1.81836 6.40983 1.75 6.91341 1.75 7.4375C1.75 7.95703 1.81836 8.45833 1.95508 8.94141C2.0918 9.42904 2.2832 9.88249 2.5293 10.3018C2.77539 10.7256 3.07161 11.1107 3.41797 11.457C3.76432 11.8034 4.14941 12.0996 4.57324 12.3457C4.99251 12.5918 5.44596 12.7832 5.93359 12.9199C6.41667 13.0566 6.91797 13.125 7.4375 13.125C7.96159 13.125 8.46517 13.0566 8.94824 12.9199C9.43132 12.7832 9.88477 12.5918 10.3086 12.3457C10.7279 12.0996 11.1107 11.8034 11.457 11.457C11.8034 11.1107 12.0996 10.7256 12.3457 10.3018C12.5918 9.88249 12.7832 9.42904 12.9199 8.94141C13.0566 8.45833 13.125 7.95703 13.125 7.4375C13.125 6.91797 13.0566 6.41439 12.9199 5.92676C12.7832 5.44368 12.5918 4.99023 12.3457 4.56641C12.0996 4.14714 11.8034 3.76432 11.457 3.41797C11.1107 3.07161 10.7279 2.77539 10.3086 2.5293C9.88477 2.2832 9.43132 2.0918 8.94824 1.95508C8.46517 1.81836 7.96159 1.75 7.4375 1.75ZM7.875 10.5H7L7 6.125H7.875L7.875 10.5ZM7.875 5.25H7V4.375H7.875V5.25Z",fill:"#30C2FF"}})])]),n("div",{staticClass:"label"},[e._v("Report a bug")])])]):e._e()])])},w=[],_=n("7913"),b=n("c50f"),O=n("7d1a"),y=n.n(O);b["a"].addLocale(y.a);var S={props:["plugin","installed"],data:function(){return{timeAgo:new b["a"]("en-US"),showAllVersions:!1}},components:{carousel:_["Carousel"],"carousel-item":_["CarouselItem"]},methods:{backToList:function(){this.$emit("backToList"),this.showAllVersions=!1},install:function(){this.$emit("install",this.plugin)},uninstall:function(){this.$emit("uninstall",this.plugin)}},computed:{latestUpdate:function(){if(this.plugin.updates&&this.plugin.updates.length>0)return this.plugin.updates.sort(function(e,t){return e=new Date(e.date),t=new Date(t.date),e>t?-1:e<t?1:0})[0]},sortedUpdates:function(){if(this.plugin.updates&&this.plugin.updates.length>0){var e=this.plugin.updates.sort(function(e,t){return e=new Date(e.date),t=new Date(t.date),e>t?-1:e<t?1:0});return this.showAllVersions?e:[e[0]]}}}},E=S,x=(n("18f3"),Object(f["a"])(E,m,w,!1,null,null,null));x.options.__file="DetailScreen.vue";var M=x.exports,P=n("a3bf"),L={components:{PluginItem:C,DetailScreen:M},data:function(){return{orgId:"",modalOpened:!1,searchText:"",selectedPlugin:{},detailScreenOn:!1,installedScreenOn:!1,plugins:[],installedPlugins:[]}},watch:{installedPlugins:function(e){localStorage.setItem("installedPlugins",JSON.stringify(e))}},mounted:function(){var e=this;null!==JSON.parse(localStorage.getItem("installedPlugins"))?this.installedPlugins=JSON.parse(localStorage.getItem("installedPlugins")):localStorage.setItem("installedPlugins",JSON.stringify([])),P.forEach(function(t){var n=new XMLHttpRequest;n.addEventListener("load",function(){var t=JSON.parse(this.responseText);t.publishDate=n.publishDate,e.plugins.push(t)}),n.open("GET",t.manifest+"?_="+(new Date).getTime()),n.send()})},computed:{searchedPlugins:function(){var e=this,t=""===this.orgId?this.plugins.filter(function(e){return!e.requiredOrgId||""===e.requiredOrgId}):this.plugins.filter(function(t){return!t.requiredOrgId||""===t.requiredOrgId||t.requiredOrgId===e.orgId});if(this.installedScreenOn){var n=t.filter(function(t){return e.installedPlugins.find(function(e){return e.id===t.id})});return n.filter(function(t){return t.name.toLowerCase().match(e.searchText.toLowerCase())}).sort(function(e,t){return new Date(t.publishDate)-new Date(e.publishDate)})}return t.filter(function(t){return t.name.toLowerCase().match(e.searchText.toLowerCase())}).sort(function(e,t){return new Date(t.publishDate)-new Date(e.publishDate)})},numberOfUpdates:function(){var e=this,t=this.installedPlugins.filter(function(t){return e.plugins.find(function(e){return e.id===t.id&&e.version!==t.version})}).length;return null!==document.querySelector("#pluginManagerButton")&&(t>0?document.querySelector("#pluginManagerButton").classList.add("has-badge"):document.querySelector("#pluginManagerButton").classList.remove("has-badge")),t}},methods:{show:function(){var e=window.App._state.currentOrgId;""===this.orgId&&null!==e&&(this.orgId=e),this.$modal.show("pluginManagerModal")},hide:function(){this.$modal.hide("pluginManagerModal")},openModal:function(){this.modalOpened=!0,document.querySelector("#pluginManagerButton").classList.add("active")},modalClosed:function(){this.installedScreenOn=!1,this.modalOpened=!1,this.detailScreenOn=!1,null!==document.querySelector("#pluginManagerButton")&&document.querySelector("#pluginManagerButton").classList.remove("active")},toggleModal:function(){this.modalOpened?this.hide():this.show()},goToDetail:function(e){if(this.selectedPlugin=e,document.querySelector(".detail-screen .content").scrollTop=0,this.installedScreenOn){var t=this.installedPlugins.map(function(t){return t.id===e.id?e:t});this.installedPlugins=t,localStorage.setItem("installedPlugins",JSON.stringify(t))}this.detailScreenOn=!0},install:function(e){this.installedPlugins.push(e);var t={type:"VISUAL_BELL_ENQUEUE",payload:{type:"installed_plugin",message:window.__figmaDesktop?"Plugin installed. Restart the app to see changes.":"Plugin installed. Refresh this page to see changes.",timeout:1e4}};!window.__figmaDesktop&&Object.assign(t.payload,{button:{text:"Refresh",action:function(){location.reload()}}}),window.App._dispatch(t)},uninstall:function(e){this.installedPlugins=this.installedPlugins.filter(function(t){return t.id!==e.id}),this.detailScreenOn=!1;var t={type:"VISUAL_BELL_ENQUEUE",payload:{type:"uninstalled_plugin",message:window.__figmaDesktop?"Plugin uninstalled. Restart the app to see changes.":"Plugin uninstalled. Refresh this page to see changes.",timeout:1e4}};!window.__figmaDesktop&&Object.assign(t.payload,{button:{text:"Refresh",action:function(){location.reload()}}}),window.App._dispatch(t)}}},T=L,D=(n("5c0b"),Object(f["a"])(T,r,d,!1,null,null,null));D.options.__file="App.vue";var I=D.exports,k=n("1881"),B=n.n(k);o["a"].config.productionTip=!1,o["a"].use(B.a),window.figmaPlugin=a;var N=document.createElement("div");N.id="pluginManagerApp",document.body.appendChild(N);var A=new o["a"]({el:"#pluginManagerApp",render:function(e){return e(I)}}),U=function(){var e=document.querySelector('[data-tooltip-text="Show notifications"]');e.parentElement.style.display="flex";var t=document.createElement("div");t.id="pluginManagerButton",t.className=A.$children[0].numberOfUpdates>0?"top-bar-button has-badge":"top-bar-button",t.innerHTML='<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 1H19V10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1ZM0 10C0 4.47715 4.47715 0 10 0H19H20V1V10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM9.5 9.5V6H10.5V9.5H14V10.5H10.5V14H9.5V10.5H6V9.5H9.5Z" fill="white"/></svg>',e.parentNode.insertBefore(t,e),t.onclick=A.$children[0].toggleModal,a.addTooltip(t,"Plugins",!0)};if(a.onFileBrowserLoaded(function(){null===document.querySelector("#pluginManagerButton")&&U()}),a.onFileBrowserChanged(function(){A.$children[0].hide(),null===document.querySelector("#pluginManagerButton")&&U()}),a.onFileBrowserUnloaded(function(){A.$children[0].hide()}),null!==document.querySelector('[data-tooltip-text="Show notifications"]')&&null===document.querySelector("#pluginManagerButton")&&U(),window.__figmaDesktop||s(),null!==JSON.parse(localStorage.getItem("installedPlugins"))){var q=JSON.parse(localStorage.getItem("installedPlugins"));q.forEach(function(e){e.css.forEach(function(e){var t=document.createElement("link");t.rel="stylesheet",t.type="text/css",t.href=e+"?_="+(new Date).getTime(),document.body.appendChild(t)}),e.js.forEach(function(e){var t=document.createElement("script");t.src=e+"?_="+(new Date).getTime(),document.body.appendChild(t)})})}},"5c0b":function(e,t,n){"use strict";var i=n("b19e"),s=n.n(i);s.a},"6b25":function(e,t,n){},a3bf:function(e){e.exports=[{id:"power-platform-theme-switcher",publishDate:"11/11/2018",manifest:"https://jachui.github.io/figma-theme-switcher/manifest.json"},{id:"pdf-export",publishDate:"9/13/2018",manifest:"https://jachui.github.io/figma-pdf-export-typescript/manifest.json"},{id:"find-and-replace",publishDate:"8/15/2018",manifest:"https://jachui.github.io/figma-find-and-replace-desktop/manifest.json"}]},b19e:function(e,t,n){}});