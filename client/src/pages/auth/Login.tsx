import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  
  const email=useRef<HTMLInputElement>(null);
  const password=useRef<HTMLInputElement>(null);
  
  return (
    <div className="m-16 mt-24  grid justify-items-center">
      <div className="flex justify-center m-4 ">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="rgb(240, 53, 131)" className="bi bi-chat-heart" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M2.965 12.695a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2Zm-.8 3.108.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125ZM8 5.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
        </svg>
        <span className="text" style={{"fontSize":"30px","fontFamily":"'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif"}}>
          Messenger
          </span>
      </div>
      <div className="border border-gray-100 shadow-md p-4 rounded-lg w-1/3 h-min">
        <p className="p-4 font-mono text-xl text-center text-gray-400">Login to messenger</p>
        <div className="m-2 mb-4">
          <input type="text" ref={email} className="rounded-lg p-2 border border-gray-200 outline-0 w-full placeholder:text-gray-500 focus:placeholder:text-gray-400" id="" placeholder="Enter your userID" />
        </div>
        <div className="m-2 mb-4">
          <input type="password" ref={password} className="rounded-lg p-2 border border-gray-200 outline-0 w-full placeholder:text-gray-500 focus:placeholder:text-gray-400" id="" placeholder="Password" />
        </div>
        <div className="m-2 mb-4">
          <button className="rounded-lg p-2 bg-pinki-400 hover:bg-pinki-500 border-pinki-600  w-full" style={{"color":"white"}}>Submit</button>
        </div>
        <div className="mb-2 text-pinki-400 flex justify-center">
          <Link className=" hover:underline hover:underline-offset-4 hover:decoration-pinki-400" to="/login">forgotPassword</Link><span>&&</span>
          <Link className=" hover:underline hover:underline-offset-4 hover:decoration-pinki-400" to="/login">Signup</Link>
        </div>
      </div>
    </div>
  )
}
