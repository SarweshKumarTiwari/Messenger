import { useState, useContext, useRef } from 'react';
import { UseContext } from '../context/ProviderOfContext';
import { BubbleBox } from '../users';
import { getURLfromFile } from '../../../utils/uploadFile';
interface callback {
  sendmsg: (e: BubbleBox) => void
}
export default function ChatNav(sendmsg: callback) {
  const { data } = useContext(UseContext);
  const file = useRef<HTMLInputElement>(null!)
  const [option, setoption] = useState<boolean>(false);
  function log() {
    getURLfromFile(file.current.files![0], (e) => {
      sendmsg.sendmsg({
        category: 3,
        user: {
          userId: String(data?.id),
          image: e,
          date: "12:45 pm"
        }
      })
    });
  }
  return (
    <div className="py-2 px-3 relative bg-sky-500 shadow-md border-l border-sky-500 flex flex-row justify-between items-center ">
      <div className="flex  max-md:items-start  items-center">
        <div className="flex items-center">
          <div className='ml-1'>
            <img className="w-10 h-10 max-md:w-8 max-md:h-8 border border-white rounded-full" src={data?.img} alt='not_fnd' />
          </div>
        </div>
        <div className="ml-4 max-md:ml-0">
          <p className="text-white">
            {data?.name}
          </p>
          <p className="text-white text-xs mt-1 max-md:mt-0">
            {data?.recent_msg}
          </p>
        </div>
      </div>

      <div className="flex">
        <div className="ml-6 p-2 max-md:p-0 max-md:ml-2">
          <label htmlFor="inputtag">
            <input type="file" style={{ "display": "none" }} id="inputtag" ref={file} onChange={log} />
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
              <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
            </svg>
          </label>
        </div>
        <div className={`ml-4 p-2 max-md:p-0 max-md:ml-2 ${option && "rounded-full bg-sky-600"}`} >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-list" viewBox="0 0 16 16" onClick={() => setoption(!option)}>
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
          </svg>
          {option && <div className="pt-3 absolute w-44 h-min mt-3 shadow-md" style={{ "right": "17px", "backgroundColor": "#fff", "borderRadius": "5px" }}>
            <ul>
              <li className="px-3 py-3 gray-100 hover:bg-gray-200">Settings</li>
              <li className="px-3 py-3 gray-100 hover:bg-gray-200">logout</li>
            </ul>
          </div>}
        </div>
      </div>
    </div>
  )
}
