export default {
  uuid(len: number = 4): number {
    const num = [];
    for (let i = 0; i < len; i++) {
      num.push(Math.floor(Math.random() * 10));
    }
    return +num.join('');
  }
}