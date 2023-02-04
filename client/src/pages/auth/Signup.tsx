import { useRef,useState} from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import "./authstyle.css";
export default function Signup() {

  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const cpassword = useRef<HTMLInputElement>(null);
  const [show, setshow] = useState(false);
  const [show1, setshow1] = useState(false);
  const [check, setcheck] = useState<string>("Weak")

  return (
    <div className="mar  grid justify-items-center ">
      <div className="border border-gray-100 bg-white shadow-md p-4 rounded-lg wdth max-md:w-full h-min">
        <div className="flex justify-center m-2 ">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#38bdf8" className="bi bi-messenger" viewBox="0 0 16 16">
            <path d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.639.639 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.639.639 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76zm5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z" />
          </svg>
          <span className="text text-sky-400" style={{ "fontSize": "30px", "fontFamily": "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif" }}>
            Messenger
          </span>
        </div>
        <p className="ml-4 p-4 font-mono text-xl text-center text-sky-500 text-100">Login to messenger</p>
        <div className="m-2 mb-4">
          <input type="text" ref={name} className="rounded-lg p-2 border border-gray-200 outline-2 outline-offset-2 outline-sky-500 w-full placeholder:text-gray-500 focus:placeholder:text-gray-400" id="name" placeholder="Name" />
        </div>
        <div className="m-2 mb-4">
          <input type="email" ref={email} className="rounded-lg p-2 border border-gray-200 outline-2 outline-offset-2 outline-sky-500 w-full placeholder:text-gray-500 focus:placeholder:text-gray-400" id="email" placeholder="Email here.." />
        </div>
        <div className="m-2 mb-4">
        <div className="flex space-between w-full">
            <input type={show ? "text" : "password"} ref={password} className="w-full rounded-lg p-2 border border-gray-200 outline-2 outline-offset-2 outline-sky-500 placeholder:text-gray-500 focus:placeholder:text-gray-400" id="password" placeholder="Password" onChange={()=>{
              if (validator.isStrongPassword(password.current?.value as string)) {
                setcheck("Strong");
                console.log(check);
              }
              else{setcheck("Weak")}
            }}/>
            <button className="ml-1 p-2 bg-gray-100 rounded-lg border border-gray-200" onClick={() => setshow(!show)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="gray" className="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="m-2">
        <div className="flex space-between w-full">
            <input type={show1 ? "text" : "password"} ref={cpassword} className="w-full rounded-lg p-2 border border-gray-200 outline-2 outline-offset-2 outline-sky-500 placeholder:text-gray-500 focus:placeholder:text-gray-400" id="cpassword" placeholder="Password" />
            <button className="ml-1 p-2 bg-gray-100 rounded-lg border border-gray-200" onClick={() => setshow1(!show1)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="gray" className="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="m-2 flex">
          <h4 className="text-sm text-gray-400">Strength:</h4>
          <p className={`text-sm font-bold ${check==="Weak"?"text-red-400":"text-green-400"}`} id="check">{check}</p>
        </div>
        <div className="m-2 mb-4">
          <button className="rounded-lg p-2 bg-sky-500 hover:bg-sky-600 border-sky-700  w-full" style={{ "color": "white" }}>Submit</button>
        </div>
        <div className="mb-2 text-sky-500 flex justify-center">
          <Link className=" hover:underline hover:underline-offset-4 hover:decoration-sky-400" to="/">Login</Link>
        </div>
      </div>
    </div>
  )
}
