function log(){
    if(window.console && console.log){
        console.log.apply(null, arguments);
    }
}

function info(){
    if(window.console && console.info){
        console.info.apply(null, arguments);
    }
}

function warn(){
    if(window.console && console.warn){
        console.warn.apply(null, arguments);
    }
}
