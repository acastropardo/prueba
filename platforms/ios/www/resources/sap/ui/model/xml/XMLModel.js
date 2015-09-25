/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/model/ClientModel','./XMLListBinding','./XMLPropertyBinding','./XMLTreeBinding','jquery.sap.xml'],function(q,C,X,a,b){"use strict";var c=C.extend("sap.ui.model.xml.XMLModel",{constructor:function(d){C.apply(this,arguments);this.oNameSpaces=null;if(d&&d.documentElement){this.setData(d);}},metadata:{publicMethods:["setXML","getXML","setNameSpace"]}});c.prototype.setXML=function(x){var o=q.sap.parseXML(x);if(o.parseError.errorCode!=0){var p=o.parseError;q.sap.log.fatal("The following problem occurred: XML parse Error for "+p.url+" code: "+p.errorCode+" reason: "+p.reason+" src: "+p.srcText+" line: "+p.line+" linepos: "+p.linepos+" filepos: "+p.filepos);this.fireParseError({url:p.url,errorCode:p.errorCode,reason:p.reason,srcText:p.srcText,line:p.line,linepos:p.linepos,filepos:p.filepos});}this.setData(o);};c.prototype.getXML=function(){return q.sap.serializeXML(this.oData);};c.prototype.setData=function(d){this.oData=d;this.checkUpdate();};c.prototype.loadData=function(u,p,A,t,d,h){var e=this;A=(A!==false);t=t||"GET";d=d===undefined?this.bCache:d;this.fireRequestSent({url:u,type:t,async:A,headers:h,info:"cache="+d,infoObject:{cache:d}});this._ajax({url:u,async:A,cache:d,dataType:'xml',data:p,headers:h,type:t,success:function(D){if(!D){q.sap.log.fatal("The following problem occurred: No data was retrieved by service: "+u);}e.setData(D);e.fireRequestCompleted({url:u,type:t,async:A,headers:h,info:"cache="+d,infoObject:{cache:d},success:true});},error:function(f,g,i){var E={message:g,statusCode:f.status,statusText:f.statusText,responseText:f.responseText};q.sap.log.fatal("The following problem occurred: "+g,f.responseText+","+f.status+","+f.statusText);e.fireRequestCompleted({url:u,type:t,async:A,headers:h,info:"cache="+d,infoObject:{cache:d},success:false,errorobject:E});e.fireRequestFailed(E);}});};c.prototype.setNameSpace=function(n,p){if(!p){p="";}if(!this.oNameSpaces){this.oNameSpaces={};}this.oNameSpaces[p]=n;};c.prototype.bindProperty=function(p,o,P){var B=new a(this,p,o,P);return B;};c.prototype.bindList=function(p,o,s,f,P){var B=new X(this,p,o,s,f,P);return B;};c.prototype.bindTree=function(p,o,f,P){var B=new b(this,p,o,f,P);return B;};c.prototype.setProperty=function(p,v,o,A){var O=p.substring(0,p.lastIndexOf("/")+1),P=p.substr(p.lastIndexOf("/")+1);if(!this.resolve(p,o)){return false;}if(!this.oData.documentElement){q.sap.log.warning("Trying to set property "+p+", but no document exists.");return false;}var d;if(P.indexOf("@")==0){d=this._getObject(O,o);if(d[0]){d[0].setAttribute(P.substr(1),v);this.checkUpdate(false,A);return true;}}else{d=this._getObject(p,o);if(d[0]){q(d[0]).text(v);this.checkUpdate(false,A);return true;}}return false;};c.prototype.getProperty=function(p,o){var r=this._getObject(p,o);if(r&&typeof r!="string"){r=q(r[0]).text();}return r;};c.prototype.getObject=function(p,o){var O=this._getObject(p,o);if(q.isArray(O)){O=O[0];}return O;};c.prototype._getObject=function(p,o){var r=this.oData.documentElement;if(!r){return null;}var n=this.isLegacySyntax()?[r]:[];if(o instanceof sap.ui.model.Context){n=this._getObject(o.getPath());}else if(o){n=[o];}if(!p){return n;}var P=p.split("/"),s,i=0;if(!P[0]){n=r;i++;}n=n.length==undefined?[n]:n;n=n[0]?n:null;while(n&&n.length>0&&P[i]){s=P[i];if(s.indexOf("@")==0){n=this._getAttribute(n[0],s.substr(1));}else if(s=="text()"){n=q(n[0]).text();}else if(isNaN(s)){n=this._getChildElementsByTagName(n[0],s);}else{n=[n[s]];}i++;}return n;};c.prototype._getAttribute=function(n,N){if(!this.oNameSpaces||N.indexOf(":")==-1){return n.getAttribute(N);}var s=this._getNameSpace(N),l=this._getLocalName(N);if(n.getAttributeNS){return n.getAttributeNS(s,l);}else{if(!this.oDocNSPrefixes){this.oDocNSPrefixes=this._getDocNSPrefixes();}var p=this.oDocNSPrefixes[s];N=(p?p+":":"")+l;return n.getAttribute(N);}};c.prototype._getChildElementsByTagName=function(n,N){var d=n.childNodes,r=[];if(this.oNameSpaces){var s=this._getNameSpace(N),l=this._getLocalName(N),e;q.each(d,function(i,o){e=o.localName||o.baseName;if(o.nodeType==1&&e==l&&o.namespaceURI==s){r.push(o);}});}else{q.each(d,function(i,o){if(o.nodeType==1&&o.nodeName==N){r.push(o);}});}return r;};c.prototype._getNameSpace=function(n){var i=n.indexOf(":"),p="";if(i>0){p=n.substr(0,i);}return this.oNameSpaces[p];};c.prototype._getLocalName=function(n){var i=n.indexOf(":"),l=n;if(i>0){l=n.substr(i+1);}return l;};c.prototype._getDocNSPrefixes=function(){var p={},d=this.oData&&this.oData.documentElement;if(!d){return p;}var A=d.attributes;q.each(A,function(i,o){var n=o.name,v=o.value;if(n=="xmlns"){p[v]="";}else if(n.indexOf("xmlns")==0){p[v]=n.substr(6);}});return p;};c.prototype._resolve=function(p,o){var i=!q.sap.startsWith(p,"/"),r=p;if(i){if(o){r=o.getPath()+"/"+p;}else{r=this.isLegacySyntax()?"/"+p:undefined;}}return r;};c.prototype.isList=function(p,o){return false;};return c;},true);
