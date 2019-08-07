/*jshint esversion: 6 */
/*
* ---------------------------------------------------------------------
*  BitBtn
* 
*  Copyright 2019 Aleksandar Dinkov
* 
*  URL: http://www.d-project.com/
* 
*  Licensed under the OPEN ONLY-BSV-SPECIFIC LICENSE (v0.3.0):
*    https://github.com/Pipe-Cash/OPEN-BLOCKCHAIN-SPECIFIC-LICENSE/releases/tag/v0.3.0
* 
* ---------------------------------------------------------------------
*/
bitbtn = (function bitbtn() {

    function getTimestamp() {
        return (new Date().valueOf() / 1000 | 0);
    }

    var addCSS = (function () {

        var bitBtnStyle = ".bitbtn{position:relative;padding:0.5em 0.75em;font-size:1em;line-height:1.5;display:inline-block;cursor:pointer;font-size:15px;font-weight:400;text-align:center;vertical-align:middle;white-space:nowrap;border-radius:1.5em;border:0.3em ridge;border-color:#0054ad;background-color:#007bff;color:#fff}.bitbtn.bitbtn-phone{font-size:2.2vmax}.bitbtn.bitbtn-tablet{font-size:1.5vmax}.bitbtn span{margin:0 0.15em}@-webkit-keyframes bitbtn-spinner{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes bitbtn-spinner{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes bitbtn-border-success{to{border-color:limegreen}}@keyframes bitbtn-border-success{to{border-color:limegreen}}@-webkit-keyframes bitbtn-border-error{to{border-color:pink}}@keyframes bitbtn-border-error{to{border-color:pink}}.bitbtn .status-circle{width:0.8em;height:0.8em;display:inline-block;vertical-align:text-bottom;border:0.2em solid transparent;border-color:transparent;background-color:white;border-radius:50%;-webkit-animation:none;animation:none}.bitbtn .status-circle.loading{border:0.2em solid currentColor;border-right-color:transparent;background-color:transparent;border-radius:50%;-webkit-animation:bitbtn-spinner 0.75s linear infinite;animation:bitbtn-spinner 0.75s linear infinite}.bitbtn .status-circle.success{border-color:transparent;background-color:rgb(163, 252, 30)}.bitbtn .status-circle.error{border-color:transparent;background-color:rgb(251, 145, 163)}.bitbtn .bitbtn-amount{font-size:1em;display:inline-block;background:#ffffff50;border-radius:10%;padding:0 3px}.bitbtn .bitbtn-not-work{background:#ddd;text-align:center;color:black;display:none;position:absolute;left:0;top:3em;padding:10px;width:100%}.bitbtn .bitbtn-not-work.show{display:block}.bitbtn .small-text,.bitbtn-modal-container .small-text{font-size:0.6em}.bitbtn-modal-container{background-color:rgb(0,0,0);background-color:rgba(0,0,0,0.4);position:fixed;left:0;top:0;width:100%;height:100%;display:none;z-index:2147483647;padding-top:100px;overflow:auto}.bitbtn-modal-container .modal-content{background-color:#fefefe;margin:auto;border:1px solid #888;width:70%;height:70vh;overflow-y:scroll;overflow-x:hidden}.bitbtn-modal-container .modal-header{display:block;background-color:#e6e6e6;position:sticky;top:0}.bitbtn-modal-container .modal-header button{padding:10px;background-color:#d1d1d1;border:0 none;margin:none}.bitbtn-modal-container .modal-header:hover button:hover{background-color:#b9b9b9}.bitbtn-modal-container .modal-header button.selected{background-color:#b9b9b9}.bitbtn-modal-container .modal-content .modal-body{padding:20px}.bitbtn-modal-container .close{color:#aaaaaa;float:right;font-size:28px;font-weight:bold}.bitbtn-modal-container .close:focus,.bitbtn-modal-container .close:hover{color:#000;text-decoration:none;cursor:pointer}.bitbtn-modal-container .qr-code-img img{display:block;padding:20px;width:auto;max-width:50%;margin:1em auto;border:1px solid black}.bitbtn-modal-container .wallet-list{list-style:none;display:flex;flex-wrap:wrap}.bitbtn-modal-container .wallet-list .wallet-item{display:inline-block;border:3px ridge black;padding:1em 2em;margin:3px;text-align:center}.bitbtn-modal-container .wallet-list .wallet-item:hover{background:-moz-linear-gradient(-45deg, rgba(150,200,200,0) 0%, rgba(150,200,200,1) 65%, rgba(150,200,200,0) 67%, rgba(150,200,200,0) 100%);background:-webkit-linear-gradient(-45deg, rgba(150,200,200,0) 0%,rgba(150,200,200,1) 65%,rgba(150,200,200,0) 67%,rgba(150,200,200,0) 100%);background:linear-gradient(135deg, rgba(150,200,200,0) 0%,rgba(150,200,200,1) 65%,rgba(150,200,200,0) 67%,rgba(150,200,200,0) 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0096c8c8', endColorstr='#0096c8c8',GradientType=1 )}.bitbtn-modal-container .wallet-list .wallet-item img{height:3em}";

        var cssId = 'bitbtn-css';

        function addCSS_asLink() {
            if (!document.getElementById(cssId)) {
                var head = document.getElementsByTagName('head')[0];
                var link = document.createElement('link');
                link.id = cssId;
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.media = 'all';
                link.href = "btnStyle.css";

                head.appendChild(link);
            }
        }

        function addCSS_fromVariable() {
            if (!document.getElementById(cssId)) {
                var head = document.getElementsByTagName('head')[0];
                var style = document.createElement('style');
                style.innerHTML = bitBtnStyle;
                head.appendChild(style);
            }
        }

        return function addCSS(debug) {
            if (debug) addCSS_asLink();
            else addCSS_fromVariable();
        };
    }());

    var getPrice = (function () {
        var coinGeckoSupportedFiats = [
            "usd", "aed", "ars", "aud", "bdt", "bhd", "bmd",
            "brl", "cad", "chf", "clp", "cny", "czk", "dkk",
            "eur", "gbp", "hkd", "huf", "idr", "ils", "inr",
            "jpy", "krw", "kwd", "lkr", "mmk", "mxn", "myr",
            "nok", "nzd", "php", "pkr", "pln", "rub", "sar",
            "sek", "sgd", "thb", "try", "twd", "uah", "vef",
            "vnd", "zar", "xdr", "xag", "xau"
        ];

        var coinGecko_BSV_id = 'bitcoin-cash-sv';

        var coinGeckoAPI_priceURL = 'https://api.coingecko.com/api/v3/simple/price' +
            '?ids=' + coinGecko_BSV_id +
            '&vs_currencies=' + encodeURIComponent(coinGeckoSupportedFiats.join(','));

        function saveToLocalStorage(str, name) {
            if (typeof (Storage) === "undefined")
                return;

            localStorage.setItem(name, str);
            localStorage.setItem(name + "_timestamp", getTimestamp());
        }

        function getFromLocalStorage(name, dataAgeThresholdSeconds) {
            if (typeof (Storage) === "undefined")
                return null;

            var _prevData = localStorage.getItem(name);
            var _prevDataTimestamp = localStorage.getItem(name + "_timestamp");

            if (!_prevData || !_prevDataTimestamp)
                return null;

            var now = getTimestamp();
            if (now - dataAgeThresholdSeconds > _prevDataTimestamp)
                return null; // data is too old

            if (now < _prevDataTimestamp)
                return null; // data is invalid

            return JSON.parse(_prevData);
        }

        function getCoingeckoPrices() {
            var prices = getFromLocalStorage(
                "coinGeckoPrices", 60 * 10); // 10 minute sthreshold 
            if (prices)
                return prices;

            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", coinGeckoAPI_priceURL, false);
            xmlHttp.send(null);

            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var pricesString = xmlHttp.responseText;
                saveToLocalStorage(pricesString, "coinGeckoPrices");
                prices = JSON.parse(pricesString);
                return prices;
            } else
                throw new Error(xmlHttp.statusText);
        }

        function getPrice(currency) {
            currency = currency.toLowerCase().trim();

            if (!coinGeckoSupportedFiats.includes(currency))
                throw new Error("Unknown currency: " + currency);

            var coinGeckoPrices = getCoingeckoPrices();

            if (currency.toLowerCase() == "bsv") {
                return 1.0;
            } else {
                return coinGeckoPrices[coinGecko_BSV_id][currency];
            }
        }

        return getPrice;
    })();

    var os = (function () {
        /**
         * JavaScript OS Detection
         * 
         * Code snippet taken from:
         * JavaScript Client Detection
         * (C) viazenetti GmbH (Christian Ludwig)
         */

        var nAgt = navigator.userAgent;

        var clientStrings = [
            { s: 'Windows', r: /(Windows)/ },
            { s: 'Android', r: /Android/ },
            { s: 'Open BSD', r: /OpenBSD/ },
            { s: 'Sun OS', r: /SunOS/ },
            { s: 'Linux', r: /(Linux|X11)/ },
            { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
            { s: 'Mac OS X', r: /Mac OS X/ },
            { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
            { s: 'QNX', r: /QNX/ },
            { s: 'UNIX', r: /UNIX/ },
            { s: 'BeOS', r: /BeOS/ },
            { s: 'OS/2', r: /OS\/2/ }
        ];

        var os = "Unknown";
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }
        return os;
    })();

    var supportedWalletsByOS = {
        "bitcoin": {
            'Windows': [
                /**
                 * {
                 *      name: "Example Wallet",
                 *      img: "https://example-wallet.com/logo.png/",
                 *      app: "https://example-wallet.com/download/",
                 *  },
                 */
            ],
            'Android': [
                {
                    name: "Simply Cash",
                    img: "https://simply.cash/img/simply-icon-512x512.png",
                    app: "https://play.google.com/store/apps/details?id=cash.simply.wallet",
                },
            ],
            'Open BSD': [],
            'Sun OS': [],
            'Linux': [],
            'iOS': [
                {
                    name: "Simply Cash",
                    img: "https://simply.cash/img/simply-icon-512x512.png",
                    app: "https://apps.apple.com/us/app/simply-cash-bsv-wallet/id1398370340",
                },
            ],
            'Mac OS X': [],
            'Mac OS': [],
            'QNX': [],
            'UNIX': [],
            'BeOS': [],
            'OS/2': [],
        },
        "bitcoin-out": {
            'Windows': [],
            'Android': [
                {
                    name: "Simply Cash",
                    img: "https://simply.cash/img/simply-icon-512x512.png",
                    app: "https://play.google.com/store/apps/details?id=cash.simply.wallet",
                },
            ],
            'Open BSD': [],
            'Sun OS': [],
            'Linux': [],
            'iOS': [ ],
            'Mac OS X': [],
            'Mac OS': [],
            'QNX': [],
            'UNIX': [],
            'BeOS': [],
            'OS/2': [],
        },
    };

    var modalWindow = (function () {
        function createEl(tagName, classList, children, text) {
            var el = document.createElement(tagName);

            for (var i = 0; i < classList.length; i++) {
                var cl = classList[i];
                el.classList.add(cl);
            }

            for (var i = 0; i < children.length; i++) {
                var ch = children[i];
                el.appendChild(ch);
            }

            if (text) {
                var p = document.createElement("div");
                p.innerHTML = text;
                el.append(p);
            }
            return el;
        }

        function initModal() {
            var modalCloseBtn = createEl("span", ["close"], [], "×");
            var modalHeader = createEl("nav", ["modal-header"], []);
            var modalBody = createEl("div", ["modal-body"], []);

            var modal = createEl("div", ["bitbtn-modal-container"], [
                createEl("div", ["modal-content"], [
                    modalCloseBtn, modalHeader, modalBody
                ])
            ]);

            modal.openTab = function (clickedBtn, tabClassName) {
                var buttons = modal.querySelectorAll(".modal-header button");
                for (var i = 0; i < buttons.length; i++)
                    buttons[i].classList.remove("selected");
                clickedBtn.classList.add("selected");

                var tabs = modal.querySelectorAll(".tab");
                var show = modal.querySelector(".tab." + tabClassName);

                for (var i = 0; i < tabs.length; i++)
                    tabs[i].style.display = "none";
                show.style.display = "block";
            };

            modal.clearTabs = function () {
                while (modalHeader.hasChildNodes())
                    modalHeader.removeChild(modalHeader.lastChild);
                while (modalBody.hasChildNodes())
                    modalBody.removeChild(modalBody.lastChild);
            };

            modal.addTab = function (title, tabClassName, childElements) {
                var navBtn = createEl("button", [], [], title);
                navBtn.onclick = function (e) {
                    modal.openTab(navBtn, tabClassName);
                };
                modalHeader.appendChild(navBtn);

                var childrenAndTitle = childElements.slice();
                childrenAndTitle.unshift(
                    createEl("h2", ["tab-title"], [], title));
                var tab = createEl("div", ["tab", tabClassName], childrenAndTitle);
                modalBody.appendChild(tab);
            };

            modal.clickFirstTab = function () {
                var firstTabBtn = modalHeader.querySelectorAll("button")[0];
                firstTabBtn.click();
            };

            return modal;
        }

        showModalASAP = (function showModalASAP() {
            function showModal(modal) {
                modal.querySelector(".modal-body").appendChild(
                    createEl("p", ["small-text"], [],
                        "Timestamp : " + new Date().toLocaleTimeString())
                );

                document.body.appendChild(modal);
                modal.style.display = "block";

                // when to remove
                modalCloseBtn = modal.querySelector(".close");
                modalCloseBtn.onclick = function (e) {
                    removeAndShowNext(modal);
                };
                window.addEventListener('click', function (event) {
                    if (event.target == modal)
                        removeAndShowNext(modal);
                });
            }

            function removeAndShowNext(modal) {
                try {
                    modal.parentNode.removeChild(modal);
                } finally {
                    modalsToShow.shift();
                    if (modalsToShow.length > 0)
                        showModal(modalsToShow[0]);
                }
            }

            modalsToShow = [];

            function showModalASAP(modal) {
                (function () {
                    isModalShown = modalsToShow.length > 0;
                    modalsToShow.push(modal);
                    if (!isModalShown) showModal(modal);
                }());
            }
            return showModalASAP;
        })();

        var altMessages = {
            "bitcoin": "Looks like you don't have a wallet that supports 'BIP21' deep linking.",
            "bitcoin-out": "Looks like you don't have a wallet that support Bitcoin Output URI deep linking."
        };
        var altMessages_QR = {
            "bitcoin": "You appear to be on a desktop computer. Try scanning this QR code with a Bitcoin SV wallet on your smartphone.",
            "bitcoin-out": "You appear to be on a desktop computer. Try scanning this QR code with a Bitcoin SV wallet on your smartphone."
        };

        function getWalletListItems(uriScheme, os) {
            try {
                var supportedWalletItems = supportedWalletsByOS[uriScheme][os].map(
                    function (w) {
                        var img = createEl("img", ["wallet-item-img"], []);
                        img.src = w.img;
                        var name = createEl("h4", ["wallet-item-name"], []);
                        name.append(w.name);
                        var item = createEl("li", ["wallet-item"], [img, name]);
                        item.onclick = function (e) {
                            var win = window.open(w.app, "_blank");
                            win.focus();
                        };
                        return item;
                    });
            } catch (error) { supportedWalletItems = [] }

            if (supportedWalletItems.length === 0) {
                supportedWalletItems.push(createEl("li", [], [], 
                    "No supported wallets found for " + os))
            }
            
            return supportedWalletItems;
        }

        function showAlternatives(uri, showQR) {
            var modal = initModal();

            var uriScheme = uri.substr(0, uri.indexOf(':'));
            if (!(uriScheme in supportedWalletsByOS)) {
                console.log("Unknown URI scheme: (" + uri + "). Showing alternatives for Output URI instead.");
                uriScheme = "bitcoin-out";
            }

            if (showQR) {
                var imgContainer = createEl("div", ["qr-code-img"], []);
                try {
                    new QRCode(imgContainer, uri);
                } catch (error) {
                    imgContainer.appendChild(
                        createEl("p", [], [], "Failed to create QR code : " + error))
                }

                modal.addTab("QR Code", 'qr-code-tab', [
                    createEl("p", [], [], altMessages[uriScheme]),
                    createEl("p", [], [], altMessages_QR[uriScheme]),
                    createEl('h4', [], [], "Scan Here:"),
                    imgContainer,
                    createEl("hr", [], []),
                    createEl("h3", [], [], "Supported Android Apps"),
                    createEl("ul", ["wallet-list"], getWalletListItems(uriScheme, "Android")),
                    createEl("hr", [], []),
                    createEl("h3", [], [], "Supported iOS Apps"),
                    createEl("ul", ["wallet-list"], getWalletListItems(uriScheme, "iOS")),
                ]);

            }

            ////// OFFER WALLET APPS //////

            var osLabel = createEl("p", [], [], "Your OS is : " + os);
            modal.addTab("Wallets", 'wallets', [
                createEl("p", [], [], altMessages[uriScheme]),
                osLabel,
                createEl("p", [], [], "Here are some reccomended wallets:"),
                createEl("ul", ["wallet-list"], getWalletListItems(uriScheme, os))
            ]);

            modal.clickFirstTab();
            showModalASAP(modal);
        }

        function showError(errorMessage) {
            var modal = initModal();
            modal.addTab("Error", "errorMessage", [createEl("p", [], [], errorMessage)]);
            modal.clickFirstTab();
            showModalASAP(modal);
        }

        modalWindow = {
            showAlternatives: showAlternatives,
            showError: showError,
        };

        return modalWindow;
    }());

    var QRCode = (function () {
        //---------------------------------------------------------------------
        // QRCode for JavaScript
        //
        // Copyright (c) 2009 Kazuhiko Arase
        //
        // URL: http://www.d-project.com/
        //
        // Licensed under the MIT license:
        //   http://www.opensource.org/licenses/mit-license.php
        //
        // The word "QR Code" is registered trademark of 
        // DENSO WAVE INCORPORATED
        //   http://www.denso-wave.com/qrcode/faqpatent-e.html
        //
        //---------------------------------------------------------------------
        var QRCode; (function () { function e(e) { this.mode = n.MODE_8BIT_BYTE, this.data = e, this.parsedData = []; for (var t = 0, r = this.data.length; t < r; t++) { var i = [], s = this.data.charCodeAt(t); s > 65536 ? (i[0] = 240 | (s & 1835008) >>> 18, i[1] = 128 | (s & 258048) >>> 12, i[2] = 128 | (s & 4032) >>> 6, i[3] = 128 | s & 63) : s > 2048 ? (i[0] = 224 | (s & 61440) >>> 12, i[1] = 128 | (s & 4032) >>> 6, i[2] = 128 | s & 63) : s > 128 ? (i[0] = 192 | (s & 1984) >>> 6, i[1] = 128 | s & 63) : i[0] = s, this.parsedData.push(i); } this.parsedData = Array.prototype.concat.apply([], this.parsedData), this.parsedData.length != this.data.length && (this.parsedData.unshift(191), this.parsedData.unshift(187), this.parsedData.unshift(239)); } function t(e, t) { this.typeNumber = e, this.errorCorrectLevel = t, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = []; } function a(e, t) { if (e.length == undefined) throw new Error(e.length + "/" + t); var n = 0; while (n < e.length && e[n] == 0) n++; this.num = new Array(e.length - n + t); for (var r = 0; r < e.length - n; r++)this.num[r] = e[r + n]; } function f(e, t) { this.totalCount = e, this.dataCount = t; } function l() { this.buffer = [], this.length = 0; } function h() { return typeof CanvasRenderingContext2D != "undefined"; } function p() { var e = !1, t = navigator.userAgent; if (/android/i.test(t)) { e = !0; var n = t.toString().match(/android ([0-9]\.[0-9])/i); n && n[1] && (e = parseFloat(n[1])); } return e; } function g(e, t) { var n = 1, i = y(e); for (var s = 0, o = c.length; s <= o; s++) { var u = 0; switch (t) { case r.L: u = c[s][0]; break; case r.M: u = c[s][1]; break; case r.Q: u = c[s][2]; break; case r.H: u = c[s][3]; }if (i <= u) break; n++; } if (n > c.length) throw new Error("Too long data"); return n; } function y(e) { var t = encodeURI(e).toString().replace(/\%[0-9a-fA-F]{2}/g, "a"); return t.length + (t.length != e ? 3 : 0); } e.prototype = { getLength: function (e) { return this.parsedData.length; }, write: function (e) { for (var t = 0, n = this.parsedData.length; t < n; t++)e.put(this.parsedData[t], 8); } }, t.prototype = { addData: function (t) { var n = new e(t); this.dataList.push(n), this.dataCache = null; }, isDark: function (e, t) { if (e < 0 || this.moduleCount <= e || t < 0 || this.moduleCount <= t) throw new Error(e + "," + t); return this.modules[e][t]; }, getModuleCount: function () { return this.moduleCount; }, make: function () { this.makeImpl(!1, this.getBestMaskPattern()); }, makeImpl: function (e, n) { this.moduleCount = this.typeNumber * 4 + 17, this.modules = new Array(this.moduleCount); for (var r = 0; r < this.moduleCount; r++) { this.modules[r] = new Array(this.moduleCount); for (var i = 0; i < this.moduleCount; i++)this.modules[r][i] = null; } this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(e, n), this.typeNumber >= 7 && this.setupTypeNumber(e), this.dataCache == null && (this.dataCache = t.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, n); }, setupPositionProbePattern: function (e, t) { for (var n = -1; n <= 7; n++) { if (e + n <= -1 || this.moduleCount <= e + n) continue; for (var r = -1; r <= 7; r++) { if (t + r <= -1 || this.moduleCount <= t + r) continue; 0 <= n && n <= 6 && (r == 0 || r == 6) || 0 <= r && r <= 6 && (n == 0 || n == 6) || 2 <= n && n <= 4 && 2 <= r && r <= 4 ? this.modules[e + n][t + r] = !0 : this.modules[e + n][t + r] = !1; } } }, getBestMaskPattern: function () { var e = 0, t = 0; for (var n = 0; n < 8; n++) { this.makeImpl(!0, n); var r = s.getLostPoint(this); if (n == 0 || e > r) e = r, t = n; } return t; }, createMovieClip: function (e, t, n) { var r = e.createEmptyMovieClip(t, n), i = 1; this.make(); for (var s = 0; s < this.modules.length; s++) { var o = s * i; for (var u = 0; u < this.modules[s].length; u++) { var a = u * i, f = this.modules[s][u]; f && (r.beginFill(0, 100), r.moveTo(a, o), r.lineTo(a + i, o), r.lineTo(a + i, o + i), r.lineTo(a, o + i), r.endFill()); } } return r; }, setupTimingPattern: function () { for (var e = 8; e < this.moduleCount - 8; e++) { if (this.modules[e][6] != null) continue; this.modules[e][6] = e % 2 == 0; } for (var t = 8; t < this.moduleCount - 8; t++) { if (this.modules[6][t] != null) continue; this.modules[6][t] = t % 2 == 0; } }, setupPositionAdjustPattern: function () { var e = s.getPatternPosition(this.typeNumber); for (var t = 0; t < e.length; t++)for (var n = 0; n < e.length; n++) { var r = e[t], i = e[n]; if (this.modules[r][i] != null) continue; for (var o = -2; o <= 2; o++)for (var u = -2; u <= 2; u++)o == -2 || o == 2 || u == -2 || u == 2 || o == 0 && u == 0 ? this.modules[r + o][i + u] = !0 : this.modules[r + o][i + u] = !1; } }, setupTypeNumber: function (e) { var t = s.getBCHTypeNumber(this.typeNumber); for (var n = 0; n < 18; n++) { var r = !e && (t >> n & 1) == 1; this.modules[Math.floor(n / 3)][n % 3 + this.moduleCount - 8 - 3] = r; } for (var n = 0; n < 18; n++) { var r = !e && (t >> n & 1) == 1; this.modules[n % 3 + this.moduleCount - 8 - 3][Math.floor(n / 3)] = r; } }, setupTypeInfo: function (e, t) { var n = this.errorCorrectLevel << 3 | t, r = s.getBCHTypeInfo(n); for (var i = 0; i < 15; i++) { var o = !e && (r >> i & 1) == 1; i < 6 ? this.modules[i][8] = o : i < 8 ? this.modules[i + 1][8] = o : this.modules[this.moduleCount - 15 + i][8] = o; } for (var i = 0; i < 15; i++) { var o = !e && (r >> i & 1) == 1; i < 8 ? this.modules[8][this.moduleCount - i - 1] = o : i < 9 ? this.modules[8][15 - i - 1 + 1] = o : this.modules[8][15 - i - 1] = o; } this.modules[this.moduleCount - 8][8] = !e; }, mapData: function (e, t) { var n = -1, r = this.moduleCount - 1, i = 7, o = 0; for (var u = this.moduleCount - 1; u > 0; u -= 2) { u == 6 && u--; for (; ;) { for (var a = 0; a < 2; a++)if (this.modules[r][u - a] == null) { var f = !1; o < e.length && (f = (e[o] >>> i & 1) == 1); var l = s.getMask(t, r, u - a); l && (f = !f), this.modules[r][u - a] = f, i-- , i == -1 && (o++ , i = 7); } r += n; if (r < 0 || this.moduleCount <= r) { r -= n, n = -n; break; } } } } }, t.PAD0 = 236, t.PAD1 = 17, t.createData = function (e, n, r) { var i = f.getRSBlocks(e, n), o = new l; for (var u = 0; u < r.length; u++) { var a = r[u]; o.put(a.mode, 4), o.put(a.getLength(), s.getLengthInBits(a.mode, e)), a.write(o); } var c = 0; for (var u = 0; u < i.length; u++)c += i[u].dataCount; if (o.getLengthInBits() > c * 8) throw new Error("code length overflow. (" + o.getLengthInBits() + ">" + c * 8 + ")"); o.getLengthInBits() + 4 <= c * 8 && o.put(0, 4); while (o.getLengthInBits() % 8 != 0) o.putBit(!1); for (; ;) { if (o.getLengthInBits() >= c * 8) break; o.put(t.PAD0, 8); if (o.getLengthInBits() >= c * 8) break; o.put(t.PAD1, 8); } return t.createBytes(o, i); }, t.createBytes = function (e, t) { var n = 0, r = 0, i = 0, o = new Array(t.length), u = new Array(t.length); for (var f = 0; f < t.length; f++) { var l = t[f].dataCount, c = t[f].totalCount - l; r = Math.max(r, l), i = Math.max(i, c), o[f] = new Array(l); for (var h = 0; h < o[f].length; h++)o[f][h] = 255 & e.buffer[h + n]; n += l; var p = s.getErrorCorrectPolynomial(c), d = new a(o[f], p.getLength() - 1), v = d.mod(p); u[f] = new Array(p.getLength() - 1); for (var h = 0; h < u[f].length; h++) { var m = h + v.getLength() - u[f].length; u[f][h] = m >= 0 ? v.get(m) : 0; } } var g = 0; for (var h = 0; h < t.length; h++)g += t[h].totalCount; var y = new Array(g), b = 0; for (var h = 0; h < r; h++)for (var f = 0; f < t.length; f++)h < o[f].length && (y[b++] = o[f][h]); for (var h = 0; h < i; h++)for (var f = 0; f < t.length; f++)h < u[f].length && (y[b++] = u[f][h]); return y }; var n = { MODE_NUMBER: 1, MODE_ALPHA_NUM: 2, MODE_8BIT_BYTE: 4, MODE_KANJI: 8 }, r = { L: 1, M: 0, Q: 3, H: 2 }, i = { PATTERN000: 0, PATTERN001: 1, PATTERN010: 2, PATTERN011: 3, PATTERN100: 4, PATTERN101: 5, PATTERN110: 6, PATTERN111: 7 }, s = { PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]], G15: 1335, G18: 7973, G15_MASK: 21522, getBCHTypeInfo: function (e) { var t = e << 10; while (s.getBCHDigit(t) - s.getBCHDigit(s.G15) >= 0) t ^= s.G15 << s.getBCHDigit(t) - s.getBCHDigit(s.G15); return (e << 10 | t) ^ s.G15_MASK }, getBCHTypeNumber: function (e) { var t = e << 12; while (s.getBCHDigit(t) - s.getBCHDigit(s.G18) >= 0) t ^= s.G18 << s.getBCHDigit(t) - s.getBCHDigit(s.G18); return e << 12 | t }, getBCHDigit: function (e) { var t = 0; while (e != 0) t++ , e >>>= 1; return t }, getPatternPosition: function (e) { return s.PATTERN_POSITION_TABLE[e - 1] }, getMask: function (e, t, n) { switch (e) { case i.PATTERN000: return (t + n) % 2 == 0; case i.PATTERN001: return t % 2 == 0; case i.PATTERN010: return n % 3 == 0; case i.PATTERN011: return (t + n) % 3 == 0; case i.PATTERN100: return (Math.floor(t / 2) + Math.floor(n / 3)) % 2 == 0; case i.PATTERN101: return t * n % 2 + t * n % 3 == 0; case i.PATTERN110: return (t * n % 2 + t * n % 3) % 2 == 0; case i.PATTERN111: return (t * n % 3 + (t + n) % 2) % 2 == 0; default: throw new Error("bad maskPattern:" + e) } }, getErrorCorrectPolynomial: function (e) { var t = new a([1], 0); for (var n = 0; n < e; n++)t = t.multiply(new a([1, o.gexp(n)], 0)); return t }, getLengthInBits: function (e, t) { if (1 <= t && t < 10) switch (e) { case n.MODE_NUMBER: return 10; case n.MODE_ALPHA_NUM: return 9; case n.MODE_8BIT_BYTE: return 8; case n.MODE_KANJI: return 8; default: throw new Error("mode:" + e) } else if (t < 27) switch (e) { case n.MODE_NUMBER: return 12; case n.MODE_ALPHA_NUM: return 11; case n.MODE_8BIT_BYTE: return 16; case n.MODE_KANJI: return 10; default: throw new Error("mode:" + e) } else { if (!(t < 41)) throw new Error("type:" + t); switch (e) { case n.MODE_NUMBER: return 14; case n.MODE_ALPHA_NUM: return 13; case n.MODE_8BIT_BYTE: return 16; case n.MODE_KANJI: return 12; default: throw new Error("mode:" + e) } } }, getLostPoint: function (e) { var t = e.getModuleCount(), n = 0; for (var r = 0; r < t; r++)for (var i = 0; i < t; i++) { var s = 0, o = e.isDark(r, i); for (var u = -1; u <= 1; u++) { if (r + u < 0 || t <= r + u) continue; for (var a = -1; a <= 1; a++) { if (i + a < 0 || t <= i + a) continue; if (u == 0 && a == 0) continue; o == e.isDark(r + u, i + a) && s++ } } s > 5 && (n += 3 + s - 5) } for (var r = 0; r < t - 1; r++)for (var i = 0; i < t - 1; i++) { var f = 0; e.isDark(r, i) && f++ , e.isDark(r + 1, i) && f++ , e.isDark(r, i + 1) && f++ , e.isDark(r + 1, i + 1) && f++; if (f == 0 || f == 4) n += 3 } for (var r = 0; r < t; r++)for (var i = 0; i < t - 6; i++)e.isDark(r, i) && !e.isDark(r, i + 1) && e.isDark(r, i + 2) && e.isDark(r, i + 3) && e.isDark(r, i + 4) && !e.isDark(r, i + 5) && e.isDark(r, i + 6) && (n += 40); for (var i = 0; i < t; i++)for (var r = 0; r < t - 6; r++)e.isDark(r, i) && !e.isDark(r + 1, i) && e.isDark(r + 2, i) && e.isDark(r + 3, i) && e.isDark(r + 4, i) && !e.isDark(r + 5, i) && e.isDark(r + 6, i) && (n += 40); var l = 0; for (var i = 0; i < t; i++)for (var r = 0; r < t; r++)e.isDark(r, i) && l++; var c = Math.abs(100 * l / t / t - 50) / 5; return n += c * 10, n } }, o = { glog: function (e) { if (e < 1) throw new Error("glog(" + e + ")"); return o.LOG_TABLE[e] }, gexp: function (e) { while (e < 0) e += 255; while (e >= 256) e -= 255; return o.EXP_TABLE[e] }, EXP_TABLE: new Array(256), LOG_TABLE: new Array(256) }; for (var u = 0; u < 8; u++)o.EXP_TABLE[u] = 1 << u; for (var u = 8; u < 256; u++)o.EXP_TABLE[u] = o.EXP_TABLE[u - 4] ^ o.EXP_TABLE[u - 5] ^ o.EXP_TABLE[u - 6] ^ o.EXP_TABLE[u - 8]; for (var u = 0; u < 255; u++)o.LOG_TABLE[o.EXP_TABLE[u]] = u; a.prototype = { get: function (e) { return this.num[e] }, getLength: function () { return this.num.length }, multiply: function (e) { var t = new Array(this.getLength() + e.getLength() - 1); for (var n = 0; n < this.getLength(); n++)for (var r = 0; r < e.getLength(); r++)t[n + r] ^= o.gexp(o.glog(this.get(n)) + o.glog(e.get(r))); return new a(t, 0) }, mod: function (e) { if (this.getLength() - e.getLength() < 0) return this; var t = o.glog(this.get(0)) - o.glog(e.get(0)), n = new Array(this.getLength()); for (var r = 0; r < this.getLength(); r++)n[r] = this.get(r); for (var r = 0; r < e.getLength(); r++)n[r] ^= o.gexp(o.glog(e.get(r)) + t); return (new a(n, 0)).mod(e) } }, f.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]], f.getRSBlocks = function (e, t) { var n = f.getRsBlockTable(e, t); if (n == undefined) throw new Error("bad rs block @ typeNumber:" + e + "/errorCorrectLevel:" + t); var r = n.length / 3, i = []; for (var s = 0; s < r; s++) { var o = n[s * 3 + 0], u = n[s * 3 + 1], a = n[s * 3 + 2]; for (var l = 0; l < o; l++)i.push(new f(u, a)) } return i }, f.getRsBlockTable = function (e, t) { switch (t) { case r.L: return f.RS_BLOCK_TABLE[(e - 1) * 4 + 0]; case r.M: return f.RS_BLOCK_TABLE[(e - 1) * 4 + 1]; case r.Q: return f.RS_BLOCK_TABLE[(e - 1) * 4 + 2]; case r.H: return f.RS_BLOCK_TABLE[(e - 1) * 4 + 3]; default: return undefined } }, l.prototype = { get: function (e) { var t = Math.floor(e / 8); return (this.buffer[t] >>> 7 - e % 8 & 1) == 1 }, put: function (e, t) { for (var n = 0; n < t; n++)this.putBit((e >>> t - n - 1 & 1) == 1) }, getLengthInBits: function () { return this.length }, putBit: function (e) { var t = Math.floor(this.length / 8); this.buffer.length <= t && this.buffer.push(0), e && (this.buffer[t] |= 128 >>> this.length % 8), this.length++ } }; var c = [[17, 14, 11, 7], [32, 26, 20, 14], [53, 42, 32, 24], [78, 62, 46, 34], [106, 84, 60, 44], [134, 106, 74, 58], [154, 122, 86, 64], [192, 152, 108, 84], [230, 180, 130, 98], [271, 213, 151, 119], [321, 251, 177, 137], [367, 287, 203, 155], [425, 331, 241, 177], [458, 362, 258, 194], [520, 412, 292, 220], [586, 450, 322, 250], [644, 504, 364, 280], [718, 560, 394, 310], [792, 624, 442, 338], [858, 666, 482, 382], [929, 711, 509, 403], [1003, 779, 565, 439], [1091, 857, 611, 461], [1171, 911, 661, 511], [1273, 997, 715, 535], [1367, 1059, 751, 593], [1465, 1125, 805, 625], [1528, 1190, 868, 658], [1628, 1264, 908, 698], [1732, 1370, 982, 742], [1840, 1452, 1030, 790], [1952, 1538, 1112, 842], [2068, 1628, 1168, 898], [2188, 1722, 1228, 958], [2303, 1809, 1283, 983], [2431, 1911, 1351, 1051], [2563, 1989, 1423, 1093], [2699, 2099, 1499, 1139], [2809, 2213, 1579, 1219], [2953, 2331, 1663, 1273]], d = function () { var e = function (e, t) { this._el = e, this._htOption = t }; return e.prototype.draw = function (e) { function o(e, t) { var n = document.createElementNS("http://www.w3.org/2000/svg", e); for (var r in t) t.hasOwnProperty(r) && n.setAttribute(r, t[r]); return n } var t = this._htOption, n = this._el, r = e.getModuleCount(), i = Math.floor(t.width / r), s = Math.floor(t.height / r); this.clear(); var u = o("svg", { viewBox: "0 0 " + String(r) + " " + String(r), width: "100%", height: "100%", fill: t.colorLight }); u.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink"), n.appendChild(u), u.appendChild(o("rect", { fill: t.colorLight, width: "100%", height: "100%" })), u.appendChild(o("rect", { fill: t.colorDark, width: "1", height: "1", id: "template" })); for (var a = 0; a < r; a++)for (var f = 0; f < r; f++)if (e.isDark(a, f)) { var l = o("use", { x: String(f), y: String(a) }); l.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template"), u.appendChild(l) } }, e.prototype.clear = function () { while (this._el.hasChildNodes()) this._el.removeChild(this._el.lastChild) }, e }(), v = document.documentElement.tagName.toLowerCase() === "svg", m = v ? d : h() ? function () { function e() { this._elImage.src = this._elCanvas.toDataURL("image/png"), this._elImage.style.display = "block", this._elCanvas.style.display = "none" } function r(e, t) { var n = this; n._fFail = t, n._fSuccess = e; if (n._bSupportDataURI === null) { var r = document.createElement("img"), i = function () { n._bSupportDataURI = !1, n._fFail && n._fFail.call(n) }, s = function () { n._bSupportDataURI = !0, n._fSuccess && n._fSuccess.call(n) }; r.onabort = i, r.onerror = i, r.onload = s, r.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="; return } n._bSupportDataURI === !0 && n._fSuccess ? n._fSuccess.call(n) : n._bSupportDataURI === !1 && n._fFail && n._fFail.call(n) } if (this._android && this._android <= 2.1) { var t = 1 / window.devicePixelRatio, n = CanvasRenderingContext2D.prototype.drawImage; CanvasRenderingContext2D.prototype.drawImage = function (e, r, i, s, o, u, a, f, l) { if ("nodeName" in e && /img/i.test(e.nodeName)) for (var c = arguments.length - 1; c >= 1; c--)arguments[c] = arguments[c] * t; else typeof f == "undefined" && (arguments[1] *= t, arguments[2] *= t, arguments[3] *= t, arguments[4] *= t); n.apply(this, arguments) } } var i = function (e, t) { this._bIsPainted = !1, this._android = p(), this._htOption = t, this._elCanvas = document.createElement("canvas"), this._elCanvas.width = t.width, this._elCanvas.height = t.height, e.appendChild(this._elCanvas), this._el = e, this._oContext = this._elCanvas.getContext("2d"), this._bIsPainted = !1, this._elImage = document.createElement("img"), this._elImage.alt = "Scan me!", this._elImage.style.display = "none", this._el.appendChild(this._elImage), this._bSupportDataURI = null }; return i.prototype.draw = function (e) { var t = this._elImage, n = this._oContext, r = this._htOption, i = e.getModuleCount(), s = r.width / i, o = r.height / i, u = Math.round(s), a = Math.round(o); t.style.display = "none", this.clear(); for (var f = 0; f < i; f++)for (var l = 0; l < i; l++) { var c = e.isDark(f, l), h = l * s, p = f * o; n.strokeStyle = c ? r.colorDark : r.colorLight, n.lineWidth = 1, n.fillStyle = c ? r.colorDark : r.colorLight, n.fillRect(h, p, s, o), n.strokeRect(Math.floor(h) + .5, Math.floor(p) + .5, u, a), n.strokeRect(Math.ceil(h) - .5, Math.ceil(p) - .5, u, a) } this._bIsPainted = !0 }, i.prototype.makeImage = function () { this._bIsPainted && r.call(this, e) }, i.prototype.isPainted = function () { return this._bIsPainted }, i.prototype.clear = function () { this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height), this._bIsPainted = !1 }, i.prototype.round = function (e) { return e ? Math.floor(e * 1e3) / 1e3 : e }, i }() : function () { var e = function (e, t) { this._el = e, this._htOption = t }; return e.prototype.draw = function (e) { var t = this._htOption, n = this._el, r = e.getModuleCount(), i = Math.floor(t.width / r), s = Math.floor(t.height / r), o = ['<table style="border:0;border-collapse:collapse;">']; for (var u = 0; u < r; u++) { o.push("<tr>"); for (var a = 0; a < r; a++)o.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + i + "px;height:" + s + "px;background-color:" + (e.isDark(u, a) ? t.colorDark : t.colorLight) + ';"></td>'); o.push("</tr>") } o.push("</table>"), n.innerHTML = o.join(""); var f = n.childNodes[0], l = (t.width - f.offsetWidth) / 2, c = (t.height - f.offsetHeight) / 2; l > 0 && c > 0 && (f.style.margin = c + "px " + l + "px") }, e.prototype.clear = function () { this._el.innerHTML = "" }, e }(); QRCode = function (e, t) { this._htOption = { width: 256, height: 256, typeNumber: 4, colorDark: "#000000", colorLight: "#ffffff", correctLevel: r.H }, typeof t == "string" && (t = { text: t }); if (t) for (var n in t) this._htOption[n] = t[n]; typeof e == "string" && (e = document.getElementById(e)), this._htOption.useSVG && (m = d), this._android = p(), this._el = e, this._oQRCode = null, this._oDrawing = new m(this._el, this._htOption), this._htOption.text && this.makeCode(this._htOption.text) }, QRCode.prototype.makeCode = function (e) { this._oQRCode = new t(g(e, this._htOption.correctLevel), this._htOption.correctLevel), this._oQRCode.addData(e), this._oQRCode.make(), this._el.title = e, this._oDrawing.draw(this._oQRCode), this.makeImage() }, QRCode.prototype.makeImage = function () { typeof this._oDrawing.makeImage == "function" && (!this._android || this._android >= 3) && this._oDrawing.makeImage() }, QRCode.prototype.clear = function () { this._oDrawing.clear() }, QRCode.CorrectLevel = r })();
        return QRCode;
    }());

    function createBasicBtn() {

        var btn = document.createElement("button");
        btn.type = "button";
        btn.classList.add("bitbtn")
        if (os == "iOS" || os == "Android") {
            var portrait = (screen.width < screen.height)
            var smallSide = portrait ? screen.width : screen.height;
            var bigSide = portrait ? screen.height : screen.width;

            if (0 < smallSide && smallSide < 500) {
                btn.classList.add("bitbtn-phone");
                // btn.style.fontSize = 0.5 + "cm";
                // btn.style.fontSize = 3.3 + "vmin";
            }
            if (499 < smallSide && smallSide < 1000) {
                btn.classList.add("bitbtn-tablet");
                // btn.style.fontSize = 0.3 + "cm";
                // btn.style.fontSize = 1.8 + "vmin";
            }

        }

        var spinner = document.createElement('span');
        spinner.classList.add("status-circle");
        spinner.role = "status";
        spinner.append(" ")

        btn.cleanupCircle = function () {
            spinner.classList.remove("success");
            spinner.classList.remove("error");
            spinner.classList.remove("loading");
        }

        btn.setCircleStatus = function (status) {
            btn.cleanupCircle();
            spinner.classList.add(status);
        };

        btn.showSuccessInCircle = function () {
            btn.setCircleStatus("success");
        };
        btn.showErrorInCircle = function () {
            btn.setCircleStatus("error");
        };
        btn.showLoadingInCircle = function () {
            btn.setCircleStatus("loading");
        };

        btn.appendChild(spinner);

        var amount = document.createElement('span');
        amount.classList.add("bitbtn-amount");
        btn.appendChild(amount);
        btn.setAmount = function (amountString) {
            amount.innerHTML = amountString;
        }
        btn.setAmount("Loading...");

        var label = document.createElement('span');
        label.classList.add("bitbtn-label");
        btn.appendChild(label);
        btn.setLabel = function (labelString) {
            label.innerHTML = labelString;
        }

        btn.appLink = "bitcoin:"
        btn.setURI = function (uri) {
            btn.appLink = uri;
        }

        var notWork = document.createElement("div");
        notWork.classList.add("bitbtn-not-work");
        notWork.append("Did it not work?");
        notWork.onclick = function (e) {
            e.stopPropagation();
            btn.showErrorInCircle();
            showAlternatives(btn);
        }
        btn.append(notWork);

        btn.showNotWork = function (seconds) {
            seconds = seconds || 3
            seconds = parseFloat(seconds);
            notWork.classList.add("show");
            setTimeout(function () {
                notWork.classList.remove("show");
            }, seconds * 1000);
        }

        return btn;
    }

    ensureParamsAreValid = (function () {
        var outputParamNames = ["address", "amount", "currency", "script"];

        addrRegex = /[13][a-km-zA-HJ-NP-Z1-9]{25,34}/;

        scriptData = /(0x)?([0-9]|[A-F]|[a-f])+\b/;

        function ensureParamsAreValid(params) {

            if (typeof params !== "object") {
                throw new TypeError("BitBtn params must be a object!");
            }

            if (!("label" in params)) {
                params.label = "Send";
            }
            if (typeof params.label !== "string") {
                throw new TypeError("BitBtn Label must be a string!");
            }

            if (!("successMessage" in params)) {
                params.successMessage = "Done!";
            }
            if (typeof params.successMessage !== "string") {
                throw new TypeError("BitBtn SuccessMessage must be a string!");
            }

            if (!("onPayment" in params)) {
                params.onPayment = function (_) { };
            }
            if (typeof params.onPayment !== "function") {
                throw new TypeError("BitBtn onPayment must be a function!");
            }

            if (!("onError" in params)) {
                params.onError = function (_) { };
            }
            if (typeof params.onError !== "function") {
                throw new TypeError("BitBtn onError must be a function!");
            }

            if (!("bip21" in params)) {
                params.bip21 = false;
            }
            if (typeof params.bip21 !== "boolean") {
                throw new TypeError("BitBtn 'bip21' must be a boolean.");
            }

            if (!("walletLabel" in params)) {
                params.walletLabel = "BitBtn Payment";
            }
            if (typeof params.walletLabel !== "string") {
                throw new TypeError("BitBtn 'walletLabel' must be a string.");
            }
            
            if ("walletMessage" in params && typeof params.walletMessage !== "string") {
                throw new TypeError("BitBtn 'walletMessage' (optional) must be a string.");
            }
            
            if ("outputs" in params) {
                for (var i in outputParamNames) {
                    if (outputParamNames[i] in params) {
                        throw new Error("BitBtn with outputs cannot also have the following params: " +
                            params.join(", "));
                    }
                }
            } else {
                var _output = {};
                for (var i in outputParamNames) {
                    if (outputParamNames[i] in params) {
                        _output[outputParamNames[i]] = params[outputParamNames[i]];
                    }
                }
                params.outputs = [_output];
            }
            
            if (params.bip21 === true) {
                if (params.outputs.length > 1) {
                    throw new Error("Cannot have multiple outputs when using BIP21");
                }
            }

            if (!Array.isArray(params.outputs)) {
                throw new TypeError("BitBtn outputs must be an array of objects!");
            }

            for (var i in params.outputs) {
                var output = params.outputs[i];

                if (typeof output !== "object") {
                    throw new TypeError("BitBtn outputs must be an array of objects!");
                }

                ensureOutputIsValid(output);
            }

            params.currency = params.outputs[0].currency;
            params.amount = 0;
            for (var i in params.outputs) {

                if(params.outputs[i].currency !== params.currency) {
                    if (params.outputs[i].amount !== 0) {
                        throw new Error("All outputs must use the same currency");
                    }
                }
                params.amount += params.outputs[i].amount;
            }
        }

        function ensureOutputIsValid(output) {

            if (!("amount" in output)) {
                output.amount = 0.0;
            }
            if (typeof output.amount === "string") {
                output.amount = parseFloat(output.amount);
            }
            if (typeof output.amount !== "number") {
                throw new TypeError("BitBtn output amount must be a positive number or 0!");
            }
            if (output.amount === NaN || output.amount < 0) {
                throw new TypeError("BitBtn output amount must be a positive number or 0!");
            }

            if (!("currency" in output)) {
                output.currency = "bsv"
            }
            output.currency = output.currency.toLowerCase();

            if (typeof output.currency !== "string") {
                throw new TypeError("BitBtn currency must be a string!");
            }

            if(output.currency !== "bsv") var price = getPrice(output.currency)
            else var price = 1;

            output.bsvAmount = output.amount / price;
            output.bsvAmount = Math.round(output.bsvAmount * 100000000) / 100000000

            if (!("address" in output)) {
                if ("paymail" in output) {
                    throw new Error("BitBtn doesn't support paymail yet.");
                    // TODO: Implement Paymail to Address convertion
                }
            }

            if ("address" in output && "script" in output) {
                throw new Error("The same BitBtn output cannot have an address and a script at the same time.");
            }
            if (!("address" in output) && !("script" in output)) {
                throw new Error("A BitBtn output must have either an address or a script.");
            }

            if ("address" in output) {
                if (typeof output.address !== "string") {
                    throw new TypeError("BitBtn address must be a string.");
                }
                if (!addrRegex.test(output.address)) {
                    throw new Error("BitBtn address appears invalid: " + output.address);
                }

                output.script = scripter.p2pkh(output.address);
            }

            if (!("script" in output)) {
                throw new Error("BitBtn output doesn't have (or didn't generate) a script.");
            }

            output.script = output.script.trim().toLowerCase();
            ensureScriptIsHex(output);
        }

        var hexChars = "0123456789abcdef".split("");
        function ensureScriptIsHex(output) {
            var s = output.script;
            if (s.length % 2 != 0) {
                throw new SyntaxError("BitBtn - Script cannot have an odd number of letters : " + s)
            }
            for (var i = 0; i < s.length; i++) {
                if (!hexChars.includes(s[i])) {
                    throw new SyntaxError("BitBtn - Invalid script syntax : " + s);
                }
            }
        }

        return ensureParamsAreValid;
    }());

    var scripter = (function () {

        var base58Alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

        var to_b58 = function (
            B, //Uint8Array raw byte input
            A //Base58 characters (i.e. "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")
        ) {
            var d = [],
                s = "",
                i, j, c, n;
            for (i in B) {
                j = 0,
                    c = B[i];
                s += c || s.length ^ i ? "" : A[0];
                while (j in d || c) {
                    n = d[j];
                    n = n ? n * 256 + c : c;
                    c = n / 58 | 0;
                    d[j] = n % 58;
                    j++;
                }
            }
            while (j--)
                s += A[d[j]];
            return s;
        }


        var from_b58 = function (
            S, //Base58 string
            A //Base58 characters (i.e. "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")
        ) {
            var d = [],
                b = [],
                i, j, c, n;
            for (i in S) {
                j = 0,
                    c = A.indexOf(S[i]);
                if (c < 0)
                    return undefined;
                c || b.length ^ i ? i : b.push(0);
                while (j in d || c) {
                    n = d[j];
                    n = n ? n * 58 + c : c;
                    c = n >> 8;
                    d[j] = n % 256;
                    j++;
                }
            }
            while (j--)
                b.push(d[j]);
            return new Uint8Array(b);
        }

        function toHexString(byteArray) {
            return Array.from(byteArray, function (byte) {
                return ('0' + (byte & 0xFF).toString(16)).slice(-2);
            }).join('')
        }

        function hex2littleEndian(hexValue){
            var hexParts = []
            for (var i = 0; i < hexValue.length; i+=2)
                hexParts.push(hexValue.substr(i, 2));
            return hexParts.reverse().join("")
        }

        const _2bytesLimit = Math.pow(16, 4);
        const _4bytesLimit = Math.pow(16, 8);

        function hexValueInScript(hexString) {
            if (hexString.length % 2 == 1)
                hexString = "0" + hexString;

            var len = (hexString.length / 2);

            if (hexString === "00") // OP_FALSE
                return "00";

            if (len < 76)
                return ("0" + len.toString(16)).slice(-2) + hexString;
            else if (76 <= len && len < 256)
                return "4c" + ("0" + len.toString(16)).slice(-2) + hexString;
            else if (256 <= len && len < _2bytesLimit)
                return "4d" + hex2littleEndian(("000" + len.toString(16)).slice(-4)) + hexString;
            else if (_2bytesLimit <= len && len < _4bytesLimit)
                return "4e" + hex2littleEndian(("0000000" + len.toString(16)).slice(-8)) + hexString;
        }

        function p2pkh(address) {

            var pub = from_b58(address, base58Alphabet);
            var pubCheckSum = pub.slice(21);
            var pubMain = pub.slice(1, 21);
            var pubHash160 = toHexString(pubMain);

            // TODO: Check the checksum and throw exception if address is invalid

            var resultScript = "76a9" + hexValueInScript(pubHash160) + "88ac";
            return resultScript;
        }

        function str2hex(str){
            if (Array.isArray(str))
                return str.map(function(part) { return str2hex(part) });

            var result = "";
            for (var i=0; i<str.length; i++) {
                var hex = str.charCodeAt(i).toString(16);
                result += ("0"+hex).slice(-2);
            }
            return result;
        }

        function op_return(hexValues, use_op_false) {
            if(use_op_false === undefined)
                use_op_false = true

            if (typeof(hexValues) == "string")
                hexValues = [ hexValues ];
            if (!Array.isArray(hexValues))
                throw new Error("op_return method expects an array of hexadecimal strings");
            var resultScript = use_op_false? "006a" : "6a"
            for (var i = 0; i < hexValues.length; i++) {
                resultScript = resultScript + hexValueInScript(hexValues[i]);
            }
            return resultScript;
        }

        return {
            p2pkh: p2pkh,
            op_return: op_return,
            str2hex: str2hex,
        }
    }())

    function setBtnParams(btn, params) {
        ensureParamsAreValid(params)
        btn.params = params;

        var roundedAmount = Math.round(btn.params.amount * 100) / 100
        btn.setAmount(roundedAmount + " " + btn.params.currency.toUpperCase());
        btn.setLabel(btn.params.label);

        var infoParams = "";
        infoParams += "label=" + encodeURIComponent(btn.params.walletLabel);
        if (btn.params.walletMessage !== undefined) {
            infoParams += "&message=" + encodeURIComponent(btn.params.walletMessage);
        }

        if (btn.params.bip21 === true) {
            var out = btn.params.outputs[0];
            btn.setURI("bitcoin:" + out.address + "?sv=&amount=" + out.bsvAmount + "&" + infoParams);
        }
        else {
            var uri = "bitcoin-out:";
            var outs = btn.params.outputs.map(function (o) {
                return { v: o.bsvAmount, s: o.script }
            });
            btn.setURI(uri + encodeURIComponent(JSON.stringify(outs)) + "?" + infoParams);
        }
    }

    openDeepUri = (function () {

        var notSupported = function (appLink) {
            console.error("App Links are not supported on this configuration")
        }

        var direct = function (appLink) {
            window.location = appLink;
        }

        var cta = direct; // BitBtn always acts in click events anyway.

        var iframe = function (appLink) {
            var iframeWithURI = document.createElement('iframe');
            iframeWithURI.style.display = "none";
            document.body.appendChild(iframeWithURI);
            if (iframeWithURI !== null) {
                iframeWithURI.src = appLink;
            }
        }

        var intentCta = function (appLink) {
            var linkScheme = appLink.substr(0, appLink.indexOf(':'));
            var linkPath = appLink.substr(appLink.indexOf(':')+1);
            var intentUri = "intent:" + linkPath + "#Intent;scheme=" + linkScheme + ";end";
            direct(intentUri)
        }

        var final = iframe;
        if (os == "iOS")
            final = cta;
        else if (os == "Android")
            final = intentCta

        return final;
    }());

    var appLinkOpened = false;
    var appLinkOpenedMaybe = false;
    function onAppLinkOpened() { appLinkOpened = true; }
    function onAppLinkOpenedMaybe() { appLinkOpenedMaybe = true; }

    window.addEventListener('pagehide', onAppLinkOpened, false);
    window.addEventListener('blur', onAppLinkOpened, false);
    window.addEventListener('beforeunload', onAppLinkOpenedMaybe, false);

    function openBitcoinUri(btn, success, failure) {
        var appLink = btn.appLink;
        if (!appLink)
            throw new TypeError("AppLink not present.");

        appLinkOpened = false;
        appLinkOpenedMaybe = false;

        openDeepUri(appLink);

        var timeout = setTimeout(function () {
            if (appLinkOpened) {
                success();
            }
            else if (appLinkOpenedMaybe) {
                btn.showNotWork();
            }
            else {
                if (os == "iOS") {
                    btn.showNotWork(5)
                }
                else {
                    failure();
                }
            }

        }, 100);
    }

    function waitForPayment(btn) {

        // btn.showLoadingInCircle(); // TODO: uncomment when method is implemented

        console.error(new Error("BitBtn 'waitForPayment' cannot be implemented for BIP21 transactions!"))

        // TODO: if btn.params.bip21 is false - query bitIndex for the payment

        // TODO: HOW to query BitIndex (for B):
        //          BitIndex has a non-standard script index endpoint in the roadmap.
        //          But... that might not be ready when it's time to implement this method.
        //          
        //          If it is ready:
        //              Add an extra output to the outputs.
        //              It is an OP_Return output and it writes a random id (hash of some stuff?)
        //              wait for the output of this OP_return to appear and get the TX in which it comes
        //              If the TX contains all the right outputs, then the waiting is done.
        //              Otherwise - keep waiting.
        //
        //          If the non-standard TX index is NOT ready:
        //              Register an XPUB in BitIndex for tracking.
        //              When button is clicked, request a non-used address from the XPUB.
        //              Pass the "reserve" option to reserve this address for this user.
        //              Add an output to the outputs. The output sends dust to this address.
        //              Query BitIndex for the dust transaction output.
        //              Get the Transaction ID
        //              If the TX contains all the right outputs, then the waiting is done.
        //              Otherwise - keep waiting.
        //              

        // TODO: if payment is successful, call the onPayment callback

        ////// FUTURE PLANS //////

        // TODO: possible improvement for the future:
        //          - try to check for double spend attempts
        //          - if TX appears, but another TX uses the same inputs
        //          - Show error in UI
        //          - call the error callback

        // TODO: possible improvement for the future:
        //          - check if payment was done with BTC or BCH istead.
        //          - if it was, auto-return the money
        //              and tell the user that he used the wrong Bitcoin
        //          - then call the error callback
    }

    function showAlternatives(btn) {

        // WARNING: I saw in internet that there are some problems with deeplinks on iOS
        //              It is possible that the button won't know if no iOS wallet is available.
        //
        // TODO:        Try to look for a workaround 
        //                      or simply show a small link for 1 second
        //                      with text "wallet didn't open?"
        //                      If the user clicks it, then offer the modal window tabs
        //                      with iOS wallets that support the protocol being used.

        var showQR = (os != "iOS" && os != "Android");

        if(btn.appLink.length * 8 > 1056) {
            showQR = false;
            console.warn("BitBtn AppLink is too long to show as QR code : " + btn.appLink.length)
        }

        if (showQR && !btn.params.bip21)
            waitForPayment(btn);

        modalWindow.showAlternatives(btn.appLink, showQR);
    }

    function onBtnClick(btn) {
        openBitcoinUri(btn,
            success = function () {
                if (btn.params.bip21 === true) {
                    btn.showSuccessInCircle();
                } else {
                    waitForPayment();
                }
            },
            failure = function () {
                btn.showErrorInCircle();
                showAlternatives(btn);
                var onError = btn.params.onError || (function (_) { });
                onError(new Error("Did not detect app opening. " +
                    "Assuming that the user doesn't have a matching app."));
            });
    }

    function create(container, params) {
        addCSS(params.debug);
        try {
            var btn = createBasicBtn();
            container.appendChild(btn);
            setBtnParams(btn, params);
            btn.onclick = function (e) {
                e.stopPropagation();
                onBtnClick(e.currentTarget);
            }
            return btn;
        } catch (e) {
            var onError = params.onError || (function (_) { });
            modalWindow.showError(e);
            onError(e);
        }
    }

    return {
        create: create,
        getPrice: getPrice,
        scripter: scripter,
    }

})()
