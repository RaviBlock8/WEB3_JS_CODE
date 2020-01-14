const Web3=require('web3')
const rpcURL="https://ropsten.infura.io/v3/40ff3c2f70e345f8b7211bdcba0dfe8c"
const web3=new Web3(rpcURL)

web3.eth.getBlockNumber().then(console.log)

web3.eth.getBlock('latest').then((block)=>{
    console.log(block.hash)
})

web3.eth.getBlockNumber().then((latest)=>{
    for(let i=0;i<11;i++){
        web3.eth.getBlock(latest-i).then((block)=>{
            console.log(`hash ${i}+${block.hash}`)
        })
    }
})