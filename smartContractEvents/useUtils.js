const Web3=require('web3')
const rpcURL="https://ropsten.infura.io/v3/40ff3c2f70e345f8b7211bdcba0dfe8c"
const web3=new Web3(rpcURL)

web3.eth.getGasPrice().then((price)=>{
    console.log(web3.utils.fromWei(price,'ether'))
})

console.log(web3.utils.sha3('ravi'))

console.log(web3.utils.soliditySha3('ravi'))

//underscore library
console.log(web3.utils._)