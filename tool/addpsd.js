import CryptoJS from 'crypto-js';
function encrypt (word, key) {
    let ckey = CryptoJS.enc.Utf8.parse(key)
    // let srcs = CryptoJS.enc.Utf8.parse(word)
    let encrypted = CryptoJS.AES.encrypt(word, ckey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    console.log('encrypted', encrypted.toString())
    return encrypted.toString()
  }
  export default {
    
encrypt
  }
