let hooks, pluginModule;

hooks = {
  third_login: {
    type: 'component',
    mulit: false,
    listener: null
  },
  import_data: {
    type: 'listener',
    mulit: true,
    listener: []
  },
  export_data: {
    type: 'listener',
    mulit: true,
    listener: []
  },
  
  interface_tab: {
    type: 'listener',
    mulit: true,
    listener: []
  },
  
  header_menu: {
    type: 'listener',
    mulit: true,
    listener: []
  },
  
  app_route: {
    type: 'listener',
    mulit: true,
    listener: []
  },
  
  add_reducer: {
    type: 'listener',
    mulit: true,
    listener: []
  }
};

function bindHook(name, listener) {
  if (!name) throw new Error('缺少hookname');
  if (name in hooks === false) {
    throw new Error('不存在的hookname');
  }
  if (hooks[name].mulit === true) {
    hooks[name].listener.push(listener);
  } else {
    hooks[name].listener = listener;
  }

}

function emitHook(name, ...args) {
  if (!hooks[name]) throw new Error('不存在的hook name');
  let hook = hooks[name];
  if (hook.mulit === true && hook.type === 'listener') {
    if (Array.isArray(hook.listener)) {
      let promiseAll = [];
      hook.listener.forEach(item => {
        if (typeof item === 'function') {
            promiseAll.push(Promise.resolve(item.call(pluginModule, ...args)))
        }
      });
      return Promise.all(promiseAll);
    }
  } else if (hook.mulit === false && hook.type === 'listener') {
    if (typeof hook.listener === 'function') {
      return Promise.resolve(hook.listener.call(pluginModule, ...args));
    }
  } else if (hook.type === 'component') {
    return hook.listener;
  }

}

pluginModule = {
  hooks: hooks,
  bindHook: bindHook,
  emitHook: emitHook
}
let pluginModuleList;
try {
  pluginModuleList = require('./plugin-module.js');
} catch (err) {
  pluginModuleList = {}
}


Object.keys(pluginModuleList).forEach(plugin => {
  if (!pluginModuleList[plugin]) return null;
  if (pluginModuleList[plugin] && typeof pluginModuleList[plugin].module === 'function') {
    pluginModuleList[plugin].module.call(pluginModule, pluginModuleList[plugin].options)
  }
})

module.exports = pluginModule;