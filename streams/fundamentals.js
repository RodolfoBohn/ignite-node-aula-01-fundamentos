import {Readable, Transform, Writable} from 'node:stream'

//usada para leitura de informações
export class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++
    const buff = Buffer.from(String(i))

    setTimeout(() => {
      if(i>100) {
        this.push(null)
      } else {
        this.push(buff)
      }
    }, 1000)
  }
}

//usada para transformar informações. Precisa retornar algo no callback
export class InvertNumberStream extends Transform {

  _transform(chunk, econding, callback){
    const invertedNumber = Number(chunk.toString())*-1
    console.log(invertedNumber)
    callback(null, Buffer.from(invertedNumber.toString()))
  }
}

//usada para escrever informações.
class MultiplyPerTenStream extends Writable {

  _write(chunk, econding, callback) {
    console.log(Number(chunk.toString()*10))
    callback()
  }
}


// new OneToHundredStream()
// .pipe(new InvertNumberStream())
// .pipe(new MultiplyPerTenStream())