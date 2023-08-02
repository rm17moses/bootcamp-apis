export default function longestWord(sentence) {
    var wordsFromTheSentence = sentence.split(' ');
    var word = "";
    for (let i = 0; i < wordsFromTheSentence.length; i++){
    if (wordsFromTheSentence[i].length >= word.length){
    word = wordsFromTheSentence[i].trim();
    }
    }
    return word;
  }


