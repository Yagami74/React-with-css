import Child from "./Child"

const Parent =() => {
    const message = "Namastey my Child, God bless you";
    return (
        <div>
        <h1>Parent Component</h1>
        <Child value={message} />
        </div>
    );
};
export default Parent;