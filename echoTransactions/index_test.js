const Web3=require('web3')
const Tx=require('ethereumjs-tx')
const rpcURL='https://ropsten.infura.io/v3/40ff3c2f70e345f8b7211bdcba0dfe8c'
const ravi='0xceE5B89e51f939c77C67a30Ad3ED3CE28582b46f'
const aka='0x627C001823dF74384eE25aBa90B61f7F95FAAC39'
const p1='E0B3EBBE39C8DBA38A2D2035002571FED3A99DCFEAB87FDF9BF840F7A359805A'
const privateKey=Buffer.from(p1,'hex')

const web3=new Web3(rpcURL)

web3.eth.getTransactionCount(ravi,(err,txCount)=>{
    if(err){
        console.log('error happened getting tx count')
    }else{
        const txObject={
            nonce:web3.utils.toHex(txCount),
            to:aka,
            value:web3.utils.toHex(web3.utils.toWei('0.5','ether')),
            gasLimit:web3.utils.toHex(30000),
            gasPrice:web3.utils.toHex(web3.utils.toWei('10','gwei'))

        }

        const tx=new Tx(txObject)
        tx.sign(privateKey)
        const sTx=tx.serialize()
        const raw='0x'+sTx.toString('hex')
        web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
            if(err){
                console.log(err)
            }else{
                console.log('tx hash:'+txHash)
            }
        })
    }
})
