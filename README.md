<div align="center">
    <img width="100" src="https://plugins.jetbrains.com/files/18551/169271/icon/pluginIcon.png"> 
    <img width="100" src="https://www.picng.com/upload/plus/png_plus_52185.png">
    <img width="100" src="https://ui-lib.com/blog/wp-content/uploads/2021/12/nextjs-boilerplate-logo.png">

# Hardhat & NextJs
### Automated template dapp development kit
</div>

#### This repository is a template for Dapps, and has the following cool caracteristics:

- Automated Contract verification.
- Automated ABI and Address linkage to the frontend app ( NextJS ).
- Automated frontend upload w/Surge.


#### What does this mean?

When you deploy a contract, the contract will be verified, the artifacts, abis and address of the contract will be generated in the frontend, and the React app will automatically have a predefined configuration so you can simply generate a signer and a contract instance, without the need to specify the contract abis or adress.


#### Where to start:

- `backend`: Simple hardhat project, check out the scripts and config.
- `frontend`: NextJS app, check out configs and pages.

<br>

1) Go at `/backend/.env_examples` and fill out the gaps.
Check out how thats used on `hardhat.config.js` and `./scripts/deploy.js`.

2) After that, customize the contract and your `./scripts/deploy.js` ( specify name and constructor args of the contract ).

3) Once youre done, there are a few cmds you can check out on the below seciton. Try running a hardhat node, and deploying the contract to this node.
    - `npm run node` and in another terminal `npm run deploy-local`.

4) Lets go to our frontend, check `./pages/index.js` for some sample code.

5) You'll notice that you'll be able to access the `CONTRACT_ABI, CONTRACT_ADDRESS, DEPLOYED_NETWORK, DEPLOYER_ADDRESS` directly into your `index.js`, theres no need to change that, since each time you deploy your contract with hardhat, those values will update to the latest deployed contract.

6) Run `npm run dev` to start the nextJs dev server, try and tinker with the app!

7) Once your frontend is ready, lets deploy it to the internet! Run `npm run deploy`, wait for the build to finish, think of a cool domain name, and tadaaa :D, your dapp is on the internet!!. You can check the current example of the code deployed at https://greeter.surge.sh.


#### Commands ( node scripts ):
- backend:
    - `npm run node`: Runs a local hardhat node ( localhost network ).
    - `npm run compile`: Compiles contract.
    - `npm run deploy-local`: Deploys contract to local hardhat network.
    - `npm run deploy-rinkeby`: Deploys and verifies contract to rinkeby test network.
    - `npm run deploy-ropsten`: Deploys and verifies contract to ropsten test network.
    - `npm run deploy-mumbai`: Deploys and verifies contract to mumbai test network.
    - `npm run test`: Runs hardhat tests ( runs files inside `test/` ).
- frontend:
    - `npm run dev`: Runs nextJs development server.
    - `npm run start`: Runs React development server.
    - `npm run build`: Builds nextJs app source code ( packing ).
    - `npm run export`: Exports app to `./out`, ready to be hosted online :D.
    - `npm run surge`: Runs Surge client, used to upload the ./out folder on a surge web host, check current domains, etc.
    - `npm run deploy`: Runs npm build, export and surge, one in all command.
    - `npm run lint`: Runs linter.