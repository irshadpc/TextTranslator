var languageCode = ["ar", "bg", "ca", "zh-CN", "zh-TW", "hr", "cs", "da", "nl", "en", "tl", "fi", "fr", "de", "el", "iw", "hi", "id", "it", "ja", "ko", "lv", "lt", "no", "pl", "pt", "ro", "ru", "sr", "sk", "sl", "es", "sv", "uk", "vi"];
var languages = {
  en: ["English", languageCode],
  de: ["German", languageCode],
  fr: ["French", languageCode],
  es: ["Spanish", languageCode],
  it: ["Italian", languageCode],
  uk: ["Ukrainian", languageCode],
  ru: ["Russian", languageCode],
  ar: ["Arabic", languageCode],
  bg: ["Bulgarian", languageCode],
  ca: ["Catalan", languageCode],
  zh: ["Chinese Simplified", languageCode],
  zh: ["Chinese Traditional", languageCode],
  hr: ["Croatian", languageCode],
  cs: ["Czech", languageCode],
  da: ["Danish", languageCode],
  nl: ["Dutch", languageCode],
  tl: ["Filipino", languageCode],
  fi: ["Finnish", languageCode],
  el: ["Greek", languageCode],
  iw: ["Hebrew", languageCode],
  hi: ["Hindi", languageCode],
  id: ["Indonesian", languageCode],
  ja: ["Japanese", languageCode],
  ko: ["Korean", languageCode],
  lv: ["Latvian", languageCode],
  lt: ["Lithuanian", languageCode],
  no: ["Norwegian", languageCode],
  pl: ["Polish", languageCode],
  pt: ["Portuguese", languageCode],
  ro: ["Rumanian", languageCode],
  sr: ["Serbian", languageCode],
  sk: ["Slovak", languageCode],
  sl: ["Slovenian", languageCode],
  sv: ["Swedish", languageCode],
  vi: ["Vietnamese", languageCode]
}

    function translatorSetup() {
    
      var langs = new Array();
      var nums = new Object();
      for (var i in languages) {
        nums[i] = langs.length;
        langs.push(i + "");
      }
      for (var i in languages) {
        var src = i;
        var array = langs.slice();
        //array.splice(nums[i], 1);
        languages[i][1] = array;
      }
      for (var i in languages) {
      	var option = document.createElement("option");
      	option.value = i;
      	option.innerHTML = languages[i][0];
      	$("SourceLanguage").appendChild(option);
      }
   // set default traslation language
   fillSinkSelect("ru");  
         
   }
    
     
    function fillSinkSelect(source) {
      var oldValue = $("SinkLanguage").value;
      var langs = languages[source][1];
      $("SinkLanguage").innerHTML = "";
      for (var i = 0; i < langs.length; i++) {
      	var option = document.createElement("option");
      	option.value = langs[i];
      	option.innerHTML = languages[langs[i]][0];
      	$("SinkLanguage").appendChild(option);
      }
      $("SinkLanguage").value = oldValue;
      
    }
    
    function translate() {
      
      var text = $("SourceText").value;
      if (text.length > 0) {
        var source = $("SourceLanguage").value;
        if (source.length == 0) {
          $("LanguageDetect").value = "Detect language...";
          google.language.detect(text, function(result) 
          {
            if (!result.error) 
            {
              var language = languages[result.language];
              if (language) {
                $("LanguageDetect").value = language[0];
                fillSinkSelect(result.language);
                alert(result.language);
                doTranslation(text, source);
              }
              else {
                $("TranslationText").value = "Language detection failed or language not supported. Please select manually.";                              
              }  
            }
            else {
              $("TranslationText").value = result.error.message;              
            }
          });          
        }
        else {
          doTranslation(text, source);
        }
      }
      else {
        $("TranslationText").value = "";        
      }  
    }
    
    function doTranslation(text, source) {
      $("TranslationText").value = "Translating...";
      google.language.translate(text, source, $("SinkLanguage").value, function(result) {
        if (!result.error) {
          $("TranslationText").value = result.translation;
        }
        else {
          $("TranslationText").value = result.error.message;
        }
      });      
    }