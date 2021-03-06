<template lang="pug">
	#pluginManager.js-fullscreen-prevent-event-capture
		modal(name='pluginManagerModal' ref='modal' @opened='openModal' @closed='modalClosed' draggable='.modal-header' width='460' height='auto' maxHeight='642')
			.modal-header.header-large
				.modal-tabs
					.modal-tab(:class='{"active-tab": currentTab === "Plugins"}' @click='currentTab = "Plugins", detailScreenOn = false, searchText = ""') Plugins
					.modal-tab(:class='{"active-tab": currentTab === "Installed"}' @click='currentTab = "Installed", detailScreenOn = false, searchText = ""') Installed
					.modal-tab(v-if='devMode' :class='{"active-tab": currentTab === "Developer"}' @click='currentTab = "Developer", detailScreenOn = false, searchText = ""') Developer
						.update-count(v-if='numberOfUpdates > 0') {{ numberOfUpdates }}
				.modal-close-button(ref='closeButton' @click='hide')
			.modal-content
				.list-screen(v-if='currentTab === "Plugins" || (currentTab === "Installed" && installedPlugins.length > 0)' :class='{detailScreenOn: detailScreenOn}')
					.search-box
						.figma-icon.search
						input(v-model='searchText' placeholder='Search' spellcheck='false')
					.plugins-list
						pluginItem(type='text' v-for='plugin in searchedPlugins' :key='plugin.id' :plugin='plugin' :installedPlugins='installedPlugins' :installedScreenOn='currentTab === "Installed"' @goToDetail='goToDetail' @install='install')
						.no-search-results-message(v-if='searchedPlugins.length === 0 && searchText !== ""') No results for '{{ searchText }}'
				detailScreen(:class='{detailScreenOn: detailScreenOn}' :plugin='selectedPlugin' :installed='installedPlugins.find(installedPlugin => installedPlugin.id === selectedPlugin.id) !== undefined' @backToList='detailScreenOn = false' @install='install' @uninstall='uninstall')
				developerScreen(v-if='currentTab === "Developer"')
				.empty-state(v-if='currentTab === "Installed" && installedPlugins.length === 0') No plugins installed
</template>

<script>
import PluginItem from "./components/PluginItem";
import DetailScreen from "./components/DetailScreen";
import DeveloperScreen from "./components/DeveloperScreen";

function isLocalChromeExtension() {
  return window.localExtension;
}

export default {
  components: {
    PluginItem,
    DetailScreen,
    DeveloperScreen
  },
  data: () => ({
    orgId: "",
    isDesktop: window.__figmaDesktop,
    modalOpened: false,
    searchText: "",
    selectedPlugin: {},
    detailScreenOn: false,
    currentTab: "Plugins",
    plugins: [],
    installedPlugins: [],
    devMode: window.pluginDevMode
  }),
  watch: {
    installedPlugins: array => {
      localStorage.setItem("installedPlugins", JSON.stringify(array));
    }
  },
  mounted() {
    var self = this;
    if (JSON.parse(localStorage.getItem("installedPlugins")) !== null) {
      this.installedPlugins = JSON.parse(
        localStorage.getItem("installedPlugins")
      );
    } else localStorage.setItem("installedPlugins", JSON.stringify([]));

    const loadPlugins = masterList => {
      masterList.forEach(pluginEntry => {
        const pluginRequest = new XMLHttpRequest();
        pluginRequest.onload = () => {
          const plugin = JSON.parse(pluginRequest.responseText);
          plugin.publishDate = pluginEntry.publishDate;
          self.plugins.push(plugin);
        };
        pluginRequest.open(
          "GET",
          pluginEntry.manifest + "?_=" + new Date().getTime()
        );
        pluginRequest.send();
      });
    };

    if (isLocalChromeExtension()) {
      console.log("Using local masterList.json");
      const masterListJSON = require("../masterList.json");
      localStorage.setItem("masterList", JSON.stringify(masterListJSON));
      loadPlugins(masterListJSON);
    } else {
      const masterListUrl =
        "https://jachui.github.io/figma-plugin-manager/masterList.json";
      const masterListRequest = new XMLHttpRequest();
      masterListRequest.open(
        "GET",
        masterListUrl + "?_=" + new Date().getTime()
      );

      masterListRequest.onload = () => {
        const masterListJSON = JSON.parse(masterListRequest.responseText);
        localStorage.setItem("masterList", masterListRequest.responseText);
        loadPlugins(masterListJSON);
      };

      masterListRequest.send();
    }
  },
  computed: {
    searchedPlugins() {
      let availablePlugins =
        this.orgId === ""
          ? this.plugins.filter(
              plugin => !plugin.requiredOrgId || plugin.requiredOrgId === ""
            )
          : this.plugins.filter(
              plugin =>
                !plugin.requiredOrgId ||
                plugin.requiredOrgId === "" ||
                plugin.requiredOrgId === this.orgId
            );
      availablePlugins = availablePlugins.filter(plugin => {
        return this.isDesktop ? !plugin.webOnly : !plugin.desktopOnly;
      });
      if (this.currentTab === "Plugins") {
        return availablePlugins
          .filter(plugin => {
            return plugin.name
              .toLowerCase()
              .match(this.searchText.toLowerCase());
          })
          .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
      } else {
        const installedPlugins = availablePlugins.filter(plugin => {
          return this.installedPlugins.find(
            installedPlugin => installedPlugin.id === plugin.id
          );
        });
        return installedPlugins
          .filter(plugin => {
            return plugin.name
              .toLowerCase()
              .match(this.searchText.toLowerCase());
          })
          .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
      }
    },
    numberOfUpdates() {
      const numberOfUpdates = this.installedPlugins.filter(installedPlugin =>
        this.plugins.find(
          plugin =>
            plugin.id === installedPlugin.id &&
            plugin.version !== installedPlugin.version
        )
      ).length;
      if (document.querySelector("#pluginManagerButton") !== null) {
        numberOfUpdates > 0
          ? document
              .querySelector("#pluginManagerButton")
              .classList.add("has-badge")
          : document
              .querySelector("#pluginManagerButton")
              .classList.remove("has-badge");
      }
      return numberOfUpdates;
    }
  },
  methods: {
    show() {
      const currentOrgId = window.App._state.currentOrgId;
      if (this.orgId === "" && currentOrgId !== null) this.orgId = currentOrgId;
      this.$modal.show("pluginManagerModal");
    },
    hide() {
      this.$modal.hide("pluginManagerModal");
    },
    openModal() {
      this.modalOpened = true;
      if (document.getElementById("pluginManagerButton"))
        document.getElementById("pluginManagerButton").classList.add("active");
    },
    modalClosed() {
      this.currentTab = "Plugins";
      this.modalOpened = false;
      this.detailScreenOn = false;
      if (document.getElementById("pluginManagerButton"))
        document
          .querySelector("#pluginManagerButton")
          .classList.remove("active");
    },
    toggleModal() {
      this.modalOpened ? this.hide() : this.show();
    },
    goToDetail(plugin) {
      this.selectedPlugin = plugin;
      document.querySelector(".detail-screen .content").scrollTop = 0;
      if (this.currentTab === "Installed") {
        const updatedInstalledPlugins = this.installedPlugins.map(
          installedPlugin => {
            return installedPlugin.id === plugin.id ? plugin : installedPlugin;
          }
        );
        this.installedPlugins = updatedInstalledPlugins;
        localStorage.setItem(
          "installedPlugins",
          JSON.stringify(updatedInstalledPlugins)
        );
      }
      this.detailScreenOn = true;
    },
    install(plugin) {
      this.installedPlugins.push(plugin);
      const toast = {
        type: "VISUAL_BELL_ENQUEUE",
        payload: {
          type: "installed_plugin",
          message: window.__figmaDesktop
            ? "Plugin installed. Restart the app to see changes."
            : "Plugin installed. Refresh this page to see changes.",
          timeout: 10e3
        }
      };
      window.__figmaDesktop
        ? null
        : Object.assign(toast.payload, {
            button: {
              text: "Refresh",
              action: () => {
                location.reload();
              }
            }
          });
      window.App._dispatch(toast);
    },
    uninstall(plugin) {
      this.installedPlugins = this.installedPlugins.filter(
        installedPlugin => installedPlugin.id !== plugin.id
      );
      this.detailScreenOn = false;
      const toast = {
        type: "VISUAL_BELL_ENQUEUE",
        payload: {
          type: "uninstalled_plugin",
          message: window.__figmaDesktop
            ? "Plugin uninstalled. Restart the app to see changes."
            : "Plugin uninstalled. Refresh this page to see changes.",
          timeout: 10e3
        }
      };
      window.__figmaDesktop
        ? null
        : Object.assign(toast.payload, {
            button: {
              text: "Refresh",
              action: () => {
                location.reload();
              }
            }
          });
      window.App._dispatch(toast);
    }
  }
};
</script>

<style lang="scss">
@import "./css/FigmaPluginUI";

.list-screen {
  transition: transform 0.2s ease;
  transform: translateX(0px);
  &.detailScreenOn {
    transform: translateX(-100%);
  }
}

.plugins-list {
  height: 546px;
  max-height: calc(70vh - 48px);
  overflow-y: auto;
}

.modal-content > .empty-state {
  width: 460px;
  height: 595px;
  max-height: 70vh;
}
</style>
