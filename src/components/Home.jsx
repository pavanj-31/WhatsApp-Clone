import ChatPanel from './ChatPanel';
import ChatWindow from './ChatWindow';

function Home() {

  return (
    <main className='relative w-full h-screen bg-[#E3E1DB]'>
      <div className="absolute top-0 h-[130px] bg-primary  w-full" />
      <div className="absolute p-5 top-0 h-screen w-full">
        <div className="bg-background w-full h-full shadow-md flex">
          {/* conditonal rehne waale hai -> chat list , profile */}
          <ChatPanel />
          {/* <div>Empty Chat</div>:<div>Individual CHat</div> */}
          <ChatWindow></ChatWindow>
        </div>
      </div>
    </main>
  )
}

export default Home