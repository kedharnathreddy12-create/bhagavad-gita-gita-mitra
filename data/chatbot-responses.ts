export const chatbotRules = [
  {
    keywords: ["gita", "గీత", "భగవద్గీత", "bhagavad"],
    response: "భగవద్గీత అంటే భగవంతుడు పాడిన పాట. ఇది మహాభారత యుద్ధ సమయంలో శ్రీకృష్ణుడు అర్జునుడికి చేసిన ఉపదేశం. ఇందులో జీవితాన్ని ఎలా గడపాలో నేర్పించే గొప్ప విషయాలు ఉన్నాయి.\n\nThe Bhagavad Gita is the song of God. It is the discourse given by Lord Krishna to Arjuna during the Mahabharata war. It contains great lessons on how to lead life."
  },
  {
    keywords: ["anger", "angry", "mad", "కోపం", "ఆగ్రహం"],
    response: "శ్రీకృష్ణుడు భగవద్గీత (2.63) లో చెప్పారు - కోపం వల్ల వివేకం నశిస్తుంది, దాని వల్ల మనిషి పతనమవుతాడు. ధ్యానం ద్వారా మనస్సును ప్రశాంతంగా ఉంచుకోవాలి. కొన్ని నిమిషాలు కళ్లు మూసుకుని 'ఓం నమో భగవతే వాసుదేవాయ' అని జపించండి.\n\nKrishna says in Gita (2.63) that anger leads to clouding of judgment, which results in the downfall of a person. Keep your mind calm through meditation. Chant 'Om Namo Bhagavate Vasudevaya'."
  },
  {
    keywords: ["happy", "happiness", "joy", "సంతోషం", "ఆనందం", "peace", "ప్రశాంతత"],
    response: "పనుల ఫలితాల గురించి ఎక్కువగా ఆలోచించకుండా, నీ పని నువ్వు నిజాయితీగా చెయ్యి (నిష్కామ కర్మ). ఇతరులకు సాయం చెయ్యి. అదే నిజమైన సంతోషాన్ని ఇస్తుంది.\n\nDo your duty honestly without thinking too much about the results (Nishkama Karma). Help others. That gives true happiness and peace."
  },
  {
    keywords: ["karma", "work", "duty", "కర్మయోగం", "కర్మ", "పని"],
    response: "కర్మయోగం అంటే ఫలితంపై ఆశ లేకుండా మనం చేయాల్సిన పనిని బాధ్యతగా, శ్రద్ధగా చేయడం. నువ్వు నీ పని చెయ్యి, ప్రతిఫలం నాపై వదిలేయి అని కృష్ణుడు గీతలో చెప్పారు.\n\nKarma Yoga is the path of selfless action. It means performing your duties with dedication without being attached to the results. Krishna says, 'Do your duty, and leave the results to me.'"
  },
  {
    keywords: ["bhakti", "devotion", "love", "pray", "భక్తి", "ప్రేమ", "పూజ", "ప్రార్థన"],
    response: "భక్తి అంటే భగవంతునిపై స్వచ్ఛమైన ప్రేమ మరియు శరణాగతి. ఏ పనైనా దేవునికి అర్పణగా చేయడం నిజమైన భక్తి.\n\nBhakti Yoga is the path of devotion and pure love for the Supreme. It means surrendering to the divine and doing all actions as an offering to God."
  },
  {
    keywords: ["success", "win", "achieve", "goal", "విజయం", "గెలుపు", "సక్సెస్", "లక్ష్యం"],
    response: "విజయం అంటే కేవలం డబ్బు గెలవడం కాదు. మనసును అదుపులో ఉంచుకుని, శాంతిగా ఉంటూ, నిస్వార్థంగా కర్మ చేయడమే అసలైన విజయం అని గీత చెబుతుంది.\n\nGita explains success not as mere material gain, but as achieving peace of mind, self-control, and acting selflessly without attachment to the outcome."
  },
  {
    keywords: ["stress", "tension", "worry", "depress", "anxiety", "ఒత్తిడి", "బాధ", "ఆందోళన", "భయం", "fear"],
    response: "గతం గురించి బాధపడక, భవిష్యత్తు గురించి భయపడక, ప్రస్తుత క్షణంలో జీవించడం ద్వారా ఒత్తిడిని జయించవచ్చని కృష్ణుడు బోధించారు. ధ్యానం మనస్సును ప్రశాంతపరుస్తుంది.\n\nDo not dwell on the past or worry about the future. Live in the present moment and focus on your duty. Meditation and chanting can help calm the mind to reduce stress."
  },
  {
    keywords: ["teach arjuna", "arjuna", "అర్జునుడికి", "బోధించాడు", "what did krishna say"],
    response: "ధర్మాన్ని కాపాడటం కోసం బంధుప్రీతిని పక్కనపెట్టి యుద్ధం చేయాలని, ఆత్మ ఎప్పటికీ చనిపోదని, శరీరం మాత్రమే నశిస్తుందని కృష్ణుడు అర్జునుడికి బోధించాడు.\n\nKrishna taught Arjuna to fight for Dharma (righteousness) without attachment. He explained that the soul is eternal and cannot be killed, only the body perishes."
  },
  {
    keywords: ["hello", "hi", "hey", "హలో", "హాయ్", "నమస్కారం", "namaste", "hare krishna", "హరే కృష్ణ"],
    response: "హరే కృష్ణ! నేను మీకు ఎలా సహాయపడగలను?\n\nHare Krishna! How can I help you today?"
  }
];

export const generateResponse = (message: string): string => {
  const lowerMsg = message.toLowerCase();
  
  for (const rule of chatbotRules) {
    if (rule.keywords.some(keyword => lowerMsg.includes(keyword))) {
      return rule.response;
    }
  }
  
  return "మీరు అడిగిన ప్రశ్న నాకు పూర్తిగా అర్థం కాలేదు. కానీ గీత ఎప్పుడూ ఒకటే చెప్తుంది: మీ కర్తవ్యాన్ని ప్రేమతో చేయండి, ఫలితాన్ని భగవంతుడికి వదిలేయండి. మరొక ప్రశ్న అడగండి!\n\nI didn't completely understand your question. But the Gita always says: Do your duty with love, and leave the results to the Divine. Please ask another question!";
};
