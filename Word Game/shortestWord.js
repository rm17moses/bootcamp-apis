export default function shortestWord(sentence) {
    var wordFromTheSentence = sentence.split(' ');
    var word2 = wordFromTheSentence[0];
    for (let i = 0; i < wordFromTheSentence.length; i++){
    if (wordFromTheSentence[i].length <= word2.length){
    word2 = wordFromTheSentence[i]
    }
    }
    return word2;
  }  