jQuery(document).ready(function($){$("#toolbar-target").hide();$("#toolbar-copy").hide();Joomla.submitbutton=function(task){if(task==="association.cancel"){Joomla.submitform(task)}else if(task==="copy"){Joomla.loadingLayer("show");var targetLang=document.getElementById("target-association").getAttribute("data-language"),referlangInput=window.frames["reference-association"].document.getElementById("jform_language");referlangInput.removeAttribute("disabled");referlangInput.value=targetLang;window.frames["reference-association"].Joomla.submitbutton(document.getElementById("adminForm").getAttribute("data-associatedview")+".save2copy")}else if(task==="undo-association"){var reference=document.getElementById("reference-association");var target=document.getElementById("target-association");var referenceId=reference.getAttribute("data-id");var referenceLang=reference.getAttribute("data-language").replace(/-/,"_");var targetId=target.getAttribute("data-id");var targetLang=target.getAttribute("data-language").replace(/-/,"_");reference=$(reference).contents();target=$(target).contents();reference.find("#jform_associations_"+targetLang+"_id").val("");reference.find("#jform_associations_"+targetLang+"_name").val("");reference.find("#jform_associations_"+targetLang+"_chzn").remove();reference.find("#jform_associations_"+targetLang).val("").change().chosen();var lang="";$("#jform_itemlanguage option").each(function(){lang=$(this).val().split("|")[0];if(typeof lang!=="undefined"){lang=lang.replace(/-/,"_");target.find("#jform_associations_"+lang+"_id").val("");target.find("#jform_associations_"+lang+"_chzn").remove();target.find("#jform_associations_"+lang).val("").change().chosen()}});target.find("#jform_associations_"+referenceLang+"_id").val("");target.find("#jform_associations_"+referenceLang+"_name").val("");target.find("#jform_associations_"+referenceLang+"_chzn").remove();target.find("#jform_associations_"+referenceLang).val("").change().chosen();var currentSwitcher=$("#jform_itemlanguage").val();var currentLang=targetLang.replace(/_/,"-");$('#jform_itemlanguage option[value="'+currentSwitcher+'"]').val(currentLang+":0:add");$("#jform_itemlanguage").val("").change();$("#jform_itemlanguage").trigger("liszt:updated");Joomla.submitbutton("reference")}else{$("#"+task+"-association").contents().find("#jform_language").attr("disabled",false);window.frames[task+"-association"].Joomla.submitbutton(document.getElementById("adminForm").getAttribute("data-associatedview")+".apply")}return false};Joomla.loadingLayer("load");$(document).on("click","#toogle-left-panel",function(){var referenceHide=this.getAttribute("data-hide-reference");var referenceShow=this.getAttribute("data-show-reference");if($(this).text()===referenceHide){$(this).text(referenceShow)}else{$(this).text(referenceHide)}$("#left-panel").toggle();$("#right-panel").toggleClass("full-width")});$(document).on("change","#jform_itemlanguage",function(){var target=document.getElementById("target-association");var selected=$(this).val();if(selected!==""&&typeof selected!=="undefined"){target.setAttribute("data-action",selected.split(":")[2]);target.setAttribute("data-id",selected.split(":")[1]);target.setAttribute("data-language",selected.split(":")[0]);Joomla.loadingLayer("show");target.src=target.getAttribute("data-editurl")+"&task="+target.getAttribute("data-item")+"."+target.getAttribute("data-action")+"&id="+target.getAttribute("data-id")}else{$("#toolbar-target").hide();$("#toolbar-copy").hide();$("#select-change").addClass("hidden");$("#remove-assoc").addClass("hidden");target.setAttribute("data-action","");target.setAttribute("data-id","0");target.setAttribute("data-language","");target.src=""}});$("#reference-association").on("load",function(){document.getElementById('target-association').setAttribute('src', document.getElementById('target-association').getAttribute('data-url'));if($(this).contents().find("#jform_id").val()!==this.getAttribute("data-id")){var target=document.getElementById("target-association");target.src=target.getAttribute("data-editurl")+"&task="+target.getAttribute("data-item")+".edit"+"&id="+$(this).contents().find("#jform_id").val();this.src=this.getAttribute("data-editurl")+"&task="+this.getAttribute("data-item")+".edit"+"&id="+this.getAttribute("data-id")}var reference=$(this).contents();reference.find("#jform_language_chzn").remove();reference.find("#jform_language").attr("disabled",true).chosen();reference.find("#associations").find(".btn").remove();var parse="";$("#jform_itemlanguage option").each(function(){parse=$(this).val().split(":");if(typeof parse[0]!=="undefined"){langAssociation=parse[0].replace(/-/,"_");if(reference.find("#jform_associations_"+langAssociation+"_id").val()==""){reference.find("#jform_associations_"+langAssociation+"_name").val(document.getElementById("reference-association").getAttribute("data-no-assoc"))}}});Joomla.loadingLayer("hide")});$("#target-association").on("load",function(){if(this.getAttribute("src")!=""){$("#toolbar-target").show();$("#toolbar-copy").show();$("#select-change").removeClass("hidden");var targetLanguage=this.getAttribute("data-language");var targetId=this.getAttribute("data-id");var targetLoadedId=$(this).contents().find("#jform_id").val()||"0";$(this).contents().find('a[href="#associations"]').parent().find(".btn").remove();$(this).contents().find("#associations").find(".btn").remove();if($(this).contents().find("#associations").hasClass("active")){$(this).contents().find('a[href="#associations"]').parent().removeClass("active");$(this).contents().find("#associations").removeClass("active");$(this).contents().find(".nav-tabs").find("li").first().addClass("active");$(this).contents().find(".tab-content").find(".tab-pane").first().addClass("active")}$(this).contents().find("#jform_language_chzn").remove();$(this).contents().find("#jform_language").val(targetLanguage).change().attr("disabled",true).chosen();if(targetLoadedId=="0"){document.getElementById("select-change-text").innerHTML=document.getElementById("select-change").getAttribute("data-select")}else{document.getElementById("select-change-text").innerHTML=document.getElementById("select-change").getAttribute("data-change");$("#remove-assoc").removeClass("hidden");$("#toolbar-copy").hide();var currentIdList=document.getElementById("target-id").value;var updatedList=currentIdList==""?targetLoadedId:currentIdList+","+targetLoadedId;document.getElementById("target-id").value=updatedList;if(targetLoadedId!=targetId){$('#jform_itemlanguage option[value^="'+targetLanguage+":"+targetId+':add"]').val(targetLanguage+":"+targetLoadedId+":edit");this.setAttribute("data-id",targetLoadedId);this.setAttribute("data-action","edit")}var reference=document.getElementById("reference-association");var languageCode=targetLanguage.replace(/-/,"_");var title=$(this).contents().find("#jform_title").val();$(reference).contents().find("#jform_associations_"+languageCode+"_id").val(targetLoadedId);$(reference).contents().find("#jform_associations_"+languageCode+"_name").val(title);$(reference).contents().find("#jform_associations_"+languageCode+"_chzn").remove();$(reference).contents().find("#jform_associations_"+languageCode).append('<option value="'+targetLoadedId+'">'+title+"</option>");$(reference).contents().find("#jform_associations_"+languageCode).val(targetLoadedId).change().chosen()}var reference=document.getElementById("reference-association");var referenceId=reference.getAttribute("data-id");var languageCode=reference.getAttribute("data-language").replace(/-/,"_");var title=$(reference).contents().find("#jform_title").val();var target=$(this).contents();target.find("#jform_associations_"+languageCode+"_id").val(referenceId);target.find("#jform_associations_"+languageCode+"_name").val(title);target.find("#jform_associations_"+languageCode+"_chzn").remove();var chznField=target.find("#jform_associations_"+languageCode);chznField.append('<option value="'+referenceId+'">'+title+"</option>");chznField.val(referenceId).change().chosen();var parse,langAssociation;$("#jform_itemlanguage option").each(function(){parse=$(this).val().split(":");if(typeof parse[1]!=="undefined"&&parse[1]!=="0"){langAssociation=parse[0].replace(/-/,"_");target.find("#jform_associations_"+langAssociation+"_id").val(parse[1]);target.find("#jform_associations_"+langAssociation+"_chzn").remove();chznField=target.find("#jform_associations_"+langAssociation);chznField.append('<option value="'+parse[1]+'"></option>');chznField.val(parse[1]).change().chosen()}});Joomla.loadingLayer("hide")}})});