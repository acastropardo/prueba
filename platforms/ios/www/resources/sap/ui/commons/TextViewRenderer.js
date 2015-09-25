/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Renderer'],function(q,R){"use strict";var T={};T.render=function(o,t){var a=o;var r=T;var e=t.getEnabled()===true,d=t.getDesign();if(!e){a.addClass("sapUiTvDsbl");t.allowTextSelection(false);}else{switch(t.getSemanticColor()){case(sap.ui.commons.TextViewColor.Negative):a.addClass('sapUiTvErr');break;case(sap.ui.commons.TextViewColor.Positive):a.addClass('sapUiTvSucc');break;case(sap.ui.commons.TextViewColor.Critical):a.addClass('sapUiTvWarn');break;}}var b=sap.ui.commons.TextViewDesign;if(d!=b.Standard){if(d===b.Bold){a.addClass("sapUiTvEmph");}else if(d===b.H1){a.addClass("sapUiTvH1");}else if(d===b.H2){a.addClass("sapUiTvH2");}else if(d===b.H3){a.addClass("sapUiTvH3");}else if(d===b.H4){a.addClass("sapUiTvH4");}else if(d===b.H5){a.addClass("sapUiTvH5");}else if(d===b.H6){a.addClass("sapUiTvH6");}else if(d===b.Italic){a.addClass("sapUiTvItalic");}else if(d===b.Small){a.addClass("sapUiTvSmall");}else if(d===b.Monospace){a.addClass("sapUiTvMono");}else if(d===b.Underline){a.addClass("sapUiTvULine");}}if(!t.getWrapping()){a.addClass("sapUiTvWrap");}if(t.getWidth()&&t.getWidth()!=''){a.addStyle("width",t.getWidth());}a.write("<span");a.writeControlData(t);a.addClass("sapUiTv");if(t.getTooltip_AsString()){a.writeAttributeEscaped("title",t.getTooltip_AsString());}else if(t.getText()){a.writeAttributeEscaped("title",t.getText());}var s=t.getTextDirection();if(s){a.addStyle("direction",s.toLowerCase());}var A=r.getTextAlign(t.getTextAlign(),s);if(A){A=A.charAt(0).toUpperCase()+A.substring(1);a.addClass("sapUiTvAlign"+A);}a.writeAttribute('tabindex','-1');a.writeAccessibilityState(t,{role:t.getAccessibleRole().toLowerCase(),invalid:t.getSemanticColor()==sap.ui.commons.TextViewColor.Negative,disabled:!t.getEnabled()});a.writeClasses();a.writeStyles();a.write(">");a.writeEscaped(t.getText(),true);a.write("</span>");};T.getTextAlign=R.getTextAlign;return T;},true);
