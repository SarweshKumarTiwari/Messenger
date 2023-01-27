import "../css/nav.css";
import { useState } from "react";
export default function NavBar() {
    const [isMenuOpen, setisMenuOpen] = useState<boolean>(false)
    return (
        <div>
            <div className='nav' id="nav">
                <div className="nav1">
                    <div className="st1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="rgb(240, 53, 131)" className="bi bi-chat-heart" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.965 12.695a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2Zm-.8 3.108.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125ZM8 5.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                        </svg>
                        <span className="text">Messenger</span>
                    </div>
                    <div className="st1 mob" id="mobile_ico">
                        {!isMenuOpen ? 
                        <button onClick={() => setisMenuOpen(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                            </svg>
                        </button> :
                            <button onClick={() => setisMenuOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x-lg" style={{ "marginTop": "4px" }} viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                </svg>
                            </button>
                        }
                    </div>
                    <nav className="st2" >
                        <ul className="ul">
                            <li className="li">Features</li>
                            <li className="li">Contact</li>
                            <li className="li">Privacy</li>
                            <li className="li">Blog</li>
                        </ul>
                    </nav>
                    <div className="st2">
                        <ul className="ul">
                            <li className="li">ChatRoom</li>
                            <li className="li add">Be a Member</li>
                        </ul>
                    </div>
                </div>
            </div>
            {isMenuOpen && <div className="mobNav">
                <ul className="ulmob">
                    <li className="mobli">Features</li>
                    <li className="mobli">Contact</li>
                    <li className="mobli">Privacy</li>
                    <li className="mobli">Blog</li>
                    <li className="mobli">ChatRoom</li>
                    <li className="mobli">Be a Member</li>
                </ul>
            </div>}
        </div>
    )
}
