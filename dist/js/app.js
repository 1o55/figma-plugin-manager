(function(e){function t(t){for(var i,l,o=t[0],r=t[1],d=t[2],u=0,p=[];u<o.length;u++)l=o[u],s[l]&&p.push(s[l][0]),s[l]=0;for(i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i]);c&&c(t);while(p.length)p.shift()();return a.push.apply(a,d||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],i=!0,o=1;o<n.length;o++){var r=n[o];0!==s[r]&&(i=!1)}i&&(a.splice(t--,1),e=l(l.s=n[0]))}return e}var i={},s={app:0},a=[];function l(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.m=e,l.c=i,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)l.d(n,i,function(t){return e[t]}.bind(null,i));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],r=o.push.bind(o);o.push=t,o=o.slice();for(var d=0;d<o.length;d++)t(o[d]);var c=r;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"18f3":function(e,t,n){"use strict";var i=n("70bd"),s=n.n(i);s.a},2856:function(e,t,n){},"3cf6":function(e,t,n){"use strict";var i=n("7795"),s=n.n(i);s.a},"56d7":function(e,t,n){"use strict";n.r(t);n("ac6a"),n("cadf"),n("551c"),n("097d");var i=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"pluginManager"}},[n("modal",{ref:"modal",attrs:{name:"pluginManagerModal",draggable:".modal-header",width:"460",height:"auto",maxHeight:"642"},on:{opened:e.openModal,closed:e.modalClosed}},[n("div",{staticClass:"modal-header header-large"},[n("div",{staticClass:"modal-tabs"},[n("div",{staticClass:"modal-tab",class:{"active-tab":!e.installedScreenOn},on:{click:function(t){e.installedScreenOn=!1,e.detailScreenOn=!1,e.searchText=""}}},[e._v("Plugins")]),n("div",{staticClass:"modal-tab",class:{"active-tab":e.installedScreenOn},on:{click:function(t){e.installedScreenOn=!0,e.detailScreenOn=!1,e.searchText=""}}},[e._v("Installed")])]),n("div",{ref:"closeButton",staticClass:"modal-close-button",on:{click:e.hide}})]),n("div",{staticClass:"modal-content"},[!e.installedScreenOn||e.installedScreenOn&&e.installedPlugins.length>0?n("div",{staticClass:"list-screen",class:{detailScreenOn:e.detailScreenOn}},[n("div",{staticClass:"search-box"},[n("div",{staticClass:"search-icon"},[e._v("ō")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.searchText,expression:"searchText"}],attrs:{placeholder:"Search",spellcheck:"false"},domProps:{value:e.searchText},on:{input:function(t){t.target.composing||(e.searchText=t.target.value)}}})]),n("div",{staticClass:"plugins-list-scroll-container"},[0===e.searchedPlugins.length&&""!==e.searchText?n("div",{staticClass:"empty-message"},[e._v("No results for '"+e._s(e.searchText)+"'")]):e._e(),e._l(e.searchedPlugins,function(t){return n("pluginItem",{key:t.id,attrs:{type:"text",plugin:t,installed:void 0!==e.installedPlugins.find(function(e){return e.id===t.id}),installedScreenOn:e.installedScreenOn},on:{goToDetail:e.goToDetail,install:e.install}})})],2)]):e._e(),n("detailScreen",{class:{detailScreenOn:e.detailScreenOn},attrs:{plugin:e.selectedPlugin,installed:void 0!==e.installedPlugins.find(function(t){return t.id===e.selectedPlugin.id})},on:{backToList:function(t){e.detailScreenOn=!1},install:e.install,uninstall:e.uninstall}}),e.installedScreenOn&&0===e.installedPlugins.length?n("div",{staticClass:"no-installed-message"},[e._v("No plugins installed")]):e._e()],1)])],1)},a=[],l=(n("7514"),n("7f7f"),n("4917"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"pluginItem",on:{click:e.goToDetail}},[n("div",{staticClass:"name"},[e._v(e._s(e.plugin.name))]),n("div",{staticClass:"author"},[e._v(e._s(e.plugin.author))]),n("div",{staticClass:"description"},[e._v(e._s(e.plugin.description))]),n("button",{directives:[{name:"show",rawName:"v-show",value:!e.installed&&!e.installedScreenOn,expression:"!installed && !installedScreenOn"}],on:{click:function(t){return t.stopPropagation(),e.install(t)}}},[e._v("Install")]),n("button",{directives:[{name:"show",rawName:"v-show",value:e.installed&&!e.installedScreenOn,expression:"installed && !installedScreenOn"}],attrs:{disabled:"true"}},[e._v("Installed")]),n("div",{staticClass:"chevron"},[e._v("œ")])])}),o=[],r={props:["plugin","installed","installedScreenOn"],methods:{goToDetail:function(e){this.$emit("goToDetail",this.plugin)},install:function(){this.$emit("install",this.plugin)}}},d=r,c=(n("3cf6"),n("2877")),u=Object(c["a"])(d,l,o,!1,null,null,null);u.options.__file="PluginItem.vue";var p=u.exports,C=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"detail-screen"},[n("div",{staticClass:"header"},[n("div",{staticClass:"back-button",on:{click:e.backToList}},[e._v("Ŕ\t")]),n("div",{staticClass:"title"},[n("div",{staticClass:"name"},[e._v(e._s(e.plugin.name))]),n("div",{staticClass:"author"},[e._v(e._s(e.plugin.author))])]),n("button",{directives:[{name:"show",rawName:"v-show",value:!e.installed,expression:"!installed"}],staticClass:"primary",on:{click:function(t){return t.stopPropagation(),e.install(t)}}},[e._v("Install")]),n("button",{directives:[{name:"show",rawName:"v-show",value:e.installed,expression:"installed"}],on:{click:function(t){return t.stopPropagation(),e.uninstall(t)}}},[e._v("Uninstall")])]),n("div",{staticClass:"content"},[e.plugin.images&&e.plugin.images.length>0?n("div",{staticClass:"section image-section",class:{singleImage:1===e.plugin.images.length}},[n("carousel",{ref:"carousel",attrs:{"watch-items":e.plugin.images,"prev-html":"Ŕ","next-html":"ŕ",loop:""}},e._l(e.plugin.images,function(e){return n("carousel-item",{style:{backgroundImage:"url("+e+")"}})})),n("div",{staticClass:"v-carousel-nav prev",on:{click:function(t){e.$refs.carousel.$emit("prev")}}},[e._v("Ŕ")]),n("div",{staticClass:"v-carousel-nav next",on:{click:function(t){e.$refs.carousel.$emit("next")}}},[e._v("ŕ")])],1):e._e(),e.plugin.description&&""!==e.plugin.description?n("div",{staticClass:"section"},[n("div",{staticClass:"section-title"},[e._v("Overview")]),n("div",{staticClass:"description"},[e._v(e._s(e.plugin.description))])]):e._e(),e.plugin.instructions&&""!==e.plugin.instructions?n("div",{staticClass:"section"},[n("div",{staticClass:"section-title"},[e._v("How to use")]),n("div",{staticClass:"instructions"},[e._v(e._s(e.plugin.instructions))])]):e._e(),e.plugin.updates&&e.plugin.updates.length>0?n("div",{staticClass:"section"},[n("div",{staticClass:"section-title"},[e._v("What's new")]),e._l(e.sortedUpdates,function(t){return n("div",{key:t.version,staticClass:"version"},[n("div",{staticClass:"version-number"},[e._v("Version "+e._s(t.version))]),n("div",{staticClass:"date"},[e._v(e._s(e.timeAgo.format(new Date(t.date))))]),n("div",{staticClass:"notes"},[e._v(e._s(t.notes))])])})],2):e._e(),e.plugin.github&&e.plugin.github.includes("github.com/")?n("div",{staticClass:"section"},[n("a",{staticClass:"link-button",attrs:{href:e.plugin.github,target:"_blank"}},[n("div",{staticClass:"icon"},[n("svg",{attrs:{width:"14",height:"14",viewBox:"0 0 12 12",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{d:"M6 0.146484C6.55078 0.146484 7.08203 0.21875 7.59375 0.363281C8.10547 0.503906 8.58203 0.705078 9.02344 0.966797C9.46875 1.22852 9.87305 1.54297 10.2363 1.91016C10.6035 2.27344 10.918 2.67773 11.1797 3.12305C11.4414 3.56445 11.6426 4.04102 11.7832 4.55273C11.9277 5.06445 12 5.5957 12 6.14648C12 6.79102 11.9004 7.41211 11.7012 8.00977C11.5059 8.60742 11.2285 9.15625 10.8691 9.65625C10.5098 10.1562 10.0781 10.5957 9.57422 10.9746C9.07031 11.3496 8.51172 11.6387 7.89844 11.8418C7.88672 11.8457 7.86914 11.8496 7.8457 11.8535C7.82227 11.8535 7.80469 11.8535 7.79297 11.8535C7.69922 11.8535 7.625 11.8262 7.57031 11.7715C7.51562 11.7168 7.48828 11.6445 7.48828 11.5547C7.48828 11.2773 7.48828 11.0039 7.48828 10.7344C7.49219 10.4609 7.49414 10.1855 7.49414 9.9082C7.49414 9.70898 7.46484 9.50781 7.40625 9.30469C7.34766 9.10156 7.24219 8.93164 7.08984 8.79492C7.54297 8.74414 7.93945 8.65234 8.2793 8.51953C8.62305 8.38281 8.9082 8.19531 9.13477 7.95703C9.36523 7.71875 9.53711 7.42578 9.65039 7.07812C9.76758 6.72656 9.82617 6.3125 9.82617 5.83594C9.82617 5.53125 9.77539 5.24414 9.67383 4.97461C9.57227 4.70117 9.41797 4.45117 9.21094 4.22461C9.25391 4.11523 9.28516 4.00195 9.30469 3.88477C9.32422 3.76758 9.33398 3.65039 9.33398 3.5332C9.33398 3.38086 9.31641 3.23047 9.28125 3.08203C9.25 2.92969 9.20703 2.78125 9.15234 2.63672C9.13281 2.62891 9.11133 2.625 9.08789 2.625C9.06445 2.625 9.04297 2.625 9.02344 2.625C8.89844 2.625 8.76758 2.64648 8.63086 2.68945C8.49414 2.72852 8.35742 2.7793 8.2207 2.8418C8.08789 2.90039 7.95898 2.9668 7.83398 3.04102C7.70898 3.11523 7.59766 3.18555 7.5 3.25195C7.01172 3.11523 6.51172 3.04688 6 3.04688C5.48828 3.04688 4.98828 3.11523 4.5 3.25195C4.40234 3.18555 4.29102 3.11523 4.16602 3.04102C4.04102 2.9668 3.91016 2.90039 3.77344 2.8418C3.64062 2.7793 3.50391 2.72852 3.36328 2.68945C3.22656 2.64648 3.09766 2.625 2.97656 2.625C2.95703 2.625 2.93555 2.625 2.91211 2.625C2.88867 2.625 2.86719 2.62891 2.84766 2.63672C2.79297 2.78125 2.74805 2.92969 2.71289 3.08203C2.68164 3.23047 2.66602 3.38086 2.66602 3.5332C2.66602 3.65039 2.67578 3.76758 2.69531 3.88477C2.71484 4.00195 2.74609 4.11523 2.78906 4.22461C2.58203 4.45117 2.42773 4.70117 2.32617 4.97461C2.22461 5.24414 2.17383 5.53125 2.17383 5.83594C2.17383 6.3125 2.23047 6.72461 2.34375 7.07227C2.46094 7.41992 2.63281 7.71484 2.85938 7.95703C3.08984 8.19531 3.375 8.38281 3.71484 8.51953C4.05469 8.65625 4.45117 8.75 4.9043 8.80078C4.79102 8.90234 4.70312 9.02539 4.64062 9.16992C4.58203 9.31055 4.54297 9.45508 4.52344 9.60352C4.41797 9.6543 4.30664 9.69336 4.18945 9.7207C4.07227 9.74805 3.95508 9.76172 3.83789 9.76172C3.58789 9.76172 3.38086 9.70312 3.2168 9.58594C3.05273 9.46875 2.90625 9.30859 2.77734 9.10547C2.73047 9.03125 2.67383 8.95703 2.60742 8.88281C2.54102 8.80859 2.46875 8.74219 2.39062 8.68359C2.3125 8.625 2.22852 8.57812 2.13867 8.54297C2.04883 8.50391 1.95508 8.48438 1.85742 8.48438C1.8418 8.48438 1.81836 8.48633 1.78711 8.49023C1.75586 8.49023 1.72461 8.49414 1.69336 8.50195C1.66602 8.50977 1.64062 8.52148 1.61719 8.53711C1.59375 8.55273 1.58203 8.57227 1.58203 8.5957C1.58203 8.64258 1.60938 8.68945 1.66406 8.73633C1.71875 8.7793 1.76367 8.8125 1.79883 8.83594L1.81641 8.84766C1.90234 8.91406 1.97656 8.97852 2.03906 9.04102C2.10547 9.09961 2.16406 9.16406 2.21484 9.23438C2.26562 9.30078 2.31055 9.375 2.34961 9.45703C2.39258 9.53516 2.4375 9.625 2.48438 9.72656C2.61719 10.0312 2.80273 10.2539 3.04102 10.3945C3.2832 10.5312 3.57031 10.5996 3.90234 10.5996C4.00391 10.5996 4.10547 10.5938 4.20703 10.582C4.30859 10.5664 4.41016 10.5488 4.51172 10.5293V11.5488C4.51172 11.6426 4.48242 11.7168 4.42383 11.7715C4.36914 11.8262 4.29492 11.8535 4.20117 11.8535C4.18945 11.8535 4.17188 11.8535 4.14844 11.8535C4.12891 11.8496 4.11328 11.8457 4.10156 11.8418C3.48828 11.6426 2.92969 11.3555 2.42578 10.9805C1.92188 10.6016 1.49023 10.1621 1.13086 9.66211C0.771484 9.1582 0.492188 8.60742 0.292969 8.00977C0.0976563 7.41211 0 6.79102 0 6.14648C0 5.5957 0.0703125 5.06445 0.210938 4.55273C0.355469 4.04102 0.558594 3.56445 0.820312 3.12305C1.08203 2.67773 1.39453 2.27344 1.75781 1.91016C2.125 1.54297 2.5293 1.22852 2.9707 0.966797C3.41602 0.705078 3.89453 0.503906 4.40625 0.363281C4.91797 0.21875 5.44922 0.146484 6 0.146484Z",fill:"#30C2FF"}})])]),n("div",{staticClass:"label"},[e._v("View on Github")])]),n("a",{staticClass:"link-button",attrs:{href:e.plugin.github+"/issues/new",target:"_blank"}},[n("div",{staticClass:"icon"},[n("svg",{attrs:{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{d:"M7.4375 14C6.83138 14 6.25033 13.9225 5.69434 13.7676C5.13379 13.6126 4.6097 13.3916 4.12207 13.1045C3.63444 12.8219 3.19238 12.4801 2.7959 12.0791C2.39486 11.6826 2.05306 11.2406 1.77051 10.7529C1.4834 10.2653 1.26237 9.74121 1.10742 9.18066C0.952474 8.62467 0.875 8.04362 0.875 7.4375C0.875 6.83138 0.952474 6.24805 1.10742 5.6875C1.26237 5.13151 1.4834 4.6097 1.77051 4.12207C2.05306 3.63444 2.39486 3.1901 2.7959 2.78906C3.19238 2.39258 3.63444 2.05078 4.12207 1.76367C4.6097 1.48112 5.13379 1.26237 5.69434 1.10742C6.25033 0.952474 6.83138 0.875 7.4375 0.875C8.04362 0.875 8.62695 0.952474 9.1875 1.10742C9.74349 1.26237 10.2653 1.48112 10.7529 1.76367C11.2406 2.05078 11.6849 2.39258 12.0859 2.78906C12.4824 3.1901 12.8242 3.63444 13.1113 4.12207C13.3939 4.6097 13.6126 5.13151 13.7676 5.6875C13.9225 6.24805 14 6.83138 14 7.4375C14 8.04362 13.9225 8.62467 13.7676 9.18066C13.6126 9.74121 13.3939 10.2653 13.1113 10.7529C12.8242 11.2406 12.4824 11.6826 12.0859 12.0791C11.6849 12.4801 11.2406 12.8219 10.7529 13.1045C10.2653 13.3916 9.74349 13.6126 9.1875 13.7676C8.62695 13.9225 8.04362 14 7.4375 14ZM7.4375 1.75C6.91797 1.75 6.41667 1.81836 5.93359 1.95508C5.44596 2.0918 4.99251 2.2832 4.57324 2.5293C4.14941 2.77539 3.76432 3.07161 3.41797 3.41797C3.07161 3.76432 2.77539 4.14714 2.5293 4.56641C2.2832 4.99023 2.0918 5.44368 1.95508 5.92676C1.81836 6.40983 1.75 6.91341 1.75 7.4375C1.75 7.95703 1.81836 8.45833 1.95508 8.94141C2.0918 9.42904 2.2832 9.88249 2.5293 10.3018C2.77539 10.7256 3.07161 11.1107 3.41797 11.457C3.76432 11.8034 4.14941 12.0996 4.57324 12.3457C4.99251 12.5918 5.44596 12.7832 5.93359 12.9199C6.41667 13.0566 6.91797 13.125 7.4375 13.125C7.96159 13.125 8.46517 13.0566 8.94824 12.9199C9.43132 12.7832 9.88477 12.5918 10.3086 12.3457C10.7279 12.0996 11.1107 11.8034 11.457 11.457C11.8034 11.1107 12.0996 10.7256 12.3457 10.3018C12.5918 9.88249 12.7832 9.42904 12.9199 8.94141C13.0566 8.45833 13.125 7.95703 13.125 7.4375C13.125 6.91797 13.0566 6.41439 12.9199 5.92676C12.7832 5.44368 12.5918 4.99023 12.3457 4.56641C12.0996 4.14714 11.8034 3.76432 11.457 3.41797C11.1107 3.07161 10.7279 2.77539 10.3086 2.5293C9.88477 2.2832 9.43132 2.0918 8.94824 1.95508C8.46517 1.81836 7.96159 1.75 7.4375 1.75ZM7.875 10.5H7L7 6.125H7.875L7.875 10.5ZM7.875 5.25H7V4.375H7.875V5.25Z",fill:"#30C2FF"}})])]),n("div",{staticClass:"label"},[e._v("Report a bug")])])]):e._e()])])},g=[],h=(n("55dd"),n("7913")),v=n("c50f"),f=n("7d1a"),m=n.n(f);v["a"].addLocale(m.a);var w={props:["plugin","installed"],data:function(){return{timeAgo:new v["a"]("en-US")}},components:{carousel:h["Carousel"],"carousel-item":h["CarouselItem"]},methods:{backToList:function(){this.$emit("backToList")},install:function(){this.$emit("install",this.plugin)},uninstall:function(){this.$emit("uninstall",this.plugin)}},computed:{latestUpdate:function(){if(this.plugin.updates&&this.plugin.updates.length>0)return this.plugin.updates.sort(function(e,t){return e=new Date(e.date),t=new Date(t.date),e>t?-1:e<t?1:0})[0]},sortedUpdates:function(){if(this.plugin.updates&&this.plugin.updates.length>0)return this.plugin.updates.sort(function(e,t){return e=new Date(e.date),t=new Date(t.date),e>t?-1:e<t?1:0})}}},b=w,_=(n("18f3"),Object(c["a"])(b,C,g,!1,null,null,null));_.options.__file="DetailScreen.vue";var S=_.exports,y={components:{PluginItem:p,DetailScreen:S},data:function(){return{modalOpened:!1,searchText:"",selectedPlugin:{},detailScreenOn:!1,installedScreenOn:!1,plugins:[{id:"repeat-grids",name:"Repeat Grids",version:"0.0.1",author:"Tony Tung",github:"https://github.com/jachui/figma-pdf-export",description:"Enables users to quickly duplicate the selected layer in the grid layout, so it's easier to assemble list view, table view, or other organized UI layout with a single element.",instructions:"Enables users to quickly duplicate the selected layer in the grid layout, so it's easier to assemble list view, table view, or other organized UI layout with a single element.",updates:[{version:"0.0.1",date:"8/12/2018",notes:"Added a lot of features"}],images:["https://github.com/jachui/figma-distributor/blob/master/screenshot.png?raw=true"]},{id:"pdf-export",name:"PDF Export",version:"1.2.1",author:"Jackie Chui",description:"Export a PDF file containing all the frames in the current page. A new PDF option will be added to Figma's export picker."},{id:"layer-distributor",name:"Layer Distributor",version:"1.2.3",author:"Jackie Chui",description:"Distribute layers with consistent spacing. Accessible via the alignment tools or keyboard shortcut (Ctrl/Cmd + Shift + D)."},{id:"batch-rename",name:"Batch Rename",version:"1.0.0",author:"Ahmed Al-Haddad",description:"Rename multiple layers at the same time."},{id:"find-and-replace",name:"Find and Replace",version:"1.1.5",author:"Jackie Chui",description:"Find and replace texts and layer names easily. Accessible via the toolbar button or keyboard shortcut (Ctrl/Cmd + F)."}],installedPlugins:[]}},watch:{installedPlugins:function(e){localStorage.setItem("installedPlugins",JSON.stringify(e))}},mounted:function(){null!==JSON.parse(localStorage.getItem("installedPlugins"))?this.installedPlugins=JSON.parse(localStorage.getItem("installedPlugins")):localStorage.setItem("installedPlugins",JSON.stringify([]))},computed:{searchedPlugins:function(){var e=this;if(this.installedScreenOn){var t=this.plugins.filter(function(t){return e.installedPlugins.find(function(e){return e.id===t.id})});return t.filter(function(t){return t.name.toLowerCase().match(e.searchText.toLowerCase())})}return this.plugins.filter(function(t){return t.name.toLowerCase().match(e.searchText.toLowerCase())})}},methods:{show:function(){this.$modal.show("pluginManagerModal")},hide:function(){this.$modal.hide("pluginManagerModal")},openModal:function(){document.querySelector("#managerButton").style.backgroundColor="#30c2ff",this.detailScreenOn=!1,this.modalOpened=!0},modalClosed:function(){this.modalOpened=!1,this.detailScreenOn=!1,document.querySelector("#managerButton").style.backgroundColor=""},toggleModal:function(){this.modalOpened?this.hide():this.show()},goToDetail:function(e){this.selectedPlugin=e,this.detailScreenOn=!0},install:function(e){this.installedPlugins.push(e)},uninstall:function(e){this.installedPlugins=this.installedPlugins.filter(function(t){return t.id!==e.id}),this.detailScreenOn=!1}}},O=y,x=(n("5c0b"),Object(c["a"])(O,s,a,!1,null,null,null));x.options.__file="App.vue";var P=x.exports,k=n("1881"),E=n.n(k);i["a"].config.productionTip=!1,i["a"].use(E.a),console.log("started main.js");var M=!1,L=!1,T=!1,j=document.getElementById("react-page"),V=document.createElement("div");V.id="pluginManagerApp",j.parentNode.insertBefore(V,j.nextSibling),window.pluginManagerVue=new i["a"]({el:"#pluginManagerApp",render:function(e){return e(P)}});var D=function(){var e=document.querySelector('[data-tooltip-text="Show notifications"]');e.parentElement.style.display="flex";var t=document.createElement("div");t.id="managerButton",t.innerHTML='<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 1H19V10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1ZM0 10C0 4.47715 4.47715 0 10 0H19H20V1V10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM9.5 9.5V6H10.5V9.5H14V10.5H10.5V14H9.5V10.5H6V9.5H9.5Z" fill="white"/></svg>',e.parentNode.insertBefore(t,e),t.addEventListener("click",function(){window.pluginManagerVue.$children[0].toggleModal()},!1)};window.addEventListener("projectsPageLoaded",function(){console.log("found2"),null===document.querySelector("#managerButton")&&D()}),window.addEventListener("projectsPageChanged",function(){window.pluginManagerVue.$children[0].hide(),null===document.querySelector("#managerButton")&&D()}),window.addEventListener("projectsPageUnloaded",function(){window.pluginManagerVue.$children[0].hide()}),window.addEventListener("fileLoaded",function(){}),window.addEventListener("fileUnloaded",function(){}),window.addEventListener("menuOpened",function(e){}),window.addEventListener("menuClosed",function(){}),null===document.querySelector('[data-tooltip-text="Show notifications"]')||M?console.log("not found"):(console.log("found"),M=!0,window.dispatchEvent(new CustomEvent("projectsPageLoaded"))),new MutationObserver(function(e){e.forEach(function(e){console.log(e),null===document.querySelector('[data-tooltip-text="Show notifications"]')||M||(M=!0,window.dispatchEvent(new CustomEvent("projectsPageLoaded"))),null===document.querySelector('[data-tooltip-text="Show notifications"]')&&M&&(M=!1,window.dispatchEvent(new CustomEvent("projectsPageUnloaded"))),e.addedNodes[0]===document.querySelector('div[class*="top_bar--header--"]')&&window.dispatchEvent(new CustomEvent("projectsPageChanged")),window.App._fullscreenIsReady&&window.App._state.selectedView.fullscreen&&!L&&(L=!0,window.dispatchEvent(new CustomEvent("fileLoaded"))),!window.App._state.selectedView.fullscreen&&L&&(L=!1,window.dispatchEvent(new CustomEvent("fileUnloaded"))),null===window.App._state.dropdownShown||T||(T=!0,window.dispatchEvent(new CustomEvent("menuOpened",{detail:window.App._state.dropdownShown}))),!window.App._state.dropdownShown&&T&&(T=!1,window.dispatchEvent(new CustomEvent("menuClosed")))})}).observe(j,{childList:!0,subtree:!0})},"5c0b":function(e,t,n){"use strict";var i=n("2856"),s=n.n(i);s.a},"70bd":function(e,t,n){},7795:function(e,t,n){}});