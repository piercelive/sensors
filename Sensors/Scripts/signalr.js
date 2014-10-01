﻿/*!
 * ASP.NET SignalR JavaScript Library v2.1.0
 * http://signalr.net/
 *
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *
 */
(function (n, t, i) { function w(t, i) { var u, f; if (n.isArray(t)) { for (u = t.length - 1; u >= 0; u--) f = t[u], n.type(f) === "string" && r.transports[f] || (i.log("Invalid transport: " + f + ", removing it from the transports list."), t.splice(u, 1)); t.length === 0 && (i.log("No transports remain within the specified transport array."), t = null) } else if (r.transports[t] || t === "auto") { if (t === "auto" && r._.ieVersion <= 8) return ["longPolling"] } else i.log("Invalid transport: " + t.toString() + "."), t = null; return t } function b(n) { return n === "http:" ? 80 : n === "https:" ? 443 : void 0 } function a(n, t) { return t.match(/:\d+$/) ? t : t + ":" + b(n) } function k(t, i) { var u = this, r = []; u.tryBuffer = function (i) { return t.state === n.signalR.connectionState.connecting ? (r.push(i), !0) : !1 }; u.drain = function () { if (t.state === n.signalR.connectionState.connected) while (r.length > 0) i(r.shift()) }; u.clear = function () { r = [] } } var f = { nojQuery: "jQuery was not found. Please ensure jQuery is referenced before the SignalR client JavaScript file.", noTransportOnInit: "No transport could be initialized successfully. Try specifying a different transport or none at all for auto initialization.", errorOnNegotiate: "Error during negotiation request.", stoppedWhileLoading: "The connection was stopped during page load.", stoppedWhileNegotiating: "The connection was stopped during the negotiate request.", errorParsingNegotiateResponse: "Error parsing negotiate response.", errorDuringStartRequest: "Error during start request. Stopping the connection.", stoppedDuringStartRequest: "The connection was stopped during the start request.", errorParsingStartResponse: "Error parsing start response: '{0}'. Stopping the connection.", invalidStartResponse: "Invalid start response: '{0}'. Stopping the connection.", protocolIncompatible: "You are using a version of the client that isn't compatible with the server. Client version {0}, server version {1}.", sendFailed: "Send failed.", parseFailed: "Failed at parsing response: {0}", longPollFailed: "Long polling request failed.", eventSourceFailedToConnect: "EventSource failed to connect.", eventSourceError: "Error raised by EventSource", webSocketClosed: "WebSocket closed.", pingServerFailedInvalidResponse: "Invalid ping response when pinging server: '{0}'.", pingServerFailed: "Failed to ping server.", pingServerFailedStatusCode: "Failed to ping server.  Server responded with status code {0}, stopping the connection.", pingServerFailedParse: "Failed to parse ping server response, stopping the connection.", noConnectionTransport: "Connection is in an invalid state, there is no transport active.", webSocketsInvalidState: "The Web Socket transport is in an invalid state, transitioning into reconnecting.", reconnectTimeout: "Couldn't reconnect within the configured timeout of {0} ms, disconnecting.", reconnectWindowTimeout: "The client has been inactive since {0} and it has exceeded the inactivity timeout of {1} ms. Stopping the connection." }; if (typeof n != "function") throw new Error(f.nojQuery); var r, h, s = t.document.readyState === "complete", e = n(t), c = "__Negotiate Aborted__", u = { onStart: "onStart", onStarting: "onStarting", onReceived: "onReceived", onError: "onError", onConnectionSlow: "onConnectionSlow", onReconnecting: "onReconnecting", onReconnect: "onReconnect", onStateChanged: "onStateChanged", onDisconnect: "onDisconnect" }, v = function (n, i) { if (i !== !1) { var r; typeof t.console != "undefined" && (r = "[" + (new Date).toTimeString() + "] SignalR: " + n, t.console.debug ? t.console.debug(r) : t.console.log && t.console.log(r)) } }, o = function (t, i, r) { return i === t.state ? (t.state = r, n(t).triggerHandler(u.onStateChanged, [{ oldState: i, newState: r }]), !0) : !1 }, y = function (n) { return n.state === r.connectionState.disconnected }, l = function (n) { return n._.keepAliveData.activated && n.transport.supportsKeepAlive(n) }, p = function (i) { var f, e; i._.configuredStopReconnectingTimeout || (e = function (t) { var i = r._.format(r.resources.reconnectTimeout, t.disconnectTimeout); t.log(i); n(t).triggerHandler(u.onError, [r._.error(i, "TimeoutException")]); t.stop(!1, !1) }, i.reconnecting(function () { var n = this; n.state === r.connectionState.reconnecting && (f = t.setTimeout(function () { e(n) }, n.disconnectTimeout)) }), i.stateChanged(function (n) { n.oldState === r.connectionState.reconnecting && t.clearTimeout(f) }), i._.configuredStopReconnectingTimeout = !0) }; r = function (n, t, i) { return new r.fn.init(n, t, i) }; r._ = { defaultContentType: "application/x-www-form-urlencoded; charset=UTF-8", ieVersion: function () { var i, n; return t.navigator.appName === "Microsoft Internet Explorer" && (n = /MSIE ([0-9]+\.[0-9]+)/.exec(t.navigator.userAgent), n && (i = t.parseFloat(n[1]))), i }(), error: function (n, t, i) { var r = new Error(n); return r.source = t, typeof i != "undefined" && (r.context = i), r }, transportError: function (n, t, r, u) { var f = this.error(n, r, u); return f.transport = t ? t.name : i, f }, format: function () { for (var t = arguments[0], n = 0; n < arguments.length - 1; n++) t = t.replace("{" + n + "}", arguments[n + 1]); return t }, firefoxMajorVersion: function (n) { var t = n.match(/Firefox\/(\d+)/); return !t || !t.length || t.length < 2 ? 0 : parseInt(t[1], 10) }, configurePingInterval: function (i) { var f = i._.config, e = function (t) { n(i).triggerHandler(u.onError, [t]) }; f && !i._.pingIntervalId && f.pingInterval && (i._.pingIntervalId = t.setInterval(function () { r.transports._logic.pingServer(i).fail(e) }, f.pingInterval)) } }; r.events = u; r.resources = f; r.ajaxDefaults = { processData: !0, timeout: null, async: !0, global: !1, cache: !1 }; r.changeState = o; r.isDisconnecting = y; r.connectionState = { connecting: 0, connected: 1, reconnecting: 2, disconnected: 4 }; r.hub = { start: function () { throw new Error("SignalR: Error loading hubs. Ensure your hubs reference is correct, e.g. <script src='/signalr/js'><\/script>."); } }; e.load(function () { s = !0 }); r.fn = r.prototype = { init: function (t, i, r) { var f = n(this); this.url = t; this.qs = i; this.lastError = null; this._ = { keepAliveData: {}, connectingMessageBuffer: new k(this, function (n) { f.triggerHandler(u.onReceived, [n]) }), onFailedTimeoutHandle: null, lastMessageAt: (new Date).getTime(), lastActiveAt: (new Date).getTime(), beatInterval: 5e3, beatHandle: null, totalTransportConnectTimeout: 0 }; typeof r == "boolean" && (this.logging = r) }, _parseResponse: function (n) { var t = this; return n ? typeof n == "string" ? t.json.parse(n) : n : n }, _originalJson: t.JSON, json: t.JSON, isCrossDomain: function (i, r) { var u; return (i = n.trim(i), r = r || t.location, i.indexOf("http") !== 0) ? !1 : (u = t.document.createElement("a"), u.href = i, u.protocol + a(u.protocol, u.host) !== r.protocol + a(r.protocol, r.host)) }, ajaxDataType: "text", contentType: "application/json; charset=UTF-8", logging: !1, state: r.connectionState.disconnected, clientProtocol: "1.4", reconnectDelay: 2e3, transportConnectTimeout: 0, disconnectTimeout: 3e4, reconnectWindow: 3e4, keepAliveWarnAt: 2 / 3, start: function (i, h) { var a = this, v = { pingInterval: 3e5, waitForPageLoad: !0, transport: "auto", jsonp: !1 }, d, y = a._deferral || n.Deferred(), b = t.document.createElement("a"), k, g; if (a.lastError = null, a._deferral = y, !a.json) throw new Error("SignalR: No JSON parser found. Please ensure json2.js is referenced before the SignalR.js file if you need to support clients without native JSON parsing support, e.g. IE<8."); if (n.type(i) === "function" ? h = i : n.type(i) === "object" && (n.extend(v, i), n.type(v.callback) === "function" && (h = v.callback)), v.transport = w(v.transport, a), !v.transport) throw new Error("SignalR: Invalid transport(s) specified, aborting start."); return (a._.config = v, !s && v.waitForPageLoad === !0) ? (a._.deferredStartHandler = function () { a.start(i, h) }, e.bind("load", a._.deferredStartHandler), y.promise()) : a.state === r.connectionState.connecting ? y.promise() : o(a, r.connectionState.disconnected, r.connectionState.connecting) === !1 ? (y.resolve(a), y.promise()) : (p(a), b.href = a.url, b.protocol && b.protocol !== ":" ? (a.protocol = b.protocol, a.host = b.host) : (a.protocol = t.document.location.protocol, a.host = b.host || t.document.location.host), a.baseUrl = a.protocol + "//" + a.host, a.wsProtocol = a.protocol === "https:" ? "wss://" : "ws://", v.transport === "auto" && v.jsonp === !0 && (v.transport = "longPolling"), a.url.indexOf("//") === 0 && (a.url = t.location.protocol + a.url, a.log("Protocol relative URL detected, normalizing it to '" + a.url + "'.")), this.isCrossDomain(a.url) && (a.log("Auto detected cross domain url."), v.transport === "auto" && (v.transport = ["webSockets", "serverSentEvents", "longPolling"]), typeof v.withCredentials == "undefined" && (v.withCredentials = !0), v.jsonp || (v.jsonp = !n.support.cors, v.jsonp && a.log("Using jsonp because this browser doesn't support CORS.")), a.contentType = r._.defaultContentType), a.withCredentials = v.withCredentials, a.ajaxDataType = v.jsonp ? "jsonp" : "text", n(a).bind(u.onStart, function () { n.type(h) === "function" && h.call(a); y.resolve(a) }), d = function (i, s) { var p = r._.error(f.noTransportOnInit); if (s = s || 0, s >= i.length) { n(a).triggerHandler(u.onError, [p]); y.reject(p); a.stop(); return } if (a.state !== r.connectionState.disconnected) { var w = i[s], h = r.transports[w], c = !1, v = function () { c || (c = !0, t.clearTimeout(a._.onFailedTimeoutHandle), h.stop(a), d(i, s + 1)) }; a.transport = h; try { a._.onFailedTimeoutHandle = t.setTimeout(function () { a.log(h.name + " timed out when trying to connect."); v() }, a._.totalTransportConnectTimeout); h.start(a, function () { var i = r._.firefoxMajorVersion(t.navigator.userAgent) >= 11, f = !!a.withCredentials && i; a.state !== r.connectionState.disconnected && (c || (c = !0, t.clearTimeout(a._.onFailedTimeoutHandle), l(a) && r.transports._logic.monitorKeepAlive(a), r.transports._logic.startHeartbeat(a), r._.configurePingInterval(a), o(a, r.connectionState.connecting, r.connectionState.connected), a._.connectingMessageBuffer.drain(), n(a).triggerHandler(u.onStart), e.bind("unload", function () { a.log("Window unloading, stopping the connection."); a.stop(f) }), i && e.bind("beforeunload", function () { t.setTimeout(function () { a.stop(f) }, 0) }))) }, v) } catch (b) { a.log(h.name + " transport threw '" + b.message + "' when attempting to start."); v() } } }, k = a.url + "/negotiate", g = function (t, i) { var e = r._.error(f.errorOnNegotiate, t, i._.negotiateRequest); n(i).triggerHandler(u.onError, e); y.reject(e); i.stop() }, n(a).triggerHandler(u.onStarting), k = r.transports._logic.prepareQueryString(a, k), a.log("Negotiating with '" + k + "'."), a._.negotiateRequest = r.transports._logic.ajax(a, { url: k, error: function (n, t) { t !== c ? g(n, a) : y.reject(r._.error(f.stoppedWhileNegotiating, null, a._.negotiateRequest)) }, success: function (t) { var i, e, h, o = [], s = []; try { i = a._parseResponse(t) } catch (c) { g(r._.error(f.errorParsingNegotiateResponse, c), a); return } if (e = a._.keepAliveData, a.appRelativeUrl = i.Url, a.id = i.ConnectionId, a.token = i.ConnectionToken, a.webSocketServerUrl = i.WebSocketServerUrl, a._.longPollDelay = i.LongPollDelay * 1e3, a.disconnectTimeout = i.DisconnectTimeout * 1e3, a._.totalTransportConnectTimeout = a.transportConnectTimeout + i.TransportConnectTimeout * 1e3, i.KeepAliveTimeout ? (e.activated = !0, e.timeout = i.KeepAliveTimeout * 1e3, e.timeoutWarning = e.timeout * a.keepAliveWarnAt, a._.beatInterval = (e.timeout - e.timeoutWarning) / 3) : e.activated = !1, a.reconnectWindow = a.disconnectTimeout + (e.timeout || 0), !i.ProtocolVersion || i.ProtocolVersion !== a.clientProtocol) { h = r._.error(r._.format(f.protocolIncompatible, a.clientProtocol, i.ProtocolVersion)); n(a).triggerHandler(u.onError, [h]); y.reject(h); return } n.each(r.transports, function (n) { if (n.indexOf("_") === 0 || n === "webSockets" && !i.TryWebSockets) return !0; s.push(n) }); n.isArray(v.transport) ? n.each(v.transport, function (t, i) { n.inArray(i, s) >= 0 && o.push(i) }) : v.transport === "auto" ? o = s : n.inArray(v.transport, s) >= 0 && o.push(v.transport); d(o) } }), y.promise()) }, starting: function (t) { var i = this; return n(i).bind(u.onStarting, function () { t.call(i) }), i }, send: function (n) { var t = this; if (t.state === r.connectionState.disconnected) throw new Error("SignalR: Connection must be started before data can be sent. Call .start() before .send()"); if (t.state === r.connectionState.connecting) throw new Error("SignalR: Connection has not been fully initialized. Use .start().done() or .start().fail() to run logic after the connection has started."); return t.transport.send(t, n), t }, received: function (t) { var i = this; return n(i).bind(u.onReceived, function (n, r) { t.call(i, r) }), i }, stateChanged: function (t) { var i = this; return n(i).bind(u.onStateChanged, function (n, r) { t.call(i, r) }), i }, error: function (t) { var i = this; return n(i).bind(u.onError, function (n, r, u) { i.lastError = r; t.call(i, r, u) }), i }, disconnected: function (t) { var i = this; return n(i).bind(u.onDisconnect, function () { t.call(i) }), i }, connectionSlow: function (t) { var i = this; return n(i).bind(u.onConnectionSlow, function () { t.call(i) }), i }, reconnecting: function (t) { var i = this; return n(i).bind(u.onReconnecting, function () { t.call(i) }), i }, reconnected: function (t) { var i = this; return n(i).bind(u.onReconnect, function () { t.call(i) }), i }, stop: function (i, h) { var a = this, v = a._deferral; if (a._.deferredStartHandler && e.unbind("load", a._.deferredStartHandler), delete a._.config, delete a._.deferredStartHandler, !s && (!a._.config || a._.config.waitForPageLoad === !0)) { a.log("Stopping connection prior to negotiate."); v && v.reject(r._.error(f.stoppedWhileLoading)); return } if (a.state !== r.connectionState.disconnected) return a.log("Stopping connection."), o(a, a.state, r.connectionState.disconnected), t.clearTimeout(a._.beatHandle), t.clearTimeout(a._.onFailedTimeoutHandle), t.clearInterval(a._.pingIntervalId), a.transport && (a.transport.stop(a), h !== !1 && a.transport.abort(a, i), l(a) && r.transports._logic.stopMonitoringKeepAlive(a), a.transport = null), a._.negotiateRequest && (a._.negotiateRequest.abort(c), delete a._.negotiateRequest), r.transports._logic.tryAbortStartRequest(a), n(a).triggerHandler(u.onDisconnect), delete a._deferral, delete a.messageId, delete a.groupsToken, delete a.id, delete a._.pingIntervalId, delete a._.lastMessageAt, delete a._.lastActiveAt, delete a._.longPollDelay, a._.connectingMessageBuffer.clear(), a }, log: function (n) { v(n, this.logging) } }; r.fn.init.prototype = r.fn; r.noConflict = function () { return n.connection === r && (n.connection = h), r }; n.connection && (h = n.connection); n.connection = n.signalR = r })(window.jQuery, window), function (n, t) { function o(n) { n._.keepAliveData.monitoring && h(n); r.markActive(n) && (n._.beatHandle = t.setTimeout(function () { o(n) }, n._.beatInterval)) } function h(t) { var r = t._.keepAliveData, f; t.state === i.connectionState.connected && (f = (new Date).getTime() - t._.lastMessageAt, f >= r.timeout ? (t.log("Keep alive timed out.  Notifying transport that connection has been lost."), t.transport.lostConnection(t)) : f >= r.timeoutWarning ? r.userNotified || (t.log("Keep alive has been missed, connection may be dead/slow."), n(t).triggerHandler(u.onConnectionSlow), r.userNotified = !0) : r.userNotified = !1) } function f(n, t) { var i = n.url + t; return n.transport && (i += "?transport=" + n.transport.name), r.prepareQueryString(n, i) } var i = n.signalR, u = n.signalR.events, s = n.signalR.changeState, e = "__Start Aborted__", r; i.transports = {}; r = i.transports._logic = { ajax: function (t, i) { return n.ajax(n.extend(!0, {}, n.signalR.ajaxDefaults, { type: "GET", data: {}, xhrFields: { withCredentials: t.withCredentials }, contentType: t.contentType, dataType: t.ajaxDataType }, i)) }, pingServer: function (t) { var e, f, u = n.Deferred(); return t.transport ? (e = t.url + "/ping", e = r.addQs(e, t.qs), f = r.ajax(t, { url: e, success: function (n) { var r; try { r = t._parseResponse(n) } catch (e) { u.reject(i._.transportError(i.resources.pingServerFailedParse, t.transport, e, f)); t.stop(); return } r.Response === "pong" ? u.resolve() : u.reject(i._.transportError(i._.format(i.resources.pingServerFailedInvalidResponse, n), t.transport, null, f)) }, error: function (n) { n.status === 401 || n.status === 403 ? (u.reject(i._.transportError(i._.format(i.resources.pingServerFailedStatusCode, n.status), t.transport, n, f)), t.stop()) : u.reject(i._.transportError(i.resources.pingServerFailed, t.transport, n, f)) } })) : u.reject(i._.transportError(i.resources.noConnectionTransport, t.transport)), u.promise() }, prepareQueryString: function (n, i) { var u; return u = r.addQs(i, "clientProtocol=" + n.clientProtocol), u = r.addQs(u, n.qs), n.token && (u += "&connectionToken=" + t.encodeURIComponent(n.token)), n.data && (u += "&connectionData=" + t.encodeURIComponent(n.data)), u }, addQs: function (t, i) { var r = t.indexOf("?") !== -1 ? "&" : "?", u; if (!i) return t; if (typeof i == "object") return t + r + n.param(i); if (typeof i == "string") return u = i.charAt(0), (u === "?" || u === "&") && (r = ""), t + r + i; throw new Error("Query string property must be either a string or object."); }, getUrl: function (n, i, u, f) { var s = i === "webSockets" ? "" : n.baseUrl, e = s + n.appRelativeUrl, o = "transport=" + i; return n.groupsToken && (o += "&groupsToken=" + t.encodeURIComponent(n.groupsToken)), u ? (e += f ? "/poll" : "/reconnect", n.messageId && (o += "&messageId=" + t.encodeURIComponent(n.messageId))) : e += "/connect", e += "?" + o, e = r.prepareQueryString(n, e), e + ("&tid=" + Math.floor(Math.random() * 11)) }, maximizePersistentResponse: function (n) { return { MessageId: n.C, Messages: n.M, Initialized: typeof n.S != "undefined" ? !0 : !1, Disconnect: typeof n.D != "undefined" ? !0 : !1, ShouldReconnect: typeof n.T != "undefined" ? !0 : !1, LongPollDelay: n.L, GroupsToken: n.G } }, updateGroups: function (n, t) { t && (n.groupsToken = t) }, stringifySend: function (n, t) { return typeof t == "string" || typeof t == "undefined" || t === null ? t : n.json.stringify(t) }, ajaxSend: function (t, e) { var h = r.stringifySend(t, e), c = f(t, "/send"), o, s = function (t, r) { n(r).triggerHandler(u.onError, [i._.transportError(i.resources.sendFailed, r.transport, t, o), e]) }; return o = r.ajax(t, { url: c, type: t.ajaxDataType === "jsonp" ? "GET" : "POST", contentType: i._.defaultContentType, data: { data: h }, success: function (n) { var i; if (n) { try { i = t._parseResponse(n) } catch (u) { s(u, t); t.stop(); return } r.triggerReceived(t, i) } }, error: function (n, i) { i !== "abort" && i !== "parsererror" && s(n, t) } }) }, ajaxAbort: function (n, t) { if (typeof n.transport != "undefined") { t = typeof t == "undefined" ? !0 : t; var i = f(n, "/abort"); r.ajax(n, { url: i, async: t, timeout: 1e3, type: "POST" }); n.log("Fired ajax abort async = " + t + ".") } }, tryInitialize: function (t, o, s) { var l, h, a = function (n) { var i = t._deferral; i && i.reject(n) }, c = function (i) { n(t).triggerHandler(u.onError, [i]); a(i); t.stop() }; o.Initialized && (l = f(t, "/start"), h = r.ajax(t, { url: l, success: function (n) { var r; try { r = t._parseResponse(n) } catch (u) { c(i._.error(i._.format(i.resources.errorParsingStartResponse, n), u, h)); return } r.Response === "started" ? s() : c(i._.error(i._.format(i.resources.invalidStartResponse, n), null, h)) }, error: function (n, t) { t !== e ? c(i._.error(i.resources.errorDuringStartRequest, n, h)) : a(i._.error(i.resources.stoppedDuringStartRequest, null, h)) } }), t._.startRequest = h) }, tryAbortStartRequest: function (n) { n._.startRequest && (n._.startRequest.abort(e), delete n._.startRequest) }, triggerReceived: function (t, i) { t._.connectingMessageBuffer.tryBuffer(i) || n(t).triggerHandler(u.onReceived, [i]) }, processMessages: function (t, i, u) { var f; r.markLastMessage(t); i && (f = r.maximizePersistentResponse(i), r.updateGroups(t, f.GroupsToken), f.MessageId && (t.messageId = f.MessageId), f.Messages && (n.each(f.Messages, function (n, i) { r.triggerReceived(t, i) }), r.tryInitialize(t, f, u))) }, monitorKeepAlive: function (t) { var i = t._.keepAliveData; i.monitoring ? t.log("Tried to monitor keep alive but it's already being monitored.") : (i.monitoring = !0, r.markLastMessage(t), t._.keepAliveData.reconnectKeepAliveUpdate = function () { r.markLastMessage(t) }, n(t).bind(u.onReconnect, t._.keepAliveData.reconnectKeepAliveUpdate), t.log("Now monitoring keep alive with a warning timeout of " + i.timeoutWarning + " and a connection lost timeout of " + i.timeout + ".")) }, stopMonitoringKeepAlive: function (t) { var i = t._.keepAliveData; i.monitoring && (i.monitoring = !1, n(t).unbind(u.onReconnect, t._.keepAliveData.reconnectKeepAliveUpdate), t._.keepAliveData = {}, t.log("Stopping the monitoring of the keep alive.")) }, startHeartbeat: function (n) { n._.lastActiveAt = (new Date).getTime(); o(n) }, markLastMessage: function (n) { n._.lastMessageAt = (new Date).getTime() }, markActive: function (n) { return r.verifyLastActive(n) ? (n._.lastActiveAt = (new Date).getTime(), !0) : !1 }, isConnectedOrReconnecting: function (n) { return n.state === i.connectionState.connected || n.state === i.connectionState.reconnecting }, ensureReconnectingState: function (t) { return s(t, i.connectionState.connected, i.connectionState.reconnecting) === !0 && n(t).triggerHandler(u.onReconnecting), t.state === i.connectionState.reconnecting }, clearReconnectTimeout: function (n) { n && n._.reconnectTimeout && (t.clearTimeout(n._.reconnectTimeout), delete n._.reconnectTimeout) }, verifyLastActive: function (t) { if ((new Date).getTime() - t._.lastActiveAt >= t.reconnectWindow) { var r = i._.format(i.resources.reconnectWindowTimeout, new Date(t._.lastActiveAt), t.reconnectWindow); return t.log(r), n(t).triggerHandler(u.onError, [i._.error(r, "TimeoutException")]), t.stop(!1, !1), !1 } return !0 }, reconnect: function (n, u) { var f = i.transports[u]; if (r.isConnectedOrReconnecting(n) && !n._.reconnectTimeout) { if (!r.verifyLastActive(n)) return; n._.reconnectTimeout = t.setTimeout(function () { r.verifyLastActive(n) && (f.stop(n), r.ensureReconnectingState(n) && (n.log(u + " reconnecting."), f.start(n))) }, n.reconnectDelay) } }, handleParseFailure: function (t, r, f, e, o) { t.state === i.connectionState.connecting ? (t.log("Failed to parse server response while attempting to connect."), e()) : (n(t).triggerHandler(u.onError, [i._.transportError(i._.format(i.resources.parseFailed, r), t.transport, f, o)]), t.stop()) }, foreverFrame: { count: 0, connections: {} } } }(window.jQuery, window), function (n, t) { var r = n.signalR, u = n.signalR.events, f = n.signalR.changeState, i = r.transports._logic; r.transports.webSockets = { name: "webSockets", supportsKeepAlive: function () { return !0 }, send: function (t, f) { var e = i.stringifySend(t, f); try { t.socket.send(e) } catch (o) { n(t).triggerHandler(u.onError, [r._.transportError(r.resources.webSocketsInvalidState, t.transport, o, t.socket), f]) } }, start: function (e, o, s) { var h, c = !1, l = this, a = !o, v = n(e); if (!t.WebSocket) { s(); return } e.socket || (h = e.webSocketServerUrl ? e.webSocketServerUrl : e.wsProtocol + e.host, h += i.getUrl(e, this.name, a), e.log("Connecting to websocket endpoint '" + h + "'."), e.socket = new t.WebSocket(h), e.socket.onopen = function () { c = !0; e.log("Websocket opened."); i.clearReconnectTimeout(e); f(e, r.connectionState.reconnecting, r.connectionState.connected) === !0 && v.triggerHandler(u.onReconnect) }, e.socket.onclose = function (t) { if (this === e.socket) { if (c) typeof t.wasClean != "undefined" && t.wasClean === !1 ? (n(e).triggerHandler(u.onError, [r._.transportError(r.resources.webSocketClosed, e.transport, t)]), e.log("Unclean disconnect from websocket: " + t.reason || "[no reason given].")) : e.log("Websocket closed."); else { s ? s() : a && l.reconnect(e); return } l.reconnect(e) } }, e.socket.onmessage = function (t) { var r; try { r = e._parseResponse(t.data) } catch (u) { i.handleParseFailure(e, t.data, u, s, t); return } r && (n.isEmptyObject(r) || r.M ? i.processMessages(e, r, o) : i.triggerReceived(e, r)) }) }, reconnect: function (n) { i.reconnect(n, this.name) }, lostConnection: function (n) { this.reconnect(n) }, stop: function (n) { i.clearReconnectTimeout(n); n.socket && (n.log("Closing the Websocket."), n.socket.close(), n.socket = null) }, abort: function (n, t) { i.ajaxAbort(n, t) } } }(window.jQuery, window), function (n, t) { var i = n.signalR, u = n.signalR.events, e = n.signalR.changeState, r = i.transports._logic, f = function (n) { t.clearTimeout(n._.reconnectAttemptTimeoutHandle); delete n._.reconnectAttemptTimeoutHandle }; i.transports.serverSentEvents = { name: "serverSentEvents", supportsKeepAlive: function () { return !0 }, timeOut: 3e3, start: function (o, s, h) { var c = this, l = !1, a = n(o), v = !s, y; if (o.eventSource && (o.log("The connection already has an event source. Stopping it."), o.stop()), !t.EventSource) { h && (o.log("This browser doesn't support SSE."), h()); return } y = r.getUrl(o, this.name, v); try { o.log("Attempting to connect to SSE endpoint '" + y + "'."); o.eventSource = new t.EventSource(y, { withCredentials: o.withCredentials }) } catch (p) { o.log("EventSource failed trying to connect with error " + p.Message + "."); h ? h() : (a.triggerHandler(u.onError, [i._.transportError(i.resources.eventSourceFailedToConnect, o.transport, p)]), v && c.reconnect(o)); return } v && (o._.reconnectAttemptTimeoutHandle = t.setTimeout(function () { l === !1 && o.eventSource.readyState !== t.EventSource.OPEN && c.reconnect(o) }, c.timeOut)); o.eventSource.addEventListener("open", function () { o.log("EventSource connected."); f(o); r.clearReconnectTimeout(o); l === !1 && (l = !0, e(o, i.connectionState.reconnecting, i.connectionState.connected) === !0 && a.triggerHandler(u.onReconnect)) }, !1); o.eventSource.addEventListener("message", function (n) { var t; if (n.data !== "initialized") { try { t = o._parseResponse(n.data) } catch (i) { r.handleParseFailure(o, n.data, i, h, n); return } r.processMessages(o, t, s) } }, !1); o.eventSource.addEventListener("error", function (n) { if (this === o.eventSource) { if (!l) { h && h(); return } o.log("EventSource readyState: " + o.eventSource.readyState + "."); n.eventPhase === t.EventSource.CLOSED ? (o.log("EventSource reconnecting due to the server connection ending."), c.reconnect(o)) : (o.log("EventSource error."), a.triggerHandler(u.onError, [i._.transportError(i.resources.eventSourceError, o.transport, n)])) } }, !1) }, reconnect: function (n) { r.reconnect(n, this.name) }, lostConnection: function (n) { this.reconnect(n) }, send: function (n, t) { r.ajaxSend(n, t) }, stop: function (n) { f(n); r.clearReconnectTimeout(n); n && n.eventSource && (n.log("EventSource calling close()."), n.eventSource.close(), n.eventSource = null, delete n.eventSource) }, abort: function (n, t) { r.ajaxAbort(n, t) } } }(window.jQuery, window), function (n, t) { var r = n.signalR, e = n.signalR.events, o = n.signalR.changeState, i = r.transports._logic, u = function () { var n = t.document.createElement("iframe"); return n.setAttribute("style", "position:absolute;top:0;left:0;width:0;height:0;visibility:hidden;"), n }, f = function () { var i = null, f = 1e3, n = 0; return { prevent: function () { r._.ieVersion <= 8 && (n === 0 && (i = t.setInterval(function () { var n = u(); t.document.body.appendChild(n); t.document.body.removeChild(n); n = null }, f)), n++) }, cancel: function () { n === 1 && t.clearInterval(i); n > 0 && n-- } } }(); r.transports.foreverFrame = { name: "foreverFrame", supportsKeepAlive: function () { return !0 }, iframeClearThreshold: 50, start: function (n, r, e) { var l = this, s = i.foreverFrame.count += 1, h, o = u(), c = function () { n.log("Forever frame iframe finished loading and is no longer receiving messages."); l.reconnect(n) }; if (t.EventSource) { e && (n.log("This browser supports SSE, skipping Forever Frame."), e()); return } o.setAttribute("data-signalr-connection-id", n.id); f.prevent(); h = i.getUrl(n, this.name); h += "&frameId=" + s; t.document.body.appendChild(o); n.log("Binding to iframe's load event."); o.addEventListener ? o.addEventListener("load", c, !1) : o.attachEvent && o.attachEvent("onload", c); o.src = h; i.foreverFrame.connections[s] = n; n.frame = o; n.frameId = s; r && (n.onSuccess = function () { n.log("Iframe transport started."); r() }) }, reconnect: function (n) { var r = this; i.isConnectedOrReconnecting(n) && i.verifyLastActive(n) && t.setTimeout(function () { if (i.verifyLastActive(n) && n.frame && i.ensureReconnectingState(n)) { var u = n.frame, t = i.getUrl(n, r.name, !0) + "&frameId=" + n.frameId; n.log("Updating iframe src to '" + t + "'."); u.src = t } }, n.reconnectDelay) }, lostConnection: function (n) { this.reconnect(n) }, send: function (n, t) { i.ajaxSend(n, t) }, receive: function (t, u) { var f, e, o; if (t.json !== t._originalJson && (u = t._originalJson.stringify(u)), o = t._parseResponse(u), i.processMessages(t, o, t.onSuccess), t.state === n.signalR.connectionState.connected && (t.frameMessageCount = (t.frameMessageCount || 0) + 1, t.frameMessageCount > r.transports.foreverFrame.iframeClearThreshold && (t.frameMessageCount = 0, f = t.frame.contentWindow || t.frame.contentDocument, f && f.document && f.document.body))) for (e = f.document.body; e.firstChild;) e.removeChild(e.firstChild) }, stop: function (n) { var r = null; if (f.cancel(), n.frame) { if (n.frame.stop) n.frame.stop(); else try { r = n.frame.contentWindow || n.frame.contentDocument; r.document && r.document.execCommand && r.document.execCommand("Stop") } catch (u) { n.log("Error occured when stopping foreverFrame transport. Message = " + u.message + ".") } n.frame.parentNode === t.document.body && t.document.body.removeChild(n.frame); delete i.foreverFrame.connections[n.frameId]; n.frame = null; n.frameId = null; delete n.frame; delete n.frameId; delete n.onSuccess; delete n.frameMessageCount; n.log("Stopping forever frame.") } }, abort: function (n, t) { i.ajaxAbort(n, t) }, getConnection: function (n) { return i.foreverFrame.connections[n] }, started: function (t) { o(t, r.connectionState.reconnecting, r.connectionState.connected) === !0 && n(t).triggerHandler(e.onReconnect) } } }(window.jQuery, window), function (n, t) { var r = n.signalR, u = n.signalR.events, e = n.signalR.changeState, f = n.signalR.isDisconnecting, i = r.transports._logic, o = function () { try { return "onprogress" in new t.XMLHttpRequest } catch (n) { return !1 } }(); r.transports.longPolling = { name: "longPolling", supportsKeepAlive: function (n) { return o && n.ajaxDataType !== "jsonp" && n._.longPollDelay === 0 }, reconnectDelay: 3e3, start: function (o, s, h) { var a = this, v = function () { v = n.noop; h = null; o.log("LongPolling connected."); s() }, y = function () { return h ? (h(), h = null, o.log("LongPolling failed to connect."), !0) : !1 }, c = o._, l = 0, p = function (i) { t.clearTimeout(c.reconnectTimeoutId); c.reconnectTimeoutId = null; e(i, r.connectionState.reconnecting, r.connectionState.connected) === !0 && (i.log("Raising the reconnect event"), n(i).triggerHandler(u.onReconnect)) }, w = 36e5; o.pollXhr && (o.log("Polling xhr requests already exists, aborting."), o.stop()); o.messageId = null; c.reconnectTimeoutId = null; c.pollTimeoutId = t.setTimeout(function () { (function e(s, h) { var d = s.messageId, g = d === null, b = !g, nt = !h, k = i.getUrl(s, a.name, b, nt); f(s) !== !0 && (o.log("Opening long polling request to '" + k + "'."), s.pollXhr = i.ajax(o, { xhrFields: { onprogress: function () { i.markLastMessage(o) } }, url: k, success: function (r) { var h, w = 0, u, a; o.log("Long poll complete."); l = 0; try { h = o._parseResponse(r) } catch (b) { i.handleParseFailure(s, r, b, y, s.pollXhr); return } (c.reconnectTimeoutId !== null && p(s), h && (u = i.maximizePersistentResponse(h)), i.processMessages(s, h, v), u && n.type(u.LongPollDelay) === "number" && (w = u.LongPollDelay), u && u.Disconnect) || f(s) !== !0 && (a = u && u.ShouldReconnect, !a || i.ensureReconnectingState(s)) && (w > 0 ? c.pollTimeoutId = t.setTimeout(function () { e(s, a) }, w) : e(s, a)) }, error: function (f, h) { if (t.clearTimeout(c.reconnectTimeoutId), c.reconnectTimeoutId = null, h === "abort") { o.log("Aborted xhr request."); return } if (!y()) { if (l++, o.state !== r.connectionState.reconnecting && (o.log("An error occurred using longPolling. Status = " + h + ".  Response = " + f.responseText + "."), n(s).triggerHandler(u.onError, [r._.transportError(r.resources.longPollFailed, o.transport, f, s.pollXhr)])), (o.state === r.connectionState.connected || o.state === r.connectionState.reconnecting) && !i.verifyLastActive(o)) return; if (!i.ensureReconnectingState(s)) return; c.pollTimeoutId = t.setTimeout(function () { e(s, !0) }, a.reconnectDelay) } } }), b && h === !0 && (c.reconnectTimeoutId = t.setTimeout(function () { p(s) }, Math.min(1e3 * (Math.pow(2, l) - 1), w)))) })(o) }, 250) }, lostConnection: function (n) { n.pollXhr && n.pollXhr.abort("lostConnection") }, send: function (n, t) { i.ajaxSend(n, t) }, stop: function (n) { t.clearTimeout(n._.pollTimeoutId); t.clearTimeout(n._.reconnectTimeoutId); delete n._.pollTimeoutId; delete n._.reconnectTimeoutId; n.pollXhr && (n.pollXhr.abort(), n.pollXhr = null, delete n.pollXhr) }, abort: function (n, t) { i.ajaxAbort(n, t) } } }(window.jQuery, window), function (n) { function r(n) { return n + e } function s(n, t, i) { for (var f = n.length, u = [], r = 0; r < f; r += 1) n.hasOwnProperty(r) && (u[r] = t.call(i, n[r], r, n)); return u } function h(t) { return n.isFunction(t) ? null : n.type(t) === "undefined" ? null : t } function u(n) { for (var t in n) if (n.hasOwnProperty(t)) return !0; return !1 } function f(n, t) { var i = n._.invocationCallbacks, r, f; u(i) && n.log("Clearing hub invocation callbacks with error: " + t + "."); n._.invocationCallbackId = 0; delete n._.invocationCallbacks; n._.invocationCallbacks = {}; for (f in i) r = i[f], r.method.call(r.scope, { E: t }) } function i(n, t) { return new i.fn.init(n, t) } function t(i, r) { var u = { qs: null, logging: !1, useDefaultPath: !0 }; return n.extend(u, r), (!i || u.useDefaultPath) && (i = (i || "") + "/signalr"), new t.fn.init(i, u) } var e = ".hubProxy", o = n.signalR; i.fn = i.prototype = { init: function (n, t) { this.state = {}; this.connection = n; this.hubName = t; this._ = { callbackMap: {} } }, hasSubscriptions: function () { return u(this._.callbackMap) }, on: function (t, i) { var u = this, f = u._.callbackMap; return t = t.toLowerCase(), f[t] || (f[t] = {}), f[t][i] = function (n, t) { i.apply(u, t) }, n(u).bind(r(t), f[t][i]), u }, off: function (t, i) { var e = this, o = e._.callbackMap, f; return t = t.toLowerCase(), f = o[t], f && (f[i] ? (n(e).unbind(r(t), f[i]), delete f[i], u(f) || delete o[t]) : i || (n(e).unbind(r(t)), delete o[t])), e }, invoke: function (t) { var i = this, r = i.connection, e = n.makeArray(arguments).slice(1), c = s(e, h), f = { H: i.hubName, M: t, A: c, I: r._.invocationCallbackId }, u = n.Deferred(), l = function (f) { var e = i._maximizeHubResponse(f), h, s; n.extend(i.state, e.State); e.Progress ? u.notifyWith ? u.notifyWith(i, [e.Progress.Data]) : r._.progressjQueryVersionLogged || (r.log("A hub method invocation progress update was received but the version of jQuery in use (" + n.prototype.jquery + ") does not support progress updates. Upgrade to jQuery 1.7+ to receive progress notifications."), r._.progressjQueryVersionLogged = !0) : e.Error ? (e.StackTrace && r.log(e.Error + "\n" + e.StackTrace + "."), h = e.IsHubException ? "HubException" : "Exception", s = o._.error(e.Error, h), s.data = e.ErrorData, r.log(i.hubName + "." + t + " failed to execute. Error: " + s.message), u.rejectWith(i, [s])) : (r.log("Invoked " + i.hubName + "." + t), u.resolveWith(i, [e.Result])) }; return r._.invocationCallbacks[r._.invocationCallbackId.toString()] = { scope: i, method: l }, r._.invocationCallbackId += 1, n.isEmptyObject(i.state) || (f.S = i.state), r.log("Invoking " + i.hubName + "." + t), r.send(f), u.promise() }, _maximizeHubResponse: function (n) { return { State: n.S, Result: n.R, Progress: n.P ? { Id: n.P.I, Data: n.P.D } : null, Id: n.I, IsHubException: n.H, Error: n.E, StackTrace: n.T, ErrorData: n.D } } }; i.fn.init.prototype = i.fn; t.fn = t.prototype = n.connection(); t.fn.init = function (t, i) { var e = { qs: null, logging: !1, useDefaultPath: !0 }, u = this; n.extend(e, i); n.signalR.fn.init.call(u, t, e.qs, e.logging); u.proxies = {}; u._.invocationCallbackId = 0; u._.invocationCallbacks = {}; u.received(function (t) { var f, o, e, i, s, h; t && (typeof t.P != "undefined" ? (e = t.P.I.toString(), i = u._.invocationCallbacks[e], i && i.method.call(i.scope, t)) : typeof t.I != "undefined" ? (e = t.I.toString(), i = u._.invocationCallbacks[e], i && (u._.invocationCallbacks[e] = null, delete u._.invocationCallbacks[e], i.method.call(i.scope, t))) : (f = this._maximizeClientHubInvocation(t), u.log("Triggering client hub event '" + f.Method + "' on hub '" + f.Hub + "'."), s = f.Hub.toLowerCase(), h = f.Method.toLowerCase(), o = this.proxies[s], n.extend(o.state, f.State), n(o).triggerHandler(r(h), [f.Args]))) }); u.error(function (n, t) { var i, r; t && (i = t.I, r = u._.invocationCallbacks[i], r && (u._.invocationCallbacks[i] = null, delete u._.invocationCallbacks[i], r.method.call(r.scope, { E: n }))) }); u.reconnecting(function () { u.transport && u.transport.name === "webSockets" && f(u, "Connection started reconnecting before invocation result was received.") }); u.disconnected(function () { f(u, "Connection was disconnected before invocation result was received.") }) }; t.fn._maximizeClientHubInvocation = function (n) { return { Hub: n.H, Method: n.M, Args: n.A, State: n.S } }; t.fn._registerSubscribedHubs = function () { var t = this; t._subscribedToHubs || (t._subscribedToHubs = !0, t.starting(function () { var i = []; n.each(t.proxies, function (n) { this.hasSubscriptions() && (i.push({ name: n }), t.log("Client subscribed to hub '" + n + "'.")) }); i.length === 0 && t.log("No hubs have been subscribed to.  The client will not receive data from hubs.  To fix, declare at least one client side function prior to connection start for each hub you wish to subscribe to."); t.data = t.json.stringify(i) })) }; t.fn.createHubProxy = function (n) { n = n.toLowerCase(); var t = this.proxies[n]; return t || (t = i(this, n), this.proxies[n] = t), this._registerSubscribedHubs(), t }; t.fn.init.prototype = t.fn; n.hubConnection = t }(window.jQuery, window), function (n) { n.signalR.version = "2.1.0" }(window.jQuery)