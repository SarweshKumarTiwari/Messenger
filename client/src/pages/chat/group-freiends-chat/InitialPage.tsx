export default function InitialPage() {
    return (
        <div className="w-2/3 h-full" style={{ "backgroundImage": "url(./bg.png)" }}>
            <div className="p-20 flex flex-col justify-center w-full h-full">
                <div className="border border-gray-100 bg-white shadow-md p-4 rounded-lg w-full  h-min">
                    <div className="flex flox-row justify-center m-4 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#38bdf8" className="bi bi-messenger" viewBox="0 0 16 16">
                            <path d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.639.639 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.639.639 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76zm5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z" />
                        </svg>
                        <span className="text text-sky-400" style={{ "fontSize": "30px", "fontFamily": "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif" }}>
                            Messenger
                        </span>
                    </div>
                    <div className="flex flex-col justify-center text-center">
                    <h3 className="text-gray-400 text-2xl">WEB MESSENGER</h3>
                    <p className="text-gray-400 text-xl">
                        Get started with Messenger web to have secure chat
                    </p>
                </div>
                </div>
                
            </div>
        </div>
    )
}
