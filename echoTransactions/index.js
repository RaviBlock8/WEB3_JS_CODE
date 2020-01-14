const Tx=require('ethereumjs-tx')
const Web3=require('web3')
const rpcURL="https://ropsten.infura.io/v3/40ff3c2f70e345f8b7211bdcba0dfe8c"
const web3=new Web3(rpcURL)

const account1='0xceE5B89e51f939c77C67a30Ad3ED3CE28582b46f'
const account2='0x627C001823dF74384eE25aBa90B61f7F95FAAC39'


const adr1=account1.address
const adr2=account2.address
const p1='E0B3EBBE39C8DBA38A2D2035002571FED3A99DCFEAB87FDF9BF840F7A359805A'
const p2='03B6DC9E972F5DB0BCE0C98FD79D5C8A4100BF243EF76195B2894572622C52C7'
const privateKey1=Buffer.from(p1,'hex')
const privateKey2=Buffer.from(p2,'hex')
console.log(privateKey1)

// web3.eth.getBalance(account1,(err,res)=>{
//     console.log(res)

// })

web3.eth.getTransactionCount(account1, (err, txCount) => {
    if(err){
        console.log('error happened at getting count')
    }
    
    const txObject = {
      nonce:    web3.utils.toHex(txCount),
      to:       account2,
      value:    web3.utils.toHex(web3.utils.toWei('1', 'ether')),
      gasLimit: web3.utils.toHex(21000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }
    console.log('transaction object:'+txObject)

    const tx = new Tx(txObject)
    tx.sign(privateKey1)

    const serializedTx = tx.serialize()
    console.log(serializedTx)
    const raw='0x'+serializedTx.toString('hex')
    console.log('raw transaction:'+raw)
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        if(err){
            console.log(err)
        }
        console.log('txHash:', txHash)
      })
    
  })


