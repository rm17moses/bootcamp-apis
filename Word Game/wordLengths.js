export default function wordLengths(sentence) {
    let words = sentence.split(" ");
    let sum = 0;
    for (let i = 0; i < words.length; i++) {
      sum = sum + words[i].length;
    }
    return sum;
  }