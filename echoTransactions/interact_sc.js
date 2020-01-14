const Tx=require('ethereumjs-tx')
const Web3=require('web3')
const rpcURL="https://ropsten.infura.io/v3/40ff3c2f70e345f8b7211bdcba0dfe8c"
const web3=new Web3(rpcURL)
const contactAddress='0x5Bb975e5997F49Dc67fAEa0032F895F242122282'
const abi=[
	{
		"constant": false,
		"inputs": [
			{
				"name": "_val",
				"type": "uint256"
			}
		],
		"name": "addVal",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "oneAdd",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "count",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]


const account1='0xceE5B89e51f939c77C67a30Ad3ED3CE28582b46f'
const p1='E0B3EBBE39C8DBA38A2D2035002571FED3A99DCFEAB87FDF9BF840F7A359805A'
const privateKey1=Buffer.from(p1,'hex')

const contract=new web3.eth.Contract(abi,contactAddress)

const data=contract.methods.oneAdd().encodeABI()

console.log(`Data: ${data}`)
web3.eth.getTransactionCount(account1,(err,txCount)=>{
    if(err){
        console.log('error happens getting transaction count')
    }else{
        const txObject={
            nonce:web3.utils.toHex(txCount),
            to:contactAddress,
            gasLimit:web3.utils.toHex(1000000000),
            gasPrice:web3.utils.toHex(web3.utils.toWei('1000','gwei')),
            data:data

        }

        const tx=new Tx(txObject)
        tx.sign(privateKey1)
        const sTx=tx.serialize();
        const raw='0x'+sTx.toString('hex')

        web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
            if(err){
                console.log(err)
            }else{
                console.log(`txHash:${txHash}`)
            }
        })
    }
})