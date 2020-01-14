const Tx=require('ethereumjs-tx')
const Web3=require('web3')
const rpcURL="https://ropsten.infura.io/v3/40ff3c2f70e345f8b7211bdcba0dfe8c"
const web3=new Web3(rpcURL)

const account1='0xceE5B89e51f939c77C67a30Ad3ED3CE28582b46f'

const p1='E0B3EBBE39C8DBA38A2D2035002571FED3A99DCFEAB87FDF9BF840F7A359805A'

const privateKey1=Buffer.from(p1,'hex')

console.log(privateKey1)


web3.eth.getTransactionCount(account1, (err, txCount) => {
    if(err){
        console.log('error happened at getting count')
    }
    
    const txObject = {
      nonce:    web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(1000000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
      data:'0x608060405234801561001057600080fd5b506000808190555061011b806100276000396000f3fe608060405260043610604d576000357c01000000000000000000000000000000000000000000000000000000009004806306661abd14605257806372d2249c14607a578063b3c14d831460b1575b600080fd5b348015605d57600080fd5b50606460c5565b6040518082815260200191505060405180910390f35b348015608557600080fd5b5060af60048036036020811015609a57600080fd5b810190808035906020019092919050505060cb565b005b34801560bc57600080fd5b5060c360dd565b005b60005481565b80600080828254019250508190555050565b6001600080828254019250508190555056fea165627a7a72305820fe42ce57ac522908fb52ecd62f1f284d02f8edade601e6276da9cb04f36656860029'

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




 

  