
// Initialize some variables before react-native code would access them
var onmessage=null, self=global;
// Cache Node's original require as __debug__.require
global.__debug__={require: require};
// avoid Node's GLOBAL deprecation warning
Object.defineProperty(global, "GLOBAL", {
    configurable: true,
    writable: true,
    enumerable: true,
    value: global
});

var vscodeHandlers = {
    'vscode_reloadApp': function () {
        try {
            global.require('NativeModules').DevMenu.reload();
        } catch (err) {
            // ignore
        }
    },
    'vscode_showDevMenu': function () {
        try {
            var DevMenu = global.require('NativeModules').DevMenu.show();
        } catch (err) {
            // ignore
        }
    }
};

process.on("message", function (message) {
    if (message.data && vscodeHandlers[message.data.method]) {
        vscodeHandlers[message.data.method]();
    } else if(onmessage) {
        onmessage(message);
    }
});

var postMessage = function(message){
    process.send(message);
};
var importScripts = (function(){
    var fs=require('fs'), vm=require('vm');
    return function(scriptUrl){
        var scriptCode = fs.readFileSync(scriptUrl, "utf8");
        vm.runInThisContext(scriptCode, {filename: scriptUrl});
    };
})();
<!doctype html><div><a href="/debug/bundles">Cached Bundles</a></div>
// Notify debugger that we're done with loading
// and started listening for IPC messages
postMessage({workerLoaded:true});