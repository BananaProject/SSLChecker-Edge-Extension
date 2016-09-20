/* Detect a local man in the middle made by a self signed cert */
function proxyDetector(proxyPort, callback) {
    try { // false positives
        if (!isFinite(proxyPort) && (proxyPort < 0 || proxyPort > 65536)) {
            console.error("Invalid port number.");
            return;
        }
        /* reverse proxy allways accept connections from browser >:) */
        var address = "https://localhost:" + proxyPort;
        /* time trickery will be used for checing if proxy is running */
        var t1 = Date.now();
        /* initiliaze ajax object */
        var req = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        /* old browser? */
        if (req == null) {
            console.error("Ajax initialize error.");
            return;
        }
        req.onreadystatechange = function() {
            /* maybe we have searched for a long time without any result */
            var ban = setTimeout(function() {
                req.abort();
                callback(false);
            }, 20000);
            /* we've got a result! */
            if (req.readyState === 4) {
                clearTimeout(ban);
                var raceCondition = Date.now() - t1;
                /* if you connect to localhost server everything will run very quickly >:) */
                if (raceCondition <= 100) {
                    callback(true);
                } else {
                    callback(false);
                }
            } else {
                clearTimeout(ban);
            }
        }
        try {
            req.open("GET", address, true);
            req.send(null);
        } catch (e) {
            callback(false);
        }
    } catch (e) {
        callback(false);
    }
}


/* Check for http non-redirection exploit */   
for(var i = 0;i < ssllist.length;i++) {
    var reg = new RegExp(ssllist[i]);
    if(reg.test(location.hostname) && location.protocol != "https:")
        window.location.replace("https://" + location.hostname + location.pathname); 
}

function potentialLocalProxyPortsAlert(resp) {
    if(resp) {
        alert("Be warning! Someone has installed a cert to decrypt ssl traffic!!");
    }
}

if(location.protocol == "https:") {
    for(var i = 0;i < potentialLocalProxyPorts.length;i++) {  
        proxyDetector(
                potentialLocalProxyPorts[i],
                potentialLocalProxyPortsAlert
        );
    }
}