import Child1 from "./Child1";

const Child =({value}) => {
    const message = "Its me ur dady"
    return (
        <div>
            <h1>Child Component</h1>
            <p>Message from Parents: {value}</p>
            <Child1 value={message} />
        </div>
    )
  };
export default Child;