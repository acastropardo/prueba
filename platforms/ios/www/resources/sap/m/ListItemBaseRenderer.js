/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/IconPool','sap/ui/core/theming/Parameters'],function(q,I,P){"use strict";var L={};var a={};L.writeInvisiblePlaceholderData=function(r,l){var p=sap.ui.core.RenderPrefixes.Invisible+l.getId();var s=' '+'id="'+p+'" '+'class="sapUiHiddenPlaceholder" '+'data-sap-ui="'+p+'" '+'style="display: none;"'+'aria-hidden="true"';r.write(s);};L.renderInvisible=function(r,l){this.openItemTag(r,l);this.writeInvisiblePlaceholderData(r,l);r.write(">");this.closeItemTag(r,l);};L.isModeMatched=function(m,o){var O=(sap.m.ListBaseRenderer||{}).ModeOrder||{};return(O[m]==o);};L.renderMode=function(r,l,o){var m=l.getMode();if(!this.isModeMatched(m,o)){return;}var M=l.getModeControl();if(M){this.renderModeContent(r,l,M);}};L.renderModeContent=function(r,l,m){var M=l.getMode(),b={Delete:"D",MultiSelect:"M",SingleSelect:"S",SingleSelectLeft:"SL"};r.write("<div");r.writeAttribute("id",l.getId()+"-mode");r.addClass("sapMLIBSelect"+b[M]);this.decorateMode(r,l);r.writeClasses();r.writeStyles();r.write(">");r.renderControl(m);r.write("</div>");};L.decorateMode=function(r,l){if(!l.getListProperty("modeAnimationOn")){return;}var m=l.getMode(),s=l.getListProperty("lastMode");if(!s||s==m){return;}if(m==sap.m.ListMode.None){r.addClass("sapMLIBUnselectAnimation");}else{r.addClass("sapMLIBSelectAnimation");}};L.renderCounter=function(r,l){var c=l.getCounter();if(c){this.renderCounterContent(r,l,c);}};L.renderCounterContent=function(r,l,c){r.write("<div");r.writeAttribute("id",l.getId()+"-counter");r.addClass("sapMLIBCounter");r.writeClasses();r.write(">");r.write(c);r.write("</div>");};L.renderType=function(r,l){var t=l.getTypeControl();if(t){this.renderTypeContent(r,l,t);}};L.renderTypeContent=function(r,l,t){var d=l.getType().indexOf("Detail")!=-1;if(d){r.write("<div class='sapMLIBCursor'>");}r.renderControl(t);if(d){r.write("</div>");}};L.openItemTag=function(r,l){r.write("<li");};L.closeItemTag=function(r,l){r.write("</li>");};L.handleNoFlex=function(r,l){return!q.support.hasFlexBoxSupport;};L.renderTabIndex=function(r,l){r.writeAttribute("tabindex","-1");};L.renderTooltip=function(r,l){var t=l.getTooltip_AsString();if(t){r.writeAttributeEscaped("title",t);}};L.getAriaAnnouncement=function(k,b){if(a[k]){return a[k];}b=b||"LIST_ITEM_"+k.toUpperCase();a[k]=new sap.ui.core.InvisibleText({text:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText(b)}).toStatic().getId();return a[k];};L.getAriaRole=function(l){return"option";};L.getAriaLabelledBy=function(l){};L.getAriaDescribedBy=function(l){var d=[],t=l.getType(),T=sap.m.ListType;if(l.getListProperty("showUnread")&&l.getUnread()){d.push(this.getAriaAnnouncement("unread"));}if(l.getMode()==sap.m.ListMode.Delete){d.push(this.getAriaAnnouncement("deletable"));}if(t==T.Navigation){d.push(this.getAriaAnnouncement("navigation"));}else{if(t==T.Active||t==T.DetailAndActive){d.push(this.getAriaAnnouncement("active"));}if(t==T.Detail||t==T.DetailAndActive){d.push(this.getAriaAnnouncement("detail"));}}return d.join(" ");};L.getAccessibilityState=function(l){return{role:this.getAriaRole(l),labelledby:{value:this.getAriaLabelledBy(l),append:true},describedby:{value:this.getAriaDescribedBy(l),append:true}};};L.renderLIContent=function(r,l){};L.renderLIAttributes=function(r,l){};L.renderLIContentWrapper=function(r,l){r.write('<div class="sapMLIBContent"');r.writeAttribute("id",l.getId()+"-content");r.write(">");if(this.handleNoFlex()){r.write('<div class="sapMLIBContentNF">');}this.renderLIContent(r,l);if(this.handleNoFlex()){r.write('</div>');}r.write('</div>');};L.render=function(r,l){if(!l.getVisible()){this.renderInvisible(r,l);return false;}this.openItemTag(r,l);r.writeControlData(l);r.addClass("sapMLIB");r.addClass("sapMLIB-CTX");r.addClass("sapMLIBShowSeparator");r.addClass("sapMLIBType"+l.getType());if(l.isClickable()){r.addClass("sapMLIBCursor");}if(l.getSelected()){r.addClass("sapMLIBSelected");}if(this.handleNoFlex()){r.addClass("sapMLIBNoFlex");}if(l.getListProperty("showUnread")&&l.getUnread()){r.addClass("sapMLIBUnread");}this.renderTooltip(r,l);this.renderTabIndex(r,l);r.writeAccessibilityState(l,this.getAccessibilityState(l));this.renderLIAttributes(r,l);r.writeClasses();r.writeStyles();r.write(">");this.renderMode(r,l,-1);this.renderLIContentWrapper(r,l);this.renderCounter(r,l);this.renderType(r,l);this.renderMode(r,l,1);this.closeItemTag(r,l);};return L;},true);
