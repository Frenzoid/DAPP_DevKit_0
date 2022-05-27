import { useEffect, useRef, useState } from "react";
import { DEPLOYER_ADDRESS } from "../config/constants";

export default function Greeter({ onTransaction, wrongNetwork, getContract, setOnTransaction, getENSorAdress }) {

  const [greeter, setGreeter] = useState(null);
  const [greeterEvents, setGreeterEvents] = useState([]);
  const newGreet = useRef(null);


  // Contract functions.
  const setGreeting = async () => {
    if (newGreet.current.value) {
      const contract = getContract();

      const tx = await contract.setGreeting(newGreet.current.value);
      setOnTransaction(true);
      await tx.wait();
      setOnTransaction(false);

      loadViewData();
    }
  }

  const greet = async (e) => {
    const contract = getContract();
    const greeting = await contract.greet();
    setGreeter(greeting);
  }

  const setGreetEventListener = async () => {
    const contract = getContract();

    // This is a filter ( gets all events, just once )
    const eventFilter = contract.filters.Greet();
    const events = await contract.queryFilter(eventFilter);

    let greetEvents = [];
    await Promise.all(events.map(async event => {
      const from = await getENSorAdress(event.args[0]);
      const greeting = event.args[1];
      greetEvents.push({ from, greeting });
    }));

    // Newest firsts :)
    greetEvents.reverse();
    setGreeterEvents(greetEvents);



    // This is a listener ( gets new events, live load )
    /*
    contract.on('Greet', async (address, greeting) => {
      const from = await getENSorAdress(address);
      const greetEvents = [...greeterEvent, { from, greeting }];

      // Newest firsts :)
      greetEvents.reverse();
      setGreeterEvents(greetEvents);    });
    */
  }

  const loadViewData = async () => {
    greet();
    setGreetEventListener();
  }

  // Effects.
  useEffect(() => {
    // If we are in the correct network ( network where our contract is deployed ), request data to contract.
    if (!wrongNetwork) loadViewData();
  }, [wrongNetwork]);

  // Components render.
  const renderBody = () => {
    return (
      <div>
        <h1 className={"text-center mt-2 mb-2"}>{greeter}</h1>
        <div className={"input-group mb-3"}>
          <input type="text" ref={newGreet} className={"form-control"} />
          <div className={"input-group-append"}>
            <button className={"btn btn-primary"} type="button" onClick={setGreeting}>Say hello to the world!</button>
          </div>
        </div>
        <div>Created by <a href="https://frenzoid.dev" className={"text-primary"}>{DEPLOYER_ADDRESS} - MrFrenzoid</a> </div>
      </div>
    );
  }


  const renderLoadingGif = () => {
    if (onTransaction)
      return (
        <div className={"text-center mt-4"} >
          <h4>Transaction in progress</h4>
          <img width="50%"
            src="./loading.gif" alt="Loading..." />
        </div>
      );
  }


  const renderGreetEventList = () => {
    if (greeterEvents.length > 0 && !onTransaction) {
      return (
        <div className={"mt-4"}>
          <h3>Greeting Events: </h3>
          <ul>
            {greeterEvents.map((event, index) => {
              return <li key={index}><span className={"text-danger"}>{event.from}</span> says: <i>{event.greeting}</i></li>
            })}
          </ul>
        </div>
      )
    }
  }


  return (
    <div>
      {renderBody()}
      {renderLoadingGif()}
      {renderGreetEventList()}
    </div>
  );
}