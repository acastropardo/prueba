/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Renderer','jquery.sap.strings'],function(q,R){"use strict";var L={};L.render=function(a,l){var r=L;if(r.borderWidths===undefined){if(!!sap.ui.Device.browser.internet_explorer){var f=document.createElement("div");var s=sap.ui.getCore().getStaticAreaRef();s.appendChild(f);f.className="sapUiLbx";var $=q(f);$.css("width","50px");$.css("min-width","100px");r.borderWidths=f.offsetWidth-100;s.removeChild(f);}else{r.borderWidths=0;}}a.addClass("sapUiLbx");var S=true;if(!l.getEditable()){a.addClass("sapUiLbxRo");S=false;}if(!l.getEnabled()){a.addClass("sapUiLbxDis");S=false;}if(S){a.addClass("sapUiLbxStd");}a.write("<div");a.writeControlData(l);a.writeAttribute("tabindex","-1");var w=l.getWidth();if(w){a.addStyle("width",w);var d=l.getDisplaySecondaryValues();var D=l.getDisplayIcons();if(!d&&!D){a.addClass("sapUiLbxFixed");}}if(!w||(w=="auto")||(w=="inherit")){a.addClass("sapUiLbxFlexWidth");}a.writeClasses();var m=l.getMinWidth();var M=l.getMaxWidth();if(!!sap.ui.Device.browser.internet_explorer){m=r.fixWidth(m);M=r.fixWidth(M);}if(m){a.addStyle("min-width",m);}if(M){a.addStyle("max-width",M);}if(l._bHeightInItems){if(l._sTotalHeight!=null){a.addStyle("height",l._sTotalHeight);}}else{var h=l.getHeight();if(h){a.addStyle("height",h);}}a.writeStyles();var t=l.getTooltip_AsString();if(t){a.writeAttributeEscaped("title",t);}a.write(">");this.renderItemList(l,a);a.write("</div>");};L.renderItemList=function(l,r){r.write("<ul id='"+l.getId()+"-list'");r.writeAttribute("tabindex",this.getTabIndex(l));r.writeAccessibilityState(l,{role:"listbox",multiselectable:l.getAllowMultiSelect()});r.write(">");var a=l.getItems(),b=0,c=0;for(var i=0;i<a.length;i++){if(!(a[i]instanceof sap.ui.core.SeparatorItem)){c++;}}var d=l.getDisplaySecondaryValues();for(var i=0;i<a.length;i++){var e=a[i];if(e instanceof sap.ui.core.SeparatorItem){r.write("<div id='",e.getId(),"' class='sapUiLbxSep' role='separator'><hr/>");if(l.getDisplayIcons()){r.write("<hr/>");}if(d){r.write("<hr/>");}r.write("</div>");}else{r.write("<li");r.writeElementData(e);r.writeAttribute("data-sap-ui-lbx-index",i);r.addClass("sapUiLbxI");if(!e.getEnabled()){r.addClass("sapUiLbxIDis");}r.writeAttribute("tabindex","-1");if(l.isIndexSelected(i)){r.addClass("sapUiLbxISel");}r.writeClasses();var t=e.getText();var s=e.getAdditionalText?e.getAdditionalText():"";if(e.getTooltip_AsString()){r.writeAttributeEscaped("title",e.getTooltip_AsString());}else{r.writeAttributeEscaped("title",t+((d&&s)?"  --  "+s:""));}r.writeAccessibilityState(e,{role:"option",selected:(i===l.getSelectedIndex()),setsize:c,posinset:b+1});r.write(">");if(l.getDisplayIcons()){var I;if(e.getIcon){I=e.getIcon();}r.write("<span");if(sap.ui.core.IconPool.isIconURI(I)){r.addClass("sapUiLbxIIco");r.addClass("sapUiLbxIIcoFont");var o=sap.ui.core.IconPool.getIconInfo(I);r.addStyle("font-family","'"+o.fontFamily+"'");if(o&&!o.skipMirroring){r.addClass("sapUiIconMirrorInRTL");}r.writeClasses();r.writeStyles();r.write(">");r.write(o.content);}else{r.write(" class='sapUiLbxIIco'><img src='");if(I){r.writeEscaped(I);}else{r.write(sap.ui.resource('sap.ui.commons','img/1x1.gif'));}r.write("'/>");}r.write("</span>");}r.write("<span class='sapUiLbxITxt");r.write("'");r.writeAttribute("id",e.getId()+"-txt");var T=L.getTextAlign(l.getValueTextAlign(),null);if(T){r.write("style='text-align:"+T+"'");}r.write(">");if(t===""||t===null){r.write("&nbsp;");}else{r.writeEscaped(t);}if(d){r.write("</span><span class='sapUiLbxISec");r.write("'");var T=L.getTextAlign(l.getSecondaryValueTextAlign(),null);if(T){r.write("style='text-align:"+T+"'");}r.write(">");r.writeEscaped(s);}r.write("</span></li>");b++;}}r.write("</ul>");};L.fixWidth=function(c){if(L.borderWidths>0){if(c&&q.sap.endsWithIgnoreCase(c,"px")){var w=parseInt(c.substr(0,c.length-2),10);var n=w-L.borderWidths;if(n>=0){return n+"px";}}}return c;};L.getTabIndex=function(l){if(l.getEnabled()&&l.getEditable()){return 0;}else{return-1;}};L.handleSelectionChanged=function(o){if(o.getDomRef()){var a=o.getItems();for(var i=0,l=a.length;i<l;i++){if(o.isIndexSelected(i)){a[i].$().addClass("sapUiLbxISel").attr("aria-selected","true");}else{a[i].$().removeClass("sapUiLbxISel").attr("aria-selected","false");}}}};L.handleARIAActivedescendant=function(l,i){var $=l.$("list");if($.length>0){var a=$.children("li[data-sap-ui-lbx-index="+i+"]");$.attr("aria-activedescendant",a.attr("id"));}};L.getTextAlign=R.getTextAlign;return L;},true);
