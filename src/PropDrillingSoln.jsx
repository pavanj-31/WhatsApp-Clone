import React, { useContext } from "react";

const ContextWrapper = React.createContext();
function PropDrillingSoln() {
    const value = 10;
    return(
    <>
        <div></div>
        <ContextWrapper.Provider value={value}>
            <Child></Child>
        </ContextWrapper.Provider>
    </>
    );
}

function GrandParent() {
    return
    <>
        <div>value:{value}</div>
    </>
}

function Parent() {
    return
    <>
        <div>value:{value}</div>
    </>
}

function Child() {
    const message = useContext(ContextWrapper);
    return(
    <>
        <div>value:{message}</div>
    </>);
}

// if i want to pass the data of propdrillingsoln function to child 
// then there is a lengthy method in which i have to pass the value to each of functions coming in the hierarchy to reach that fucntion
// the solution to this is the useContext method in which we create a variable first and then pass the value to it by .Provider 
// and call the functions needing those values 
export default PropDrillingSoln