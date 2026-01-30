export default function About(props) {

//   const [myStyle, setmyStyle] = useState({
//     color: "black",
//     backgroundColor: "white"
//   });

//   const [btnText, setBtnText] = useState ("Enable Dark Mode")


//   const toggleStyle = ()=> {
//     if (myStyle.color === "black"){
//         setmyStyle({
//             color: "white",
//             backgroundColor: "black",
//             border: "1px solid white"
//         })
//         setBtnText("Enable Light Mode")
//     }
//     else{
//         setmyStyle({
//             color: "black",
//             backgroundColor: "white"
//         })
//         setBtnText("Enable Dark Mode")
//     }}
  
  return (
    <div className="container" style={{color: props.mode === 'dark' ? 'white' : '#042743'}}>
        <h1 className="my-3">About Us</h1>
        <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button className="accordion-button" style={{color: props.mode === 'dark' ? 'white' : '#042743', backgroundColor: props.mode === 'dark' ? '#042743' : 'white'}}  type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <strong>Analyze to Your Text</strong>
                </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div className="accordion-body" style={{color: props.mode === 'dark' ? 'white' : '#042743', backgroundColor: props.mode === 'dark' ? '#042743' : 'white'}}>
                    Text Utils gives you a way to analyze your text quickly and efficiently. Be it word count, character count or
                </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button className="accordion-button collapsed" style={{color: props.mode === 'dark' ? 'white' : '#042743', backgroundColor: props.mode === 'dark' ? '#042743' : 'white'}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    <strong>Free to Use</strong>
                </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body" style={{color: props.mode === 'dark' ? 'white' : '#042743', backgroundColor: props.mode === 'dark' ? '#042743' : 'white'}}>
                    Text Utils is a free character counter tool that provides instant character count & word count statistics for a given text. Text Utils reports the number of words and characters. Thus it is suitable for writing text with word/ character limit.
                </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button className="accordion-button collapsed" style={{color: props.mode === 'dark' ? 'white' : '#042743', backgroundColor: props.mode === 'dark' ? '#042743' : 'white'}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    <strong>Browser Compatible</strong>
                </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body" style={{color: props.mode === 'dark' ? 'white' : '#042743', backgroundColor: props.mode === 'dark' ? '#042743' : 'white'}}>
                    This word counter software works in any web browsers such as Chrome, Firefox, Internet Explorer, Safari, Opera. It suits to count characters in facebook, blog, books, excel document, pdf document, essays, etc.
                </div>
                </div>
            </div>
        </div>
        <div className="conatainer my-3">
        {/* <button type="button" className="btn btn-primary" onClick={toggleStyle}>{btnText}</button> */}
        </div>
    </div>
  )
}
