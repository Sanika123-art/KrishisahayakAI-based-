
const data = {
  en: {
    pmfbTitle: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    pmfbDesc: "This scheme provides insurance cover for crops against natural disasters, pests, and diseases.",
    pmfbList: `
      <li>Protects crops from natural disasters</li>
      <li>Low premium rates</li>
      <li>Financial stability for farmers</li>`,

    pmjjTitle: "Pradhan Mantri Jeevan Jyoti Bima Yojana",
    pmjjDesc: "Life insurance scheme that provides coverage of ₹2 lakh in case of death.",
    pmjjList: `
      <li>Life coverage of ₹2 lakh</li>
      <li>Very low premium</li>
      <li>Financial security for family</li>`,

    pmsyTitle: "Pradhan Mantri Suraksha Bima Yojana",
    pmsyDesc: "Accident insurance scheme for death or disability.",
    pmsyList: `
      <li>₹2 lakh accidental death cover</li>
      <li>₹1 lakh partial disability cover</li>
      <li>Low yearly premium</li>`,

    wbciTitle: "Weather Based Crop Insurance Scheme",
    wbciDesc: "Compensates farmers for crop loss due to adverse weather.",
    wbciList: `
      <li>Weather-based compensation</li>
      <li>Support during drought/flood</li>`
  },

  hi: {
    pmfbTitle: "प्रधानमंत्री फसल बीमा योजना",
    pmfbDesc: "यह योजना प्राकृतिक आपदाओं से फसलों को बीमा सुरक्षा प्रदान करती है।",
    pmfbList: `
      <li>प्राकृतिक आपदाओं से सुरक्षा</li>
      <li>कम प्रीमियम दर</li>
      <li>किसानों की आर्थिक सुरक्षा</li>`,

    pmjjTitle: "प्रधानमंत्री जीवन ज्योति बीमा योजना",
    pmjjDesc: "मृत्यु की स्थिति में ₹2 लाख का जीवन बीमा।",
    pmjjList: `
      <li>₹2 लाख जीवन बीमा</li>
      <li>बहुत कम प्रीमियम</li>
      <li>परिवार की आर्थिक सुरक्षा</li>`,

    pmsyTitle: "प्रधानमंत्री सुरक्षा बीमा योजना",
    pmsyDesc: "दुर्घटना मृत्यु या विकलांगता के लिए बीमा।",
    pmsyList: `
      <li>₹2 लाख दुर्घटना बीमा</li>
      <li>₹1 लाख आंशिक विकलांगता</li>
      <li>कम वार्षिक शुल्क</li>`,

    wbciTitle: "मौसम आधारित फसल बीमा योजना",
    wbciDesc: "खराब मौसम से फसल नुकसान की भरपाई।",
    wbciList: `
      <li>मौसम आधारित मुआवजा</li>
      <li>सूखा/बाढ़ सहायता</li>`
  }
};
function setLanguage(lang) {
  for (let key in data[lang]) {
    document.getElementById(key).innerHTML = data[lang][key];
  }
  localStorage.setItem("lang", lang);
}

setLanguage(localStorage.getItem("lang") || "en");



